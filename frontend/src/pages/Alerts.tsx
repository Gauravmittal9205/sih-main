import React, { useState } from 'react';
import { MapPin, Bell, Calendar, AlertTriangle, Info, CheckCircle, X, Mail, Phone, Globe, Shield, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AlertMap from '../components/AlertMap';

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

interface SubscribeForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  alertTypes: string[];
  notificationMethod: 'email' | 'sms' | 'both';
}

const Alerts = () => {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeForm, setSubscribeForm] = useState<SubscribeForm>({
    name: '',
    email: '',
    phone: '',
    location: '',
    alertTypes: [],
    notificationMethod: 'email'
  });
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubscribing(false);
    setSubscribeSuccess(true);
    
    // Reset form and close modal after 3 seconds
    setTimeout(() => {
      setShowSubscribeModal(false);
      setSubscribeSuccess(false);
      setSubscribeForm({
        name: '',
        email: '',
        phone: '',
        location: '',
        alertTypes: [],
        notificationMethod: 'email'
      });
    }, 3000);
  };

  const handleAlertTypeToggle = (alertType: string) => {
    setSubscribeForm(prev => ({
      ...prev,
      alertTypes: prev.alertTypes.includes(alertType)
        ? prev.alertTypes.filter(type => type !== alertType)
        : [...prev.alertTypes, alertType]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl opacity-10 transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl opacity-10 transform -rotate-1"></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-4 rounded-full shadow-lg">
                  <Bell className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                {t('alerts.title')}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                {t('alerts.subtitle')}
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-red-600">3</p>
                      <p className="text-sm text-red-700">Active Alerts</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">5</p>
                      <p className="text-sm text-yellow-700">Monitoring</p>
                    </div>
                    <Info className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-green-700">Resolved</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">150+</p>
                      <p className="text-sm text-blue-700">Safe Farms</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Enhanced Subscription Card */}
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                      <Bell className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-2 text-center">
                    {t('alerts.get-alerts')}
                  </h3>
                  
                  <p className="text-center mb-6 opacity-90">
                    {t('alerts.subscribe-description')}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={() => setShowSubscribeModal(true)}
                      className="bg-white text-teal-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
                    >
                      {t('alerts.subscribe')}
                    </button>
                    
                    <button 
                      onClick={() => setShowLearnMoreModal(true)}
                      className="border-2 border-white/30 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/10 transition-all"
                    >
                      {t('alerts.learn-more')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📋 {t('alerts.list-view')}
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  viewMode === 'map' 
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                🗺️ {t('alerts.map-view')}
              </button>
            </div>

            <div className="flex gap-2">
              {['all', 'high', 'medium', 'low'].map((severity) => (
                <button
                  key={severity}
                  onClick={() => setFilterSeverity(severity as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    filterSeverity === severity 
                      ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {severity === 'all' ? t('all') : t(severity.charAt(0).toUpperCase() + severity.slice(1))}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${getSeverityColor(alert.severity)}`}>
                        {getStatusIcon(alert.status)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {alert.title[language]}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 space-x-6">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {alert.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(alert.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {alert.description[language]}
                  </p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex flex-wrap gap-3 mb-4 sm:mb-0">
                      {alert.affectedAnimals.map((animal, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold border border-gray-300"
                        >
                          🐾 {animal}
                        </span>
                      ))}
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                      alert.status === 'active' ? 'bg-red-100 text-red-700 border-2 border-red-200' :
                      alert.status === 'monitoring' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200' :
                      'bg-green-100 text-green-700 border-2 border-green-200'
                    }`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <AlertMap filterSeverity={filterSeverity} />
        )}

        {/* Subscribe Modal */}
        {showSubscribeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {t('alerts.subscribe')}
                  </h3>
                  <button
                    onClick={() => setShowSubscribeModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                {!subscribeSuccess ? (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('full_name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={subscribeForm.name}
                        onChange={(e) => setSubscribeForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={t('enter_full_name')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('email_address')}
                      </label>
                      <input
                        type="email"
                        required
                        value={subscribeForm.email}
                        onChange={(e) => setSubscribeForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={t('enter_email')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('phone_number')}
                      </label>
                      <input
                        type="tel"
                        value={subscribeForm.phone}
                        onChange={(e) => setSubscribeForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={t('enter_phone_number')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('location')}
                      </label>
                      <input
                        type="text"
                        required
                        value={subscribeForm.location}
                        onChange={(e) => setSubscribeForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={t('enter_location')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('alert_types')}
                      </label>
                      <div className="space-y-2">
                        {['Avian Flu', 'Swine Fever', 'Foot & Mouth Disease', 'General Alerts'].map((type) => (
                          <label key={type} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={subscribeForm.alertTypes.includes(type)}
                              onChange={() => handleAlertTypeToggle(type)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('notification_method')}
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'email', label: t('email'), icon: Mail },
                          { value: 'sms', label: t('sms'), icon: Phone },
                          { value: 'both', label: t('both'), icon: Globe }
                        ].map(({ value, label, icon: Icon }) => (
                          <label key={value} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="notificationMethod"
                              value={value}
                              checked={subscribeForm.notificationMethod === value}
                              onChange={(e) => setSubscribeForm(prev => ({ ...prev, notificationMethod: e.target.value as any }))}
                              className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                            />
                            <Icon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {isSubscribing ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {t('subscribing')}
                        </span>
                      ) : (
                        t('subscribe_to_alerts')
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {t('successfully_subscribed')}
                    </h4>
                    <p className="text-gray-600">
                      {t('successfully_subscribed_description')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Learn More Modal */}
        {showLearnMoreModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-800">
                    {t('about_our_alert_system')}
                  </h3>
                  <button
                    onClick={() => setShowLearnMoreModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Features */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-500 p-3 rounded-full mr-4">
                          <Bell className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {t('real_time_notifications')}
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {t('real_time_notifications_description')}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-500 p-3 rounded-full mr-4">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {t('preventive_measures')}
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {t('preventive_measures_description')}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-500 p-3 rounded-full mr-4">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {t('community_protection')}
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {t('community_protection_description')}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Benefits & How it Works */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">
                        {t('how_it_works')}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {t('detection')}
                            </p>
                            <p className="text-sm text-gray-600">
                              {t('detection_description')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {t('verification')}
                            </p>
                            <p className="text-sm text-gray-600">
                              {t('verification_description')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {t('notification')}
                            </p>
                            <p className="text-sm text-gray-600">
                              {t('notification_description')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">
                        {t('key_benefits')}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-teal-600" />
                          <span className="text-gray-700">
                            {t('early_disease_detection')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-teal-600" />
                          <span className="text-gray-700">
                            {t('reduced_livestock_losses')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-teal-600" />
                          <span className="text-gray-700">
                            {t('cost_effective_prevention')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-teal-600" />
                          <span className="text-gray-700">
                            {t('expert_guidance_included')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-teal-600" />
                          <span className="text-gray-700">
                            {t('free_subscription')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200">
                      <div className="flex items-center mb-4">
                        <div className="bg-yellow-500 p-3 rounded-full mr-4">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {t('success_stories')}
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {t('success_stories_description')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      setShowLearnMoreModal(false);
                      setShowSubscribeModal(true);
                    }}
                    className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                  >
                    {t('subscribe_now')}
                  </button>
                  <p className="text-gray-500 mt-3">
                    {t('join_thousands_protected_farmers')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;