import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Grid, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRiskStore } from '../stores/riskStore';
import RiskResult from '../components/RiskResult';

interface Question {
  id: string;
  question: { en: string; hi: string };
  options: { value: number; label: { en: string; hi: string } }[];
}

const questions: Question[] = [
  {
    id: 'animalType',
    question: {
      en: 'What type of animals do you primarily raise?',
      hi: 'Aap mukhya roop se kaun se jaanwar paaltē hain?'
    },
    options: [
      { value: 1, label: { en: 'Poultry (Chickens/Ducks)', hi: 'Poultry (Murgi/Batakh)' } },
      { value: 2, label: { en: 'Pigs', hi: 'Suar' } },
      { value: 3, label: { en: 'Mixed (Poultry + Pigs)', hi: 'Mixed (Poultry + Suar)' } },
      { value: 1, label: { en: 'Other livestock', hi: 'Anya jaanwar' } }
    ]
  },
  {
    id: 'visitors',
    question: {
      en: 'How many visitors come to your farm per week?',
      hi: 'Hafte mein kitne visitors aapke farm par aate hain?'
    },
    options: [
      { value: 1, label: { en: '0-2 visitors', hi: '0-2 visitors' } },
      { value: 2, label: { en: '3-5 visitors', hi: '3-5 visitors' } },
      { value: 3, label: { en: '6-10 visitors', hi: '6-10 visitors' } },
      { value: 4, label: { en: 'More than 10', hi: '10 se jyada' } }
    ]
  },
  {
    id: 'entryControls',
    question: {
      en: 'Do you have entry controls for visitors?',
      hi: 'Kya aapke paas visitors ke liye entry controls hain?'
    },
    options: [
      { value: 1, label: { en: 'Yes, strict controls', hi: 'Haan, sakht controls' } },
      { value: 2, label: { en: 'Some basic measures', hi: 'Kuch basic measures' } },
      { value: 3, label: { en: 'Minimal controls', hi: 'Minimal controls' } },
      { value: 4, label: { en: 'No specific controls', hi: 'Koi specific controls nahi' } }
    ]
  },
  {
    id: 'feedSource',
    question: {
      en: 'Where do you primarily source your animal feed?',
      hi: 'Aap apna animal feed mukhya roop se kahan se laate hain?'
    },
    options: [
      { value: 1, label: { en: 'Certified suppliers only', hi: 'Sirf certified suppliers se' } },
      { value: 2, label: { en: 'Mix of certified and local', hi: 'Certified aur local ka mix' } },
      { value: 3, label: { en: 'Mostly local sources', hi: 'Jyada tar local sources' } },
      { value: 4, label: { en: 'Various unknown sources', hi: 'Various unknown sources' } }
    ]
  },
  {
    id: 'sickAnimals',
    question: {
      en: 'Have you had sick animals in the past 3 months?',
      hi: 'Kya pichle 3 mahine mein aapke paas bimar jaanwar the?'
    },
    options: [
      { value: 1, label: { en: 'No sick animals', hi: 'Koi bimar jaanwar nahi' } },
      { value: 2, label: { en: 'Isolated cases, treated', hi: 'Isolated cases, treat kiye' } },
      { value: 3, label: { en: 'Multiple cases', hi: 'Multiple cases' } },
      { value: 4, label: { en: 'Ongoing health issues', hi: 'Ongoing health issues' } }
    ]
  },
  {
    id: 'proximity',
    question: {
      en: 'How far is your farm from the nearest livestock market?',
      hi: 'Aapka farm sabse nazdeeki livestock market se kitni door hai?'
    },
    options: [
      { value: 1, label: { en: 'More than 10 km', hi: '10 km se jyada' } },
      { value: 2, label: { en: '5-10 km', hi: '5-10 km' } },
      { value: 3, label: { en: '1-5 km', hi: '1-5 km' } },
      { value: 4, label: { en: 'Less than 1 km', hi: '1 km se kam' } }
    ]
  }
];

type ProductionSystem = 'poultry' | 'pigs' | 'mixed';

const stateRisk: Record<string, { poultry: number; pigs: number; mixed: number; label: string }[]> = {
  en: [
    { label: 'Punjab', poultry: 2, pigs: 1, mixed: 2 },
    { label: 'Gujarat', poultry: 1, pigs: 2, mixed: 2 },
    { label: 'Haryana', poultry: 2, pigs: 1, mixed: 2 },
    { label: 'Maharashtra', poultry: 1, pigs: 1, mixed: 1 },
  ],
  hi: [
    { label: 'Punjab', poultry: 2, pigs: 1, mixed: 2 },
    { label: 'Gujarat', poultry: 1, pigs: 2, mixed: 2 },
    { label: 'Haryana', poultry: 2, pigs: 1, mixed: 2 },
    { label: 'Maharashtra', poultry: 1, pigs: 1, mixed: 1 },
  ],
};

