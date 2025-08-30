import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BiosecurityQuestion {
  id: string;
  label: string;
  maxScore: number;
}

interface BiosecurityCategory {
  id: string;
  label: string;
  questions: BiosecurityQuestion[];
}

interface MLPredictionResult {
  biometric_score?: number;
  risk_level?: string;
  prediction?: string;
  confidence?: number;
  category_scores?: Record<string, number>;
  recommendations?: string[];
  detailed_analysis?: {
    overall_assessment?: string;
    risk_category?: string;
    ml_confidence?: string;
    priority_areas?: string[];
  };
}

const biosecurityCategories: BiosecurityCategory[] = [
  {
    id: 'hygiene',
    label: 'Hygiene',
    questions: [
      { id: 'cleaning', label: 'Regular cleaning schedule', maxScore: 20 },
      { id: 'disinfection', label: 'Disinfection protocols', maxScore: 20 },
      { id: 'waste', label: 'Waste management', maxScore: 20 }
    ]
  },
  {
    id: 'accessControl',
    label: 'Access Control',
    questions: [
      { id: 'visitors', label: 'Visitor management', maxScore: 20 },
      { id: 'equipment', label: 'Equipment disinfection', maxScore: 20 },
      { id: 'vehicles', label: 'Vehicle control', maxScore: 20 }
    ]
  },
  {
    id: 'quarantine',
    label: 'Quarantine',
    questions: [
      { id: 'newAnimals', label: 'New animal isolation', maxScore: 20 },
      { id: 'sickAnimals', label: 'Sick animal isolation', maxScore: 20 },
      { id: 'returningAnimals', label: 'Returning animal protocols', maxScore: 20 }
    ]
  },
  {
    id: 'pestControl',
    label: 'Pest Control',
    questions: [
      { id: 'rodents', label: 'Rodent control', maxScore: 20 },
      { id: 'wildBirds', label: 'Wild bird control', maxScore: 20 },
      { id: 'insects', label: 'Insect control', maxScore: 20 }
    ]
  },
  {
    id: 'feedWater',
    label: 'Feed & Water',
    questions: [
      { id: 'feedQuality', label: 'Feed quality control', maxScore: 20 },
      { id: 'waterQuality', label: 'Water quality control', maxScore: 20 },
      { id: 'storage', label: 'Proper storage', maxScore: 20 }
    ]
  }
];

const BiosecurityAssessment = () => {
  const { language } = useLanguage();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [mlResult, setMlResult] = useState<MLPredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved assessment data
    const savedData = localStorage.getItem('biosecurityAssessment');
    if (savedData) {
      const data = JSON.parse(savedData);
      setScores(data);
    }
  }, []);

  const saveAssessment = () => {
    localStorage.setItem('biosecurityAssessment', JSON.stringify(scores));
  };

  const handleScoreChange = (questionId: string, score: number) => {
    const newScores = { ...scores, [questionId]: score };
    setScores(newScores);
    saveAssessment();
  };

  const goNext = () => {
    const currentCat = biosecurityCategories[currentCategory];
    if (currentQuestion < currentCat.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentCategory < biosecurityCategories.length - 1) {
      setCurrentCategory(currentCategory + 1);
      setCurrentQuestion(0);
    } else {
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
      const prevCat = biosecurityCategories[currentCategory - 1];
      setCurrentQuestion(prevCat.questions.length - 1);
    }
  };

  const calculateCategoryScore = (categoryId: string) => {
    const category = biosecurityCategories.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    let totalScore = 0;
    let maxScore = 0;
    category.questions.forEach(question => {
      totalScore += scores[question.id] || 0;
      maxScore += question.maxScore;
    });
    return Math.round((totalScore / maxScore) * 100);
  };

  const calculateOverallScore = () => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    biosecurityCategories.forEach(category => {
      category.questions.forEach(question => {
        totalScore += scores[question.id] || 0;
        maxPossibleScore += question.maxScore;
      });
    });
    return Math.round((totalScore / maxPossibleScore) * 100);
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (score >= 60) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (score >= 40) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { level: 'Poor', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Prepare quiz answers in the format expected by ML API
      const quizAnswers: Record<string, number> = {};
      biosecurityCategories.forEach((category, catIndex) => {
        category.questions.forEach((question, qIndex) => {
          const questionNumber = catIndex * 3 + qIndex + 1;
          quizAnswers[`q${questionNumber}`] = scores[question.id] || 0;
        });
      });

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizAnswers)
      });

      const data = await response.json();
      console.log("Prediction result:", data);
      setMlResult(data);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setMlResult({ 
        prediction: "Error", 
        risk_level: "Unknown",
        recommendations: ["Unable to get ML prediction. Please try again."]
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showResults) {
    const overallScore = calculateOverallScore();
    const overallLevel = getScoreLevel(overallScore);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Biosecurity Assessment Results
            </h1>
            <p className="text-gray-600">
              Your farm's biosecurity score and AI-powered recommendations
            </p>
          </div>

          {/* ML Prediction Results */}
          {mlResult && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Risk Assessment</h3>
              
              {/* Biometric Score Display */}
              {mlResult.biometric_score !== undefined && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Biometric Score</h4>
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-3">
                      <span className="text-2xl font-bold">{mlResult.biometric_score}</span>
                    </div>
                    <p className="text-sm text-gray-600">out of 100</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Risk Level:</span>
                    <div className={`inline-block ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                      mlResult.risk_level === 'High' ? 'bg-red-100 text-red-800' :
                      mlResult.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {mlResult.risk_level || 'Unknown'}
                    </div>
                  </div>
                  {mlResult.confidence && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">AI Confidence:</span>
                      <span className="ml-2 text-lg font-semibold text-blue-600">
                        {Math.round(mlResult.confidence * 100)}%
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">AI Prediction:</span>
                  <p className="mt-1 text-lg font-semibold text-gray-800">
                    {mlResult.prediction || 'No prediction available'}
                  </p>
                </div>
              </div>
              
              {/* Category Scores from ML */}
              {mlResult.category_scores && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Category Analysis:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(mlResult.category_scores).map(([category, score]) => (
                      <div key={category} className={`p-3 rounded-lg border ${
                        score < 10 ? 'bg-red-50 border-red-200' :
                        score < 15 ? 'bg-yellow-50 border-yellow-200' :
                        'bg-green-50 border-green-200'
                      }`}>
                        <div className="text-sm font-medium text-gray-700">{category}</div>
                        <div className={`text-lg font-bold ${
                          score < 10 ? 'text-red-600' :
                          score < 15 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {score}/20
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Priority Areas */}
              {mlResult.detailed_analysis?.priority_areas && mlResult.detailed_analysis.priority_areas.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Priority Areas for Improvement:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mlResult.detailed_analysis.priority_areas.map((area, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {mlResult.recommendations && mlResult.recommendations.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">AI Recommendations:</h4>
                  <ul className="space-y-2">
                    {mlResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${overallLevel.bgColor} mb-4`}>
                <span className={`text-3xl font-bold ${overallLevel.color}`}>
                  {overallScore}%
                </span>
              </div>
              <h2 className={`text-2xl font-bold ${overallLevel.color} mb-2`}>
                {overallLevel.level}
              </h2>
              <p className="text-gray-600">
                Overall Biosecurity Score
              </p>
            </div>
          </div>

          {/* Category Scores */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {biosecurityCategories.map((category) => {
                const score = calculateCategoryScore(category.id);
                const level = getScoreLevel(score);
                return (
                  <div key={category.id} className={`p-4 rounded-lg border ${level.bgColor}`}>
                    <h4 className="font-semibold text-gray-800 mb-2">{category.label}</h4>
                    <div className="flex items-center justify-between">
                      <span className={`text-lg font-bold ${level.color}`}>{score}%</span>
                      <span className={`text-sm ${level.color}`}>{level.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {!mlResult && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analyzing...' : 'Get AI Analysis'}
              </button>
            )}
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentCategory(0);
                setCurrentQuestion(0);
                setMlResult(null);
              }}
              className="bg-gray-600 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
            >
              Retake Assessment
            </button>
            <button
              onClick={() => window.location.href = '/farmer'}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCat = biosecurityCategories[currentCategory];
  const currentQ = currentCat.questions[currentQuestion];
  const totalQuestions = biosecurityCategories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const currentQuestionNumber = biosecurityCategories
    .slice(0, currentCategory)
    .reduce((sum, cat) => sum + cat.questions.length, 0) + currentQuestion + 1;
  const progress = (currentQuestionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Biosecurity Assessment
          </h1>
          <p className="text-gray-600">
            Evaluate your farm's biosecurity measures across different categories
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-teal-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm font-medium text-gray-600">
              Category: {currentCat.label}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQ.label}
          </h2>
          <p className="text-gray-600 mb-6">
            Rate your current implementation of this biosecurity measure (0-20 points)
          </p>

          {/* Score Input */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Score</span>
              <span className="text-lg font-bold text-teal-600">
                {scores[currentQ.id] || 0} / {currentQ.maxScore}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={currentQ.maxScore}
              value={scores[currentQ.id] || 0}
              onChange={(e) => handleScoreChange(currentQ.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Poor (0)</span>
              <span>Fair (5)</span>
              <span>Good (10)</span>
              <span>Very Good (15)</span>
              <span>Excellent (20)</span>
            </div>
          </div>

          {/* Score Description */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              {scores[currentQ.id] >= 15 ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              ) : scores[currentQ.id] >= 10 ? (
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span className="font-medium text-gray-800">
                {scores[currentQ.id] >= 15 ? 'Excellent' : 
                 scores[currentQ.id] >= 10 ? 'Good' : 
                 scores[currentQ.id] >= 5 ? 'Fair' : 'Poor'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {scores[currentQ.id] >= 15 ? 'This measure is well implemented and maintained.' :
               scores[currentQ.id] >= 10 ? 'This measure is implemented but could be improved.' :
               scores[currentQ.id] >= 5 ? 'This measure needs attention and improvement.' :
               'This measure requires immediate attention and implementation.'}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={goBack}
              disabled={currentCategory === 0 && currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                currentCategory === 0 && currentQuestion === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </button>

            <button
              onClick={goNext}
              className="flex items-center px-6 py-3 rounded-full font-medium bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              {currentCategory === biosecurityCategories.length - 1 && currentQuestion === currentCat.questions.length - 1 ? 'View Results' : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiosecurityAssessment;
