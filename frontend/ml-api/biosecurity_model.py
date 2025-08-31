import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.svm import SVR
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
import json
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

class BiosecurityMLModel:
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.label_encoders = {}
        self.feature_names = []
        self.best_model = None
        self.best_model_name = None
        
    def generate_synthetic_data(self, n_samples=1000):
        """Generate synthetic biosecurity assessment data"""
        np.random.seed(42)
        
        data = {
            # Farm Infrastructure
            'farm_size_acres': np.random.uniform(1, 500, n_samples),
            'fencing_quality': np.random.choice(['excellent', 'good', 'fair', 'poor'], n_samples),
            'biosecurity_gates': np.random.choice(['yes', 'no'], n_samples),
            'quarantine_facility': np.random.choice(['yes', 'no'], n_samples),
            'vehicle_wash_station': np.random.choice(['yes', 'no'], n_samples),
            
            # Livestock Management
            'livestock_count': np.random.randint(10, 1000, n_samples),
            'vaccination_protocol': np.random.choice(['strict', 'moderate', 'basic', 'none'], n_samples),
            'disease_monitoring': np.random.choice(['daily', 'weekly', 'monthly', 'rarely'], n_samples),
            'isolation_practices': np.random.choice(['excellent', 'good', 'fair', 'poor'], n_samples),
            
            # Hygiene Practices
            'disinfection_frequency': np.random.choice(['daily', 'weekly', 'monthly', 'rarely'], n_samples),
            'personal_protective_equipment': np.random.choice(['full', 'partial', 'basic', 'none'], n_samples),
            'visitor_control': np.random.choice(['strict', 'moderate', 'basic', 'none'], n_samples),
            
            # Feed and Water
            'feed_storage_security': np.random.choice(['excellent', 'good', 'fair', 'poor'], n_samples),
            'water_source_protection': np.random.choice(['excellent', 'good', 'fair', 'poor'], n_samples),
            
            # Pest Control
            'rodent_control': np.random.choice(['excellent', 'good', 'fair', 'poor'], n_samples),
            'insect_control': np.random.choice(['excellent', 'good', 'fair', 'poor'], n_samples),
            
            # Training and Documentation
            'staff_training': np.random.choice(['monthly', 'quarterly', 'biannual', 'annual'], n_samples),
            'protocol_documentation': np.random.choice(['comprehensive', 'moderate', 'basic', 'none'], n_samples),
            
            # Emergency Response
            'emergency_plan': np.random.choice(['yes', 'no'], n_samples),
            'veterinary_contact': np.random.choice(['yes', 'no'], n_samples)
        }
        
        df = pd.DataFrame(data)
        return df
    
    def calculate_biosecurity_score(self, row):
        """Calculate biosecurity score based on various factors"""
        score = 0
        max_score = 100
        
        # Farm Infrastructure (25 points)
        if row['fencing_quality'] == 'excellent': score += 8
        elif row['fencing_quality'] == 'good': score += 6
        elif row['fencing_quality'] == 'fair': score += 4
        else: score += 1
        
        if row['biosecurity_gates'] == 'yes': score += 5
        if row['quarantine_facility'] == 'yes': score += 6
        if row['vehicle_wash_station'] == 'yes': score += 6
        
        # Livestock Management (25 points)
        if row['vaccination_protocol'] == 'strict': score += 8
        elif row['vaccination_protocol'] == 'moderate': score += 6
        elif row['vaccination_protocol'] == 'basic': score += 4
        else: score += 1
        
        if row['disease_monitoring'] == 'daily': score += 8
        elif row['disease_monitoring'] == 'weekly': score += 6
        elif row['disease_monitoring'] == 'monthly': score += 4
        else: score += 1
        
        if row['isolation_practices'] == 'excellent': score += 9
        elif row['isolation_practices'] == 'good': score += 7
        elif row['isolation_practices'] == 'fair': score += 4
        else: score += 1
        
        # Hygiene Practices (20 points)
        if row['disinfection_frequency'] == 'daily': score += 7
        elif row['disinfection_frequency'] == 'weekly': score += 5
        elif row['disinfection_frequency'] == 'monthly': score += 3
        else: score += 1
        
        if row['personal_protective_equipment'] == 'full': score += 7
        elif row['personal_protective_equipment'] == 'partial': score += 5
        elif row['personal_protective_equipment'] == 'basic': score += 3
        else: score += 1
        
        if row['visitor_control'] == 'strict': score += 6
        elif row['visitor_control'] == 'moderate': score += 4
        elif row['visitor_control'] == 'basic': score += 2
        else: score += 0
        
        # Feed and Water (15 points)
        if row['feed_storage_security'] == 'excellent': score += 8
        elif row['feed_storage_security'] == 'good': score += 6
        elif row['feed_storage_security'] == 'fair': score += 4
        else: score += 1
        
        if row['water_source_protection'] == 'excellent': score += 7
        elif row['water_source_protection'] == 'good': score += 5
        elif row['water_source_protection'] == 'fair': score += 3
        else: score += 1
        
        # Pest Control (10 points)
        if row['rodent_control'] == 'excellent': score += 5
        elif row['rodent_control'] == 'good': score += 4
        elif row['rodent_control'] == 'fair': score += 2
        else: score += 0
        
        if row['insect_control'] == 'excellent': score += 5
        elif row['insect_control'] == 'good': score += 4
        elif row['insect_control'] == 'fair': score += 2
        else: score += 0
        
        # Training and Documentation (5 points)
        if row['staff_training'] == 'monthly': score += 3
        elif row['staff_training'] == 'quarterly': score += 2
        elif row['staff_training'] == 'biannual': score += 1
        else: score += 0
        
        if row['protocol_documentation'] == 'comprehensive': score += 2
        elif row['protocol_documentation'] == 'moderate': score += 1
        else: score += 0
        
        # Emergency Response (5 points)
        if row['emergency_plan'] == 'yes': score += 3
        if row['veterinary_contact'] == 'yes': score += 2
        
        return min(score, max_score)
    
    def prepare_features(self, df):
        """Prepare features for ML models"""
        # Create a copy to avoid modifying original data
        df_processed = df.copy()
        
        # Encode categorical variables
        categorical_columns = df_processed.select_dtypes(include=['object']).columns
        
        for col in categorical_columns:
            if col not in self.label_encoders:
                self.label_encoders[col] = LabelEncoder()
                df_processed[col] = self.label_encoders[col].fit_transform(df_processed[col])
            else:
                df_processed[col] = self.label_encoders[col].transform(df_processed[col])
        
        # Store feature names
        self.feature_names = [col for col in df_processed.columns if col != 'biosecurity_score']
        
        return df_processed
    
    def train_models(self, X, y):
        """Train multiple ML models and select the best one"""
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        self.scalers['standard'] = scaler
        
        # Define models
        self.models = {
            'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
            'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, random_state=42),
            'Linear Regression': LinearRegression(),
            'Ridge Regression': Ridge(alpha=1.0),
            'SVR': SVR(kernel='rbf', C=100, gamma='scale'),
            'Neural Network': MLPRegressor(hidden_layer_sizes=(100, 50), max_iter=500, random_state=42)
        }
        
        # Train and evaluate models
        best_score = -np.inf
        results = {}
        
        for name, model in self.models.items():
            # Train model
            if name in ['SVR', 'Neural Network']:
                model.fit(X_train_scaled, y_train)
                y_pred = model.predict(X_test_scaled)
            else:
                model.fit(X_train, y_train)
                y_pred = model.predict(X_test)
            
            # Evaluate model
            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            mae = mean_absolute_error(y_test, y_pred)
            
            # Cross-validation score
            if name in ['SVR', 'Neural Network']:
                cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='r2')
            else:
                cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='r2')
            
            cv_mean = cv_scores.mean()
            
            results[name] = {
                'MSE': mse,
                'R2': r2,
                'MAE': mae,
                'CV_R2': cv_mean
            }
            
            # Select best model based on cross-validation R2
            if cv_mean > best_score:
                best_score = cv_mean
                self.best_model = model
                self.best_model_name = name
        
        return results
    
    def predict_score(self, input_data):
        """Predict biosecurity score for new data"""
        if self.best_model is None:
            raise ValueError("Model not trained yet. Please train the model first.")
        
        # Prepare input data
        input_df = pd.DataFrame([input_data])
        
        # Encode categorical variables
        for col in input_df.columns:
            if col in self.label_encoders:
                input_df[col] = self.label_encoders[col].transform(input_df[col])
        
        # Scale features if using scaled models
        if self.best_model_name in ['SVR', 'Neural Network']:
            input_scaled = self.scalers['standard'].transform(input_df)
            prediction = self.best_model.predict(input_scaled)[0]
        else:
            prediction = self.best_model.predict(input_df)[0]
        
        return max(0, min(100, prediction))  # Ensure score is between 0-100
    
    def get_risk_level(self, score):
        """Get risk level based on biosecurity score"""
        if score >= 80:
            return "Low Risk", "green"
        elif score >= 60:
            return "Moderate Risk", "yellow"
        elif score >= 40:
            return "High Risk", "orange"
        else:
            return "Critical Risk", "red"
    
    def get_recommendations(self, input_data, score):
        """Get personalized recommendations based on input data and score"""
        recommendations = []
        
        # Infrastructure recommendations
        if input_data.get('fencing_quality') in ['fair', 'poor']:
            recommendations.append("Upgrade fencing quality to improve farm security")
        
        if input_data.get('biosecurity_gates') == 'no':
            recommendations.append("Install biosecurity gates to control access")
        
        if input_data.get('quarantine_facility') == 'no':
            recommendations.append("Establish a quarantine facility for new livestock")
        
        # Livestock management recommendations
        if input_data.get('vaccination_protocol') in ['basic', 'none']:
            recommendations.append("Implement a comprehensive vaccination protocol")
        
        if input_data.get('disease_monitoring') in ['monthly', 'rarely']:
            recommendations.append("Increase disease monitoring frequency to at least weekly")
        
        # Hygiene recommendations
        if input_data.get('disinfection_frequency') in ['monthly', 'rarely']:
            recommendations.append("Increase disinfection frequency to at least weekly")
        
        if input_data.get('personal_protective_equipment') in ['basic', 'none']:
            recommendations.append("Provide full personal protective equipment for staff")
        
        # General recommendations based on score
        if score < 40:
            recommendations.append("Immediate action required: Review and implement all biosecurity protocols")
        elif score < 60:
            recommendations.append("Significant improvements needed: Focus on high-impact areas first")
        elif score < 80:
            recommendations.append("Moderate improvements: Address remaining gaps systematically")
        else:
            recommendations.append("Maintain current standards and consider advanced biosecurity measures")
        
        return recommendations
    
    def save_model(self, filepath='biosecurity_model.pkl'):
        """Save the trained model and encoders"""
        model_data = {
            'best_model': self.best_model,
            'best_model_name': self.best_model_name,
            'label_encoders': self.label_encoders,
            'scalers': self.scalers,
            'feature_names': self.feature_names
        }
        joblib.dump(model_data, filepath)
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath='biosecurity_model.pkl'):
        """Load a trained model"""
        model_data = joblib.load(filepath)
        self.best_model = model_data['best_model']
        self.best_model_name = model_data['best_model_name']
        self.label_encoders = model_data['label_encoders']
        self.scalers = model_data['scalers']
        self.feature_names = model_data['feature_names']
        print(f"Model loaded from {filepath}")

def main():
    """Main function to train and test the model"""
    print("🚀 Initializing Biosecurity ML Model...")
    
    # Initialize model
    model = BiosecurityMLModel()
    
    # Generate synthetic data
    print("📊 Generating synthetic biosecurity data...")
    df = model.generate_synthetic_data(n_samples=2000)
    
    # Calculate biosecurity scores
    print("🧮 Calculating biosecurity scores...")
    df['biosecurity_score'] = df.apply(model.calculate_biosecurity_score, axis=1)
    
    # Prepare features
    print("🔧 Preparing features for ML...")
    df_processed = model.prepare_features(df)
    
    # Separate features and target
    X = df_processed.drop('biosecurity_score', axis=1)
    y = df_processed['biosecurity_score']
    
    # Train models
    print("🤖 Training ML models...")
    results = model.train_models(X, y)
    
    # Print results
    print(f"\n🏆 Best Model: {model.best_model_name}")
    print("\n📈 Model Performance Results:")
    for name, metrics in results.items():
        print(f"\n{name}:")
        print(f"  R² Score: {metrics['R2']:.4f}")
        print(f"  Cross-Validation R²: {metrics['CV_R2']:.4f}")
        print(f"  Mean Absolute Error: {metrics['MAE']:.2f}")
        print(f"  Mean Squared Error: {metrics['MSE']:.2f}")
    
    # Test prediction
    print("\n🧪 Testing model prediction...")
    test_input = {
        'farm_size_acres': 100,
        'fencing_quality': 'good',
        'biosecurity_gates': 'yes',
        'quarantine_facility': 'yes',
        'vehicle_wash_station': 'no',
        'livestock_count': 200,
        'vaccination_protocol': 'moderate',
        'disease_monitoring': 'weekly',
        'isolation_practices': 'good',
        'disinfection_frequency': 'weekly',
        'personal_protective_equipment': 'partial',
        'visitor_control': 'moderate',
        'feed_storage_security': 'good',
        'water_source_protection': 'good',
        'rodent_control': 'good',
        'insect_control': 'fair',
        'staff_training': 'quarterly',
        'protocol_documentation': 'moderate',
        'emergency_plan': 'yes',
        'veterinary_contact': 'yes'
    }
    
    predicted_score = model.predict_score(test_input)
    risk_level, risk_color = model.get_risk_level(predicted_score)
    recommendations = model.get_recommendations(test_input, predicted_score)
    
    print(f"\n📊 Test Prediction Results:")
    print(f"Predicted Biosecurity Score: {predicted_score:.1f}/100")
    print(f"Risk Level: {risk_level}")
    print(f"Recommendations: {len(recommendations)} suggestions")
    
    # Save model
    print("\n💾 Saving trained model...")
    model.save_model('biosecurity_model.pkl')
    
    print("\n✅ Model training completed successfully!")
    return model

if __name__ == "__main__":
    main()
