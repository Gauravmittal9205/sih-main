import React, { useState } from 'react';
import { MapPin, Bell, Calendar, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Alert {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  severity: 'low' | 'medium' | 'high';
  location: string;
  date: string;
  status: 'active' | 'resolved' | 'monitoring';
  affectedAnimals: string[];
}

const alerts: Alert[] = [
  {
    id: '1',
    title: { 
      en: 'Avian Flu Outbreak - North Punjab', 
      hi: 'Avian Flu ka Outbreak - North Punjab' 
    },
    description: { 
      en: 'H5N1 strain detected in commercial poultry farms. Immediate quarantine measures in effect.',
      hi: 'Commercial poultry farms mein H5N1 strain detect hua. Turant quarantine measures lagaye gaye hain.'
    },
    severity: 'high',
    location: 'Ludhiana, Punjab',
    date: '2025-01-14',
    status: 'active',
    affectedAnimals: ['Chickens', 'Ducks']
  },
  {
    id: '2',
    title: { 
      en: 'Swine Fever Alert - Western Gujarat', 
      hi: 'Swine Fever Alert - Western Gujarat' 
    },
    description: { 
      en: 'Classical swine fever reported in 3 pig farms. Vaccination drive initiated.',
      hi: '3 pig farms mein classical swine fever report hua. Vaccination drive shuru kiya gaya.'
    },
    severity: 'medium',
    location: 'Rajkot, Gujarat',
    date: '2025-01-12',
    status: 'monitoring',
    affectedAnimals: ['Pigs']
  },
  {
    id: '3',
    title: { 
      en: 'Foot and Mouth Disease - Resolved', 
      hi: 'Foot and Mouth Disease - Resolved' 
    },
    description: { 
      en: 'Previous outbreak in cattle farms has been successfully contained.',
      hi: 'Cattle farms mein pehle ka outbreak successfully contain ho gaya.'
    },
    severity: 'low',
    location: 'Hisar, Haryana',
    date: '2025-01-08',
    status: 'resolved',
    affectedAnimals: ['Cattle']
  }
];

const Alerts = () => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'monitoring': return <Info className="h-5 w-5 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return null;
    }
  };

  const filteredAlerts = alerts.filter(alert => 
    filterSeverity === 'all' || alert.severity === filterSeverity
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Disease Alerts & Outbreaks' : 'Disease Alerts aur Outbreaks'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {language === 'en' 
              ? 'Stay informed about disease outbreaks in your area and take preventive action'
              : 'Apne area mein disease outbreaks ki jaankari rahein aur preventive action lein'
            }
          </p>

          {/* Subscription Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-teal-500 to-blue-500 p-3 rounded-full">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {language === 'en' ? 'Get Real-time Alerts' : 'Real-time Alerts Paayein'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'en' 
                ? 'Subscribe to receive instant notifications about disease outbreaks in your area'
                : 'Apne area mein disease outbreaks ki instant notifications ke liye subscribe karein'
              }
            </p>
            <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
              {language === 'en' ? 'Subscribe to Alerts' : 'Alerts ke liye Subscribe karein'}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'map' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Map View
              </button>
            </div>

            <div className="flex gap-2">
              {['all', 'high', 'medium', 'low'].map((severity) => (
                <button
                  key={severity}
                  onClick={() => setFilterSeverity(severity as any)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterSeverity === severity 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(alert.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {alert.title[language]}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {alert.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(alert.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {alert.description[language]}
                </p>

                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                    {alert.affectedAnimals.map((animal, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {animal}
                      </span>
                    ))}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    alert.status === 'active' ? 'bg-red-100 text-red-700' :
                    alert.status === 'monitoring' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map View Placeholder */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  {language === 'en' ? 'Interactive map coming soon' : 'Interactive map jald aayega'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;