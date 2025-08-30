# 🧠 Enhanced Biosecurity ML API

## Overview
This is an enhanced logistic regression machine learning model that generates **biometric scores** (0-100) for farm biosecurity assessments. The model analyzes 15 quiz questions across 5 categories and provides comprehensive risk analysis.

## 🚀 Features

### **Biometric Score Generation**
- **Score Range**: 0-100 (0 = Poor, 100 = Excellent)
- **Calculation**: Based on sum of all 15 question scores (max 300) converted to percentage
- **Real-time**: Generated instantly from quiz responses

### **Risk Assessment**
- **Low Risk**: 70-100 points (Green)
- **Medium Risk**: 40-69 points (Yellow)  
- **High Risk**: 0-39 points (Red)

### **AI-Powered Analysis**
- **Logistic Regression Model**: Trained on 500+ synthetic data points
- **Feature Scaling**: StandardScaler for optimal model performance
- **Confidence Scores**: ML prediction confidence levels
- **Category Breakdown**: Individual scores for each biosecurity category

### **Smart Recommendations**
- **Overall Assessment**: Based on total biometric score
- **Category-Specific**: Targeted advice for weak areas
- **Priority Areas**: Identifies critical improvement needs
- **Actionable Steps**: Practical implementation guidance

## 📊 Quiz Structure

### **15 Questions Across 5 Categories:**

1. **Hygiene** (q1-q3)
   - Regular cleaning schedule
   - Disinfection protocols  
   - Waste management

2. **Access Control** (q4-q6)
   - Visitor management
   - Equipment disinfection
   - Vehicle control

3. **Quarantine** (q7-q9)
   - New animal isolation
   - Sick animal isolation
   - Returning animal protocols

4. **Pest Control** (q10-q12)
   - Rodent control
   - Wild bird control
   - Insect control

5. **Feed & Water** (q13-q15)
   - Feed quality control
   - Water quality control
   - Proper storage

## 🛠️ Installation & Setup

### **1. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **2. Run the API**
```bash
python app.py
```

### **3. Test the API**
```bash
python test_api.py
```

## 🔌 API Endpoints

### **POST /predict**
**Input**: Quiz answers in format `{q1: score, q2: score, ..., q15: score}`
**Scores**: 0-20 for each question

**Example Request:**
```json
{
  "q1": 15,
  "q2": 18,
  "q3": 12,
  "q4": 16,
  "q5": 14,
  "q6": 10,
  "q7": 8,
  "q8": 6,
  "q9": 12,
  "q10": 14,
  "q11": 16,
  "q12": 18,
  "q13": 17,
  "q14": 19,
  "q15": 15
}
```

**Example Response:**
```json
{
  "biometric_score": 67,
  "risk_level": "Medium",
  "prediction": "Biosecurity Risk: Medium",
  "confidence": 0.89,
  "category_scores": {
    "Hygiene": 15,
    "Access Control": 13,
    "Quarantine": 9,
    "Pest Control": 16,
    "Feed & Water": 17
  },
  "recommendations": [
    "Moderate improvements needed to enhance biosecurity",
    "Focus on high-priority areas identified in assessment",
    "Priority: Improve Quarantine practices (current avg: 9.0/20)"
  ],
  "detailed_analysis": {
    "overall_assessment": "Your farm has a biosecurity score of 67/100",
    "risk_category": "Risk Level: Medium",
    "ml_confidence": "AI Confidence: 89.0%",
    "priority_areas": ["Quarantine"]
  }
}
```

### **GET /health**
**Response**: API health status and model loading confirmation

## 🧪 Testing

### **Sample Test Data**
The `test_api.py` script includes realistic quiz data that demonstrates:
- **Mixed performance** across categories
- **Realistic scoring patterns** (correlated scores within categories)
- **Expected API responses** with all features

### **Running Tests**
```bash
# Make sure API is running first
python app.py

# In another terminal
python test_api.py
```

## 🔧 Model Details

### **Logistic Regression Configuration**
- **Algorithm**: sklearn.linear_model.LogisticRegression
- **Max Iterations**: 1000
- **Regularization**: C=1.0 (balanced)
- **Random State**: 42 (reproducible results)

### **Data Processing**
- **Feature Scaling**: StandardScaler for optimal performance
- **Train/Test Split**: 80/20 with stratification
- **Cross-validation**: Built-in sklearn validation

### **Model Performance**
- **Accuracy**: Typically 85-95% on synthetic data
- **Features**: 15 quiz scores (0-20 each)
- **Classes**: 3 risk levels (Low, Medium, High)

## 📈 Frontend Integration

The React frontend automatically:
1. **Collects quiz responses** from users
2. **Formats data** for ML API
3. **Displays biometric scores** prominently
4. **Shows risk levels** with color coding
5. **Presents recommendations** in organized lists
6. **Highlights priority areas** for improvement

## 🚨 Error Handling

- **Input Validation**: Checks for missing/invalid quiz data
- **API Errors**: Graceful fallback with user-friendly messages
- **Model Errors**: Automatic retry with error logging
- **Network Issues**: Connection timeout handling

## 🔮 Future Enhancements

- **Real-time Training**: Continuous model improvement with user feedback
- **Advanced Analytics**: Trend analysis and progress tracking
- **Custom Thresholds**: Farm-specific risk level adjustments
- **Multi-language Support**: Localized recommendations
- **Export Reports**: PDF/Excel generation for compliance

---

**Built with ❤️ for Smart India Hackathon**
