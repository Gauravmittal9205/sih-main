from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
from datetime import datetime
import traceback

app = Flask(__name__)
CORS(app)

# Global variables for the model
model = None
model_loaded = False

def load_model():
    """Load the trained biosecurity model"""
    global model, model_loaded
    try:
        if os.path.exists('biosecurity_model.pkl'):
            model = joblib.load('biosecurity_model.pkl')
            model_loaded = True
            print("✅ Biosecurity model loaded successfully")
        else:
            print("❌ Model file not found. Please train the model first.")
            model_loaded = False
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        model_loaded = False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model_loaded,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/predict', methods=['POST'])
def predict_biosecurity_score():
    """Predict biosecurity score based on input data"""
    global model, model_loaded
    
    if not model_loaded:
        return jsonify({
            'error': 'Model not loaded. Please ensure the model is trained and available.',
            'status': 'error'
        }), 500
    
    try:
        # Get input data
        data = request.get_json()
        
        if not data:
            return jsonify({
                'error': 'No input data provided',
                'status': 'error'
            }), 400
        
        # Validate required fields
        required_fields = [
            'farm_size_acres', 'fencing_quality', 'biosecurity_gates', 
            'quarantine_facility', 'vehicle_wash_station', 'livestock_count',
            'vaccination_protocol', 'disease_monitoring', 'isolation_practices',
            'disinfection_frequency', 'personal_protective_equipment', 'visitor_control',
            'feed_storage_security', 'water_source_protection', 'rodent_control',
            'insect_control', 'staff_training', 'protocol_documentation',
            'emergency_plan', 'veterinary_contact'
        ]
        
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {missing_fields}',
                'status': 'error'
            }), 400
        
        # Validate field values
        validation_errors = []
        
        # Numeric validations
        if not isinstance(data['farm_size_acres'], (int, float)) or data['farm_size_acres'] < 0:
            validation_errors.append('farm_size_acres must be a positive number')
        
        if not isinstance(data['livestock_count'], int) or data['livestock_count'] < 0:
            validation_errors.append('livestock_count must be a positive integer')
        
        # Categorical validations
        valid_fencing = ['excellent', 'good', 'fair', 'poor']
        if data['fencing_quality'] not in valid_fencing:
            validation_errors.append(f'fencing_quality must be one of: {valid_fencing}')
        
        valid_yes_no = ['yes', 'no']
        yes_no_fields = ['biosecurity_gates', 'quarantine_facility', 'vehicle_wash_station', 
                        'emergency_plan', 'veterinary_contact']
        for field in yes_no_fields:
            if data[field] not in valid_yes_no:
                validation_errors.append(f'{field} must be "yes" or "no"')
        
        valid_vaccination = ['strict', 'moderate', 'basic', 'none']
        if data['vaccination_protocol'] not in valid_vaccination:
            validation_errors.append(f'vaccination_protocol must be one of: {valid_vaccination}')
        
        valid_monitoring = ['daily', 'weekly', 'monthly', 'rarely']
        if data['disease_monitoring'] not in valid_monitoring:
            validation_errors.append(f'disease_monitoring must be one of: {valid_monitoring}')
        
        valid_practices = ['excellent', 'good', 'fair', 'poor']
        practices_fields = ['isolation_practices', 'feed_storage_security', 
                          'water_source_protection', 'rodent_control', 'insect_control']
        for field in practices_fields:
            if data[field] not in valid_practices:
                validation_errors.append(f'{field} must be one of: {valid_practices}')
        
        valid_frequency = ['daily', 'weekly', 'monthly', 'rarely']
        if data['disinfection_frequency'] not in valid_frequency:
            validation_errors.append(f'disinfection_frequency must be one of: {valid_frequency}')
        
        valid_ppe = ['full', 'partial', 'basic', 'none']
        if data['personal_protective_equipment'] not in valid_ppe:
            validation_errors.append(f'personal_protective_equipment must be one of: {valid_ppe}')
        
        valid_control = ['strict', 'moderate', 'basic', 'none']
        if data['visitor_control'] not in valid_control:
            validation_errors.append(f'visitor_control must be one of: {valid_control}')
        
        valid_training = ['monthly', 'quarterly', 'biannual', 'annual']
        if data['staff_training'] not in valid_training:
            validation_errors.append(f'staff_training must be one of: {valid_training}')
        
        valid_documentation = ['comprehensive', 'moderate', 'basic', 'none']
        if data['protocol_documentation'] not in valid_documentation:
            validation_errors.append(f'protocol_documentation must be one of: {valid_documentation}')
        
        if validation_errors:
            return jsonify({
                'error': 'Validation errors',
                'details': validation_errors,
                'status': 'error'
            }), 400
        
        # Make prediction
        predicted_score = model['best_model'].predict_score(data)
        
        # Get risk level and recommendations
        risk_level, risk_color = model['best_model'].get_risk_level(predicted_score)
        recommendations = model['best_model'].get_recommendations(data, predicted_score)
        
        # Calculate category scores
        category_scores = calculate_category_scores(data)
        
        # Prepare response
        response = {
            'status': 'success',
            'prediction': {
                'biosecurity_score': round(predicted_score, 1),
                'risk_level': risk_level,
                'risk_color': risk_color,
                'max_score': 100
            },
            'category_scores': category_scores,
            'recommendations': recommendations,
            'input_data': data,
            'model_info': {
                'model_name': model['best_model_name'],
                'timestamp': datetime.now().isoformat()
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        print(f"❌ Error in prediction: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            'error': f'Prediction failed: {str(e)}',
            'status': 'error'
        }), 500

def calculate_category_scores(input_data):
    """Calculate scores for different biosecurity categories"""
    scores = {}
    
    # Farm Infrastructure (25 points)
    infra_score = 0
    if input_data['fencing_quality'] == 'excellent': infra_score += 8
    elif input_data['fencing_quality'] == 'good': infra_score += 6
    elif input_data['fencing_quality'] == 'fair': infra_score += 4
    else: infra_score += 1
    
    if input_data['biosecurity_gates'] == 'yes': infra_score += 5
    if input_data['quarantine_facility'] == 'yes': infra_score += 6
    if input_data['vehicle_wash_station'] == 'yes': infra_score += 6
    scores['infrastructure'] = min(infra_score, 25)
    
    # Livestock Management (25 points)
    livestock_score = 0
    if input_data['vaccination_protocol'] == 'strict': livestock_score += 8
    elif input_data['vaccination_protocol'] == 'moderate': livestock_score += 6
    elif input_data['vaccination_protocol'] == 'basic': livestock_score += 4
    else: livestock_score += 1
    
    if input_data['disease_monitoring'] == 'daily': livestock_score += 8
    elif input_data['disease_monitoring'] == 'weekly': livestock_score += 6
    elif input_data['disease_monitoring'] == 'monthly': livestock_score += 4
    else: livestock_score += 1
    
    if input_data['isolation_practices'] == 'excellent': livestock_score += 9
    elif input_data['isolation_practices'] == 'good': livestock_score += 7
    elif input_data['isolation_practices'] == 'fair': livestock_score += 4
    else: livestock_score += 1
    scores['livestock_management'] = min(livestock_score, 25)
    
    # Hygiene Practices (20 points)
    hygiene_score = 0
    if input_data['disinfection_frequency'] == 'daily': hygiene_score += 7
    elif input_data['disinfection_frequency'] == 'weekly': hygiene_score += 5
    elif input_data['disinfection_frequency'] == 'monthly': hygiene_score += 3
    else: hygiene_score += 1
    
    if input_data['personal_protective_equipment'] == 'full': hygiene_score += 7
    elif input_data['personal_protective_equipment'] == 'partial': hygiene_score += 5
    elif input_data['personal_protective_equipment'] == 'basic': hygiene_score += 3
    else: hygiene_score += 1
    
    if input_data['visitor_control'] == 'strict': hygiene_score += 6
    elif input_data['visitor_control'] == 'moderate': hygiene_score += 4
    elif input_data['visitor_control'] == 'basic': hygiene_score += 2
    else: hygiene_score += 0
    scores['hygiene_practices'] = min(hygiene_score, 20)
    
    # Feed and Water (15 points)
    feed_score = 0
    if input_data['feed_storage_security'] == 'excellent': feed_score += 8
    elif input_data['feed_storage_security'] == 'good': feed_score += 6
    elif input_data['feed_storage_security'] == 'fair': feed_score += 4
    else: feed_score += 1
    
    if input_data['water_source_protection'] == 'excellent': feed_score += 7
    elif input_data['water_source_protection'] == 'good': feed_score += 5
    elif input_data['water_source_protection'] == 'fair': feed_score += 3
    else: feed_score += 1
    scores['feed_water'] = min(feed_score, 15)
    
    # Pest Control (10 points)
    pest_score = 0
    if input_data['rodent_control'] == 'excellent': pest_score += 5
    elif input_data['rodent_control'] == 'good': pest_score += 4
    elif input_data['rodent_control'] == 'fair': pest_score += 2
    else: pest_score += 0
    
    if input_data['insect_control'] == 'excellent': pest_score += 5
    elif input_data['insect_control'] == 'good': pest_score += 4
    elif input_data['insect_control'] == 'fair': pest_score += 2
    else: pest_score += 0
    scores['pest_control'] = min(pest_score, 10)
    
    # Training and Documentation (5 points)
    training_score = 0
    if input_data['staff_training'] == 'monthly': training_score += 3
    elif input_data['staff_training'] == 'quarterly': training_score += 2
    elif input_data['staff_training'] == 'biannual': training_score += 1
    else: training_score += 0
    
    if input_data['protocol_documentation'] == 'comprehensive': training_score += 2
    elif input_data['protocol_documentation'] == 'moderate': training_score += 1
    else: training_score += 0
    scores['training_documentation'] = min(training_score, 5)
    
    return scores

@app.route('/model-info', methods=['GET'])
def get_model_info():
    """Get information about the loaded model"""
    global model, model_loaded
    
    if not model_loaded:
        return jsonify({
            'error': 'Model not loaded',
            'status': 'error'
        }), 500
    
    return jsonify({
        'status': 'success',
        'model_name': model['best_model_name'],
        'feature_names': model['feature_names'],
        'model_loaded': model_loaded,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/sample-input', methods=['GET'])
def get_sample_input():
    """Get a sample input structure for the model"""
    sample_input = {
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
    
    return jsonify({
        'status': 'success',
        'sample_input': sample_input,
        'field_descriptions': {
            'farm_size_acres': 'Farm size in acres (positive number)',
            'fencing_quality': 'Quality of farm fencing (excellent/good/fair/poor)',
            'biosecurity_gates': 'Presence of biosecurity gates (yes/no)',
            'quarantine_facility': 'Presence of quarantine facility (yes/no)',
            'vehicle_wash_station': 'Presence of vehicle wash station (yes/no)',
            'livestock_count': 'Number of livestock (positive integer)',
            'vaccination_protocol': 'Vaccination protocol level (strict/moderate/basic/none)',
            'disease_monitoring': 'Disease monitoring frequency (daily/weekly/monthly/rarely)',
            'isolation_practices': 'Isolation practices quality (excellent/good/fair/poor)',
            'disinfection_frequency': 'Disinfection frequency (daily/weekly/monthly/rarely)',
            'personal_protective_equipment': 'PPE level (full/partial/basic/none)',
            'visitor_control': 'Visitor control level (strict/moderate/basic/none)',
            'feed_storage_security': 'Feed storage security (excellent/good/fair/poor)',
            'water_source_protection': 'Water source protection (excellent/good/fair/poor)',
            'rodent_control': 'Rodent control quality (excellent/good/fair/poor)',
            'insect_control': 'Insect control quality (excellent/good/fair/poor)',
            'staff_training': 'Staff training frequency (monthly/quarterly/biannual/annual)',
            'protocol_documentation': 'Protocol documentation level (comprehensive/moderate/basic/none)',
            'emergency_plan': 'Presence of emergency plan (yes/no)',
            'veterinary_contact': 'Veterinary contact availability (yes/no)'
        }
    })

if __name__ == '__main__':
    print("🚀 Starting Biosecurity ML API...")
    
    # Load model on startup
    load_model()
    
    if model_loaded:
        print("✅ API ready with loaded model")
        print("📊 Available endpoints:")
        print("  GET  /health - Health check")
        print("  POST /predict - Predict biosecurity score")
        print("  GET  /model-info - Model information")
        print("  GET  /sample-input - Sample input structure")
    else:
        print("⚠️  API starting without loaded model")
        print("   Train the model first using: python biosecurity_model.py")
    
    # Run the API
    app.run(host='0.0.0.0', port=5001, debug=True)
