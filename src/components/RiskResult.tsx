import React from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle, Download, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface RiskResultProps {
  answers: Record<string, number>;
  onRestart: () => void;
}

const RiskResult: React.FC<RiskResultProps> = ({ answers, onRestart }) => {
  const { language, t } = useLanguage();
  
  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const maxScore = 24; // 6 questions * 4 max points
  const percentage = (totalScore / maxScore) * 100;
  
  let riskLevel: 'low' | 'medium' | 'high';
  let riskColor: string;
  let riskIcon: React.ReactNode;
  let recommendations: { en: string; hi: string }[];

  if (percentage <= 35) {
    riskLevel = 'low';
    riskColor = 'text-green-600 bg-green-50 border-green-200';
    riskIcon = <CheckCircle2 className="h-8 w-8 text-green-600" />;
    recommendations = [
      { en: 'Continue current practices', hi: 'Current practices continue karein' },
      { en: 'Regular health monitoring', hi: 'Regular health monitoring' },
      { en: 'Update vaccination schedule', hi: 'Vaccination schedule update karein' }
    ];
  } else if (percentage <= 65) {
    riskLevel = 'medium';
    riskColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
    riskIcon = <AlertCircle className="h-8 w-8 text-yellow-600" />;
    recommendations = [
      { en: 'Improve visitor controls', hi: 'Visitor controls improve karein' },
      { en: 'Review feed sources', hi: 'Feed sources review karein' },
      { en: 'Implement quarantine protocols', hi: 'Quarantine protocols implement karein' },
      { en: 'Consult with local vet', hi: 'Local vet se consult karein' }
    ];
  } else {
    riskLevel = 'high';
    riskColor = 'text-red-600 bg-red-50 border-red-200';
    riskIcon = <AlertTriangle className="h-8 w-8 text-red-600" />;
    recommendations = [
      { en: 'Immediate action required', hi: 'Turant action zaroori' },
      { en: 'Quarantine new animals', hi: 'Naye jaanwaron ko quarantine karein' },
      { en: 'Limit all visitors', hi: 'Saare visitors ko limit karein' },
      { en: 'Call veterinarian urgently', hi: 'Veterinarian ko turant call karein' },
      { en: 'Review all biosecurity measures', hi: 'Saare biosecurity measures review karein' }
    ];
  }

  const exportPDF = () => {
    // Simple PDF export simulation
    const content = `
Farm Risk Assessment Report
Date: ${new Date().toLocaleDateString()}
Risk Level: ${riskLevel.toUpperCase()}
Score: ${totalScore}/${maxScore}

Recommendations:
${recommendations.map(rec => `- ${rec.en}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'farm-risk-assessment.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Result Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Assessment Complete
          </h1>
          <p className="text-gray-600">
            Here are your results and personalized recommendations
          </p>
        </div>

        {/* Risk Level Card */}
        <div className={`border-2 rounded-2xl p-6 sm:p-8 mb-8 ${riskColor}`}>
          <div className="flex items-center justify-center mb-4">
            {riskIcon}
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            {riskLevel === 'low' && t('risk.low')}
            {riskLevel === 'medium' && t('risk.medium')}
            {riskLevel === 'high' && t('risk.high')}
          </h2>
          <div className="text-center">
            <div className="text-lg font-medium mb-2">
              Score: {totalScore}/{maxScore} ({Math.round(percentage)}%)
            </div>
            {riskLevel === 'high' && (
              <p className="text-sm">
                {language === 'en' 
                  ? 'Immediate action needed to protect your farm' 
                  : 'Farm ko bachane ke liye turant action zaroori'
                }
              </p>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {language === 'en' ? 'Recommended Actions' : 'Suggested Actions'}
          </h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-teal-100 rounded-full p-1 mr-3 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                </div>
                <span className="text-gray-700">
                  {rec[language]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={exportPDF}
            className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            {t('btn.export')}
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Take New Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskResult;