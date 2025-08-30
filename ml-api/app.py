from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import random
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

app = Flask(__name__)

MODEL_PATH = "biometric_model.pkl"
ENCODER_PATH = "label_encoder.pkl"
SCALER_PATH = "scaler.pkl"

# Enhanced dummy dataset generation with more realistic patterns
if not os.path.exists("biometric_quiz_data.csv"):
    rows = []
    for _ in range(500):  # Increased dataset size
        # Generate more realistic scores with correlations
        base_score = random.randint(5, 18)  # Base biosecurity level
        
        # Generate correlated scores across categories
        scores = []
        for i in range(15):
            if i < 3:  # Hygiene category
                score = max(0, min(20, base_score + random.randint(-3, 3)))
            elif i < 6:  # Access Control
                score = max(0, min(20, base_score + random.randint(-4, 2)))
            elif i < 9:  # Quarantine
                score = max(0, min(20, base_score + random.randint(-5, 1)))
            elif i < 12:  # Pest Control
                score = max(0, min(20, base_score + random.randint(-3, 3)))
            else:  # Feed & Water
                score = max(0, min(20, base_score + random.randint(-2, 4)))
            scores.append(score)
        
        # Calculate biometric score (0-100)
        biometric_score = int((sum(scores) / 300) * 100)
        
        # Determine risk level based on biometric score
        if biometric_score < 40:
            risk = "High"
        elif biometric_score < 70:
            risk = "Medium"
        else:
            risk = "Low"
            
        rows.append(scores + [biometric_score, risk])
    
    columns = [f"q{i}" for i in range(1,16)] + ["biometric_score", "risk"]
    pd.DataFrame(rows, columns=columns).to_csv("biometric_quiz_data.csv", index=False)
    print("✅ Enhanced dummy dataset created with biometric scores!")

# Train enhanced model if not exists
if os.path.exists(MODEL_PATH) and os.path.exists(ENCODER_PATH) and os.path.exists(SCALER_PATH):
    model = joblib.load(MODEL_PATH)
    le = joblib.load(ENCODER_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("✅ Model loaded from saved files!")
else:
    df = pd.read_csv("biometric_quiz_data.csv")
    
    # Prepare features and target
    X = df.drop(["risk", "biometric_score"], axis=1)
    y = df["risk"]
    
    # Split data for training
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train logistic regression
    model = LogisticRegression(max_iter=1000, random_state=42, C=1.0)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"✅ Model trained with accuracy: {accuracy:.2f}")
    
    # Save model components
    joblib.dump(model, MODEL_PATH)
    joblib.dump(le, ENCODER_PATH)
    joblib.dump(scaler, SCALER_PATH)
    print("✅ Model, encoder, and scaler saved!")

def calculate_biometric_score(scores):
    """Calculate biometric score from quiz answers"""
    total_score = sum(scores)
    biometric_score = int((total_score / 300) * 100)  # Convert to 0-100 scale
    return biometric_score

def get_risk_level(biometric_score):
    """Determine risk level based on biometric score"""
    if biometric_score < 40:
        return "High"
    elif biometric_score < 70:
        return "Medium"
    else:
        return "Low"

def get_recommendations(biometric_score, category_scores):
    """Generate specific recommendations based on scores"""
    recommendations = []
    
    # Overall recommendations
    if biometric_score < 40:
        recommendations.append("Immediate action required: Your farm has critical biosecurity gaps")
        recommendations.append("Consider consulting with a biosecurity expert")
        recommendations.append("Implement emergency biosecurity protocols")
    elif biometric_score < 70:
        recommendations.append("Moderate improvements needed to enhance biosecurity")
        recommendations.append("Focus on high-priority areas identified in assessment")
        recommendations.append("Develop action plan for gradual improvements")
    else:
        recommendations.append("Excellent biosecurity practices maintained")
        recommendations.append("Continue monitoring and periodic reassessment")
        recommendations.append("Consider advanced biosecurity measures")
    
    # Category-specific recommendations
    categories = ["Hygiene", "Access Control", "Quarantine", "Pest Control", "Feed & Water"]
    for i, category in enumerate(categories):
        start_idx = i * 3
        end_idx = start_idx + 3
        category_avg = sum(category_scores[start_idx:end_idx]) / 3
        
        if category_avg < 10:
            recommendations.append(f"Priority: Improve {category} practices (current avg: {category_avg:.1f}/20)")
        elif category_avg < 15:
            recommendations.append(f"Enhance {category} protocols (current avg: {category_avg:.1f}/20)")
    
    return recommendations

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        # Extract quiz scores
        quiz_scores = [data.get(f"q{i}", 0) for i in range(1, 16)]
        
        # Calculate biometric score
        biometric_score = calculate_biometric_score(quiz_scores)
        
        # Determine risk level
        risk_level = get_risk_level(biometric_score)
        
        # Get ML predictions
        features = np.array(quiz_scores).reshape(1, -1)
        features_scaled = scaler.transform(features)
        
        # Get prediction probabilities
        probs = model.predict_proba(features_scaled)[0]
        predicted_risk = model.predict(features_scaled)[0]
        
        # Get confidence (highest probability)
        confidence = float(np.max(probs))
        
        # Generate recommendations
        recommendations = get_recommendations(biometric_score, quiz_scores)
        
        # Calculate category scores
        category_scores = {}
        categories = ["Hygiene", "Access Control", "Quarantine", "Pest Control", "Feed & Water"]
        for i, category in enumerate(categories):
            start_idx = i * 3
            end_idx = start_idx + 3
            category_scores[category] = int(sum(quiz_scores[start_idx:end_idx]) / 3)
        
        return jsonify({
            "biometric_score": biometric_score,
            "risk_level": risk_level,
            "prediction": f"Biosecurity Risk: {predicted_risk}",
            "confidence": confidence,
            "category_scores": category_scores,
            "recommendations": recommendations,
            "detailed_analysis": {
                "overall_assessment": f"Your farm has a biosecurity score of {biometric_score}/100",
                "risk_category": f"Risk Level: {risk_level}",
                "ml_confidence": f"AI Confidence: {confidence:.1%}",
                "priority_areas": [cat for cat, score in category_scores.items() if score < 15]
            }
        })
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "biometric_score": 0,
            "risk_level": "Unknown",
            "prediction": "Error in prediction",
            "recommendations": ["Please check your input data and try again"]
        }), 400

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "model_loaded": True})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
