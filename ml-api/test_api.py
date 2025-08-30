import requests
import json

def test_ml_api():
    """Test the ML API with sample quiz data"""
    
    # Sample quiz data (15 questions with scores 0-20)
    sample_quiz = {
        "q1": 15,   # Hygiene - cleaning
        "q2": 18,   # Hygiene - disinfection
        "q3": 12,   # Hygiene - waste
        "q4": 16,   # Access Control - visitors
        "q5": 14,   # Access Control - equipment
        "q6": 10,   # Access Control - vehicles
        "q7": 8,    # Quarantine - new animals
        "q8": 6,    # Quarantine - sick animals
        "q9": 12,   # Quarantine - returning animals
        "q10": 14,  # Pest Control - rodents
        "q11": 16,  # Pest Control - wild birds
        "q12": 18,  # Pest Control - insects
        "q13": 17,  # Feed & Water - feed quality
        "q14": 19,  # Feed & Water - water quality
        "q15": 15   # Feed & Water - storage
    }
    
    try:
        # Test the predict endpoint
        response = requests.post(
            "http://127.0.0.1:8000/predict",
            json=sample_quiz,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ API Test Successful!")
            print(f"Biometric Score: {result.get('biometric_score', 'N/A')}/100")
            print(f"Risk Level: {result.get('risk_level', 'N/A')}")
            print(f"AI Confidence: {result.get('confidence', 'N/A'):.1%}")
            print(f"Prediction: {result.get('prediction', 'N/A')}")
            
            print("\n📊 Category Scores:")
            if result.get('category_scores'):
                for category, score in result['category_scores'].items():
                    print(f"  {category}: {score}/20")
            
            print("\n🎯 Priority Areas:")
            if result.get('detailed_analysis', {}).get('priority_areas'):
                for area in result['detailed_analysis']['priority_areas']:
                    print(f"  • {area}")
            
            print("\n💡 Recommendations:")
            if result.get('recommendations'):
                for i, rec in enumerate(result['recommendations'], 1):
                    print(f"  {i}. {rec}")
                    
        else:
            print(f"❌ API Error: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the ML API is running on port 8000")
    except Exception as e:
        print(f"❌ Test Error: {str(e)}")

if __name__ == "__main__":
    print("🧪 Testing ML API...")
    test_ml_api()