const RiskChecker = () => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const { saveAssessment, assessments } = useRiskStore();
  const [selectedState, setSelectedState] = useState<string>('Punjab');
  const [system, setSystem] = useState<ProductionSystem>('poultry');

  useEffect(() => {
    // Load any saved progress
    const saved = localStorage.getItem('riskCheckerProgress');
    if (saved) {
      const { answers: savedAnswers, step } = JSON.parse(saved);
      setAnswers(savedAnswers);
      setCurrentStep(step);
    }
  }, []);

  const saveProgress = () => {
    localStorage.setItem('riskCheckerProgress', JSON.stringify({
      answers,
      step: currentStep,
      selectedState,
      system,
    }));
  };

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    saveProgress();
  };

  const goNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      saveProgress();
    } else {
      calculateRisk();
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRisk = () => {
    const baseScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const locationEntry = stateRisk[language].find(s => s.label === selectedState);
    const epiModifier = locationEntry ? (system === 'poultry' ? locationEntry.poultry : system === 'pigs' ? locationEntry.pigs : locationEntry.mixed) : 0;
    const totalScore = baseScore + epiModifier; // simple additive modifier 0-2
    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;
    
    let riskLevel: 'low' | 'medium' | 'high';
    if (percentage <= 35) riskLevel = 'low';
    else if (percentage <= 65) riskLevel = 'medium';
    else riskLevel = 'high';

    const assessment = {
      id: Date.now().toString(),
      answers,
      score: totalScore,
      riskLevel,
      date: new Date().toISOString(),
      farmName: 'My Farm' // Could be from a form
    };

    saveAssessment(assessment);
    setShowResult(true);
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
    localStorage.removeItem('riskCheckerProgress');
  };

  if (showResult) {
    return <RiskResult answers={answers} onRestart={resetAssessment} />;
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {t('risk.title')}
          </h1>
          <p className="text-gray-600">
            {t('risk.subtitle')}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          {/* Location & System selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" /> {t('risk.location')}
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {stateRisk[language].map((s) => (
                  <option key={s.label} value={s.label}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
                <Grid className="h-4 w-4 mr-2" /> {t('risk.system')}
              </label>
              <div className="flex gap-2">
                {([
                  { id: 'poultry', label: language === 'en' ? 'Poultry' : 'Poultry' },
                  { id: 'pigs', label: language === 'en' ? 'Pigs' : 'Suar' },
                  { id: 'mixed', label: language === 'en' ? 'Mixed' : 'Mixed' }
                ] as { id: ProductionSystem; label: string }[]).map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSystem(opt.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      system === opt.id ? 'bg-teal-600 text-white border-teal-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Local risk banner */}
          <div className="mb-6">
            {(() => {
              const entry = stateRisk[language].find(s => s.label === selectedState);
              const level = entry ? (system === 'poultry' ? entry.poultry : system === 'pigs' ? entry.pigs : entry.mixed) : 0;
              const textKey = level >= 2 ? 'risk.local-risk-high' : level === 1 ? 'risk.local-risk-medium' : 'risk.local-risk-low';
              const color = level >= 2 ? 'bg-red-50 text-red-700 border-red-200' : level === 1 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200';
              const Icon = level >= 2 ? AlertTriangle : level === 1 ? AlertTriangle : AlertTriangle;
              return (
                <div className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm ${color}`}>
                  <Icon className="h-4 w-4" />
                  <span>{t(textKey)}</span>
                </div>
              );
            })()}
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {questions.length}
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
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question[language]}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option.value}
                  checked={answers[currentQuestion.id] === option.value}
                  onChange={() => handleAnswer(currentQuestion.id, option.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-teal-500 bg-teal-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion.id] === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-gray-700 font-medium">
                  {option.label[language]}
                </span>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={goBack}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t('btn.back')}
            </button>

            <button
              onClick={goNext}
              disabled={!answers[currentQuestion.id]}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                answers[currentQuestion.id]
                  ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === questions.length - 1 ? t('btn.submit') : t('btn.next')}
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Previous Assessments */}
        {assessments.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Previous Assessments</h3>
            <div className="space-y-2">
              {assessments.slice(0, 3).map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      assessment.riskLevel === 'low' ? 'bg-green-500' :
                      assessment.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-700">
                      {assessment.farmName}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(assessment.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskChecker;