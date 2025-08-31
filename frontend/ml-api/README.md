# 🚀 Biosecurity ML Model & API

This repository contains a comprehensive Machine Learning model for calculating biosecurity scores for farms, along with a Flask API to serve predictions.

## 🎯 Features

### **ML Model Capabilities:**
- **Multiple Algorithms**: Random Forest, Gradient Boosting, Linear Regression, Ridge Regression, SVR, Neural Networks
- **Automatic Model Selection**: Cross-validation to select the best performing model
- **Comprehensive Scoring**: 100-point biosecurity assessment system
- **Category Breakdown**: Detailed scores for different biosecurity areas
- **Personalized Recommendations**: AI-generated improvement suggestions

### **Assessment Categories:**
1. **Farm Infrastructure** (25 points)
   - Fencing quality
   - Biosecurity gates
   - Quarantine facilities
   - Vehicle wash stations

2. **Livestock Management** (25 points)
   - Vaccination protocols
   - Disease monitoring
   - Isolation practices

3. **Hygiene Practices** (20 points)
   - Disinfection frequency
   - Personal protective equipment
   - Visitor control

4. **Feed & Water Security** (15 points)
   - Feed storage security
   - Water source protection

5. **Pest Control** (10 points)
   - Rodent control
   - Insect control

6. **Training & Documentation** (5 points)
   - Staff training frequency
   - Protocol documentation

## 🛠️ Installation & Setup

### **Prerequisites:**
- Python 3.8 or higher
- pip package manager

### **Quick Setup (Windows):**
```powershell
# Run the setup script
.\setup-ml-api.ps1
```

### **Manual Setup:**
```bash
# Navigate to ML API directory
cd ml-api

# Install dependencies
pip install -r requirements.txt

# Train the model
python biosecurity_model.py

# Start the API
python biosecurity_api.py
```

## 📊 API Endpoints

### **Health Check**
```http
GET /health
```
**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2024-01-01T12:00:00"
}
```

### **Get Model Information**
```http
GET /model-info
```
**Response:**
```json
{
  "status": "success",
  "model_name": "Random Forest",
  "feature_names": ["farm_size_acres", "fencing_quality", ...],
  "model_loaded": true,
  "timestamp": "2024-01-01T12:00:00"
}
```

### **Get Sample Input Structure**
```http
GET /sample-input
```
**Response:**
```json
{
  "status": "success",
  "sample_input": {
    "farm_size_acres": 100,
    "fencing_quality": "good",
    "biosecurity_gates": "yes",
    ...
  },
  "field_descriptions": {
    "farm_size_acres": "Farm size in acres (positive number)",
    ...
  }
}
```

### **Predict Biosecurity Score**
```http
POST /predict
Content-Type: application/json

{
  "farm_size_acres": 100,
  "fencing_quality": "good",
  "biosecurity_gates": "yes",
  "quarantine_facility": "yes",
  "vehicle_wash_station": "no",
  "livestock_count": 200,
  "vaccination_protocol": "moderate",
  "disease_monitoring": "weekly",
  "isolation_practices": "good",
  "disinfection_frequency": "weekly",
  "personal_protective_equipment": "partial",
  "visitor_control": "moderate",
  "feed_storage_security": "good",
  "water_source_protection": "good",
  "rodent_control": "good",
  "insect_control": "fair",
  "staff_training": "quarterly",
  "protocol_documentation": "moderate",
  "emergency_plan": "yes",
  "veterinary_contact": "yes"
}
```

**Response:**
```json
{
  "status": "success",
  "prediction": {
    "biosecurity_score": 75.5,
    "risk_level": "Moderate Risk",
    "risk_color": "yellow",
    "max_score": 100
  },
  "category_scores": {
    "infrastructure": 20,
    "livestock_management": 18,
    "hygiene_practices": 15,
    "feed_water": 12,
    "pest_control": 7,
    "training_documentation": 3
  },
  "recommendations": [
    "Upgrade fencing quality to improve farm security",
    "Install biosecurity gates to control access",
    "Establish a quarantine facility for new livestock"
  ],
  "input_data": { ... },
  "model_info": {
    "model_name": "Random Forest",
    "timestamp": "2024-01-01T12:00:00"
  }
}
```

## 🔧 Model Training

### **Training Process:**
1. **Data Generation**: Synthetic biosecurity data with realistic distributions
2. **Feature Engineering**: Categorical encoding and scaling
3. **Model Training**: Multiple algorithms trained simultaneously
4. **Cross-Validation**: 5-fold CV to select best model
5. **Model Selection**: Best model chosen based on CV R² score
6. **Persistence**: Trained model saved as pickle file

### **Model Performance:**
- **R² Score**: Measures prediction accuracy
- **Cross-Validation R²**: Ensures model generalization
- **Mean Absolute Error**: Average prediction error
- **Mean Squared Error**: Penalizes large errors

## 📱 Frontend Integration

### **React Component:**
```tsx
import BiosecurityAssessmentForm from './components/BiosecurityAssessmentForm';

const handleSubmit = async (formData) => {
  try {
    const response = await fetch('http://localhost:5001/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    // Handle prediction results
  } catch (error) {
    // Handle errors
  }
};

<BiosecurityAssessmentForm onSubmit={handleSubmit} />
```

### **Form Features:**
- **Multi-step Wizard**: 6 organized assessment steps
- **Real-time Validation**: Input validation and error handling
- **Progress Tracking**: Visual step indicator
- **Responsive Design**: Works on all screen sizes
- **Loading States**: User feedback during API calls

## 🚀 Usage Examples

### **Python Client:**
```python
import requests
import json

# Sample farm data
farm_data = {
    "farm_size_acres": 150,
    "fencing_quality": "excellent",
    "biosecurity_gates": "yes",
    "quarantine_facility": "yes",
    "vehicle_wash_station": "yes",
    "livestock_count": 300,
    "vaccination_protocol": "strict",
    "disease_monitoring": "daily",
    "isolation_practices": "excellent",
    "disinfection_frequency": "daily",
    "personal_protective_equipment": "full",
    "visitor_control": "strict",
    "feed_storage_security": "excellent",
    "water_source_protection": "excellent",
    "rodent_control": "excellent",
    "insect_control": "excellent",
    "staff_training": "monthly",
    "protocol_documentation": "comprehensive",
    "emergency_plan": "yes",
    "veterinary_contact": "yes"
}

# Make prediction
response = requests.post(
    'http://localhost:5001/predict',
    json=farm_data,
    headers={'Content-Type': 'application/json'}
)

result = response.json()
print(f"Biosecurity Score: {result['prediction']['biosecurity_score']}/100")
print(f"Risk Level: {result['prediction']['risk_level']}")
```

### **JavaScript/TypeScript Client:**
```typescript
interface BiosecurityFormData {
  farm_size_acres: number;
  fencing_quality: 'excellent' | 'good' | 'fair' | 'poor';
  // ... other fields
}

const assessBiosecurity = async (data: BiosecurityFormData) => {
  try {
    const response = await fetch('http://localhost:5001/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Prediction failed:', error);
    throw error;
  }
};
```

## 🔒 Security & Validation

### **Input Validation:**
- **Required Fields**: All 20 assessment fields must be provided
- **Data Types**: Numeric and categorical validation
- **Value Ranges**: Enforced valid option selections
- **Error Handling**: Comprehensive error messages

### **Data Privacy:**
- **Local Processing**: All data processed locally
- **No Storage**: Input data not stored permanently
- **Anonymous**: No personal identification required
- **Secure**: HTTPS recommended for production

## 📈 Performance & Scalability

### **Model Performance:**
- **Training Time**: ~30-60 seconds for 2000 samples
- **Prediction Time**: <100ms per request
- **Memory Usage**: ~50-100MB model size
- **Concurrent Requests**: Handles multiple simultaneous users

### **Scalability Options:**
- **Model Caching**: Pre-loaded models for fast responses
- **Async Processing**: Non-blocking prediction handling
- **Load Balancing**: Multiple API instances support
- **Database Integration**: Optional result storage

## 🐛 Troubleshooting

### **Common Issues:**

1. **Model Not Loaded:**
   ```bash
   # Ensure model is trained first
   python biosecurity_model.py
   ```

2. **Port Already in Use:**
   ```bash
   # Change port in biosecurity_api.py
   app.run(host='0.0.0.0', port=5002, debug=True)
   ```

3. **Package Installation Errors:**
   ```bash
   # Upgrade pip
   python -m pip install --upgrade pip
   
   # Install with specific versions
   pip install -r requirements.txt --force-reinstall
   ```

4. **CORS Issues:**
   ```python
   # Ensure CORS is properly configured
   from flask_cors import CORS
   CORS(app, origins=['http://localhost:3000'])
   ```

### **Debug Mode:**
```python
# Enable debug logging
app.run(debug=True, host='0.0.0.0', port=5001)
```

## 🔮 Future Enhancements

### **Planned Features:**
- **Real-time Monitoring**: Continuous biosecurity tracking
- **Historical Analysis**: Trend analysis and progress tracking
- **Custom Scoring**: Farm-specific scoring algorithms
- **Integration APIs**: Connect with farm management systems
- **Mobile App**: Native mobile assessment application

### **Advanced ML Features:**
- **Ensemble Methods**: Combine multiple model predictions
- **Feature Importance**: Identify key biosecurity factors
- **Anomaly Detection**: Detect unusual farm conditions
- **Predictive Analytics**: Forecast future biosecurity risks

## 📞 Support & Contributing

### **Getting Help:**
- **Documentation**: Check this README first
- **Issues**: Report bugs via GitHub issues
- **Discussions**: Join community discussions

### **Contributing:**
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review process

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## �� Acknowledgments

- **Scikit-learn**: Machine learning algorithms
- **Flask**: Web framework
- **Pandas**: Data manipulation
- **NumPy**: Numerical computing
- **Joblib**: Model persistence

---

**Made with ❤️ for better farm biosecurity**
