import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Users, AlertTriangle, PhoneCall } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { language } = useLanguage();
  const [isCalling, setIsCalling] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: { en: 'Emergency Helpline', hi: 'Emergency Helpline' },
      info: '1800-123-FARM',
      phoneNumber: '1800123FARM',
      description: { 
        en: '24/7 support for disease emergencies',
        hi: 'Disease emergencies ke liye 24/7 support'
      },
      action: { en: 'Call Now', hi: 'Abhi Call Karein' },
      isEmergency: true
    },
    {
      icon: MessageSquare,
      title: { en: 'WhatsApp Support', hi: 'WhatsApp Support' },
      info: '+91-98765-43210',
      phoneNumber: '+919876543210',
      description: { 
        en: 'Quick questions and general guidance',
        hi: 'Quick questions aur general guidance'
      },
      action: { en: 'Chat Now', hi: 'Abhi Chat Karein' },
      isEmergency: false
    },
    {
      icon: Mail,
      title: { en: 'Email Support', hi: 'Email Support' },
      info: 'support@farmhealthguardian.in',
      email: 'support@farmhealthguardian.in',
      description: { 
        en: 'Detailed queries and documentation',
        hi: 'Detailed queries aur documentation'
      },
      action: { en: 'Send Email', hi: 'Email Bhejein' },
      isEmergency: false
    }
  ];

  const emergencyNumbers = [
    { name: 'National Emergency', number: '112', description: 'General emergency services' },
    { name: 'Police', number: '100', description: 'Law enforcement' },
    { name: 'Fire Brigade', number: '101', description: 'Fire and rescue services' },
    { name: 'Ambulance', number: '102', description: 'Medical emergency services' }
  ];

  const handleEmergencyCall = (phoneNumber: string) => {
    setIsCalling(true);
    
    // Create a temporary link element to trigger the phone call
    const link = document.createElement('a');
    link.href = `tel:${phoneNumber}`;
    link.click();
    
    // Reset calling state after a short delay
    setTimeout(() => {
      setIsCalling(false);
    }, 2000);
  };

  const handleWhatsAppChat = (phoneNumber: string) => {
    const message = language === 'en' 
      ? 'Hello! I need help with my farm health issue.'
      : 'Hello! Mujhe farm health issue mein help chahiye.';
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailSupport = (email: string) => {
    const subject = language === 'en' 
      ? 'Farm Health Support Request'
      : 'Farm Health Support Request';
    
    const body = language === 'en'
      ? 'Hello,\n\nI need assistance with the following farm health issue:\n\n[Please describe your issue here]\n\nThank you.'
      : 'Hello,\n\nMujhe following farm health issue mein assistance chahiye:\n\n[Please describe your issue here]\n\nThank you.';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const handleContactAction = (method: any) => {
    if (method.isEmergency) {
      handleEmergencyCall(method.phoneNumber);
    } else if (method.phoneNumber) {
      handleWhatsAppChat(method.phoneNumber);
    } else if (method.email) {
      handleEmailSupport(method.email);
    }
  };

  const supportHours = [
    { day: 'Monday - Friday', time: '8:00 AM - 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 6:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 4:00 PM' },
    { day: 'Emergency', time: '24/7 Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Contact & Support' : 'Contact aur Support'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Get help when you need it. Our team of veterinary experts is here to support your farm health journey.'
              : 'Jab zaroorat ho tab help paayein. Veterinary experts ki hamari team aapke farm health journey mein support ke liye hai.'
            }
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group hover:-translate-y-2 ${
                method.isEmergency ? 'ring-2 ring-red-200 hover:ring-red-300' : ''
              }`}
            >
              <div className={`rounded-full p-4 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform ${
                method.isEmergency 
                  ? 'bg-gradient-to-br from-red-100 to-orange-100' 
                  : 'bg-gradient-to-br from-teal-100 to-blue-100'
              }`}>
                <method.icon className={`h-8 w-8 ${
                  method.isEmergency ? 'text-red-600' : 'text-teal-600'
                }`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {method.title[language]}
              </h3>
              <div className={`text-lg font-medium mb-2 ${
                method.isEmergency ? 'text-red-600' : 'text-teal-600'
              }`}>
                {method.info}
              </div>
              <p className="text-gray-600 text-sm mb-6">
                {method.description[language]}
              </p>
              <button 
                className={`w-full py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all ${
                  method.isEmergency 
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700' 
                    : 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700'
                }`}
                onClick={() => handleContactAction(method)}
                disabled={isCalling}
              >
                {isCalling && method.isEmergency ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {language === 'en' ? 'Calling...' : 'Call kar rahe hain...'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {method.action[language]}
                    {method.isEmergency && <PhoneCall className="ml-2 h-4 w-4" />}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Emergency Numbers Section */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-12">
          <div className="text-center mb-6">
            <div className="bg-red-100 rounded-full p-3 w-fit mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-2">
              {language === 'en' ? 'Emergency Numbers' : 'Emergency Numbers'}
            </h3>
            <p className="text-red-700">
              {language === 'en' 
                ? 'Save these numbers for immediate assistance in critical situations'
                : 'Critical situations mein immediate assistance ke liye ye numbers save karein'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {emergencyNumbers.map((emergency, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center border border-red-200">
                <div className="text-2xl mb-2">🚨</div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">{emergency.name}</h4>
                <button
                  onClick={() => handleEmergencyCall(emergency.number)}
                  className="text-lg font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  {emergency.number}
                </button>
                <p className="text-xs text-gray-600 mt-1">{emergency.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Emergency Form */}
          <div className="bg-white rounded-lg p-6 border border-red-200">
            <h4 className="text-lg font-semibold text-red-800 mb-4 text-center">
              {language === 'en' ? 'Quick Emergency Report' : 'Quick Emergency Report'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Emergency Type' : 'Emergency Type'}
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">{language === 'en' ? 'Select emergency type' : 'Emergency type select karein'}</option>
                  <option value="disease-outbreak">{language === 'en' ? 'Disease Outbreak' : 'Disease Outbreak'}</option>
                  <option value="animal-injury">{language === 'en' ? 'Animal Injury' : 'Animal Injury'}</option>
                  <option value="biosecurity-breach">{language === 'en' ? 'Biosecurity Breach' : 'Biosecurity Breach'}</option>
                  <option value="feed-contamination">{language === 'en' ? 'Feed Contamination' : 'Feed Contamination'}</option>
                  <option value="other">{language === 'en' ? 'Other' : 'Other'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Urgency Level' : 'Urgency Level'}
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">{language === 'en' ? 'Select urgency' : 'Urgency select karein'}</option>
                  <option value="critical">{language === 'en' ? 'Critical - Immediate Response' : 'Critical - Immediate Response'}</option>
                  <option value="high">{language === 'en' ? 'High - Within 1 Hour' : 'High - Within 1 Hour'}</option>
                  <option value="medium">{language === 'en' ? 'Medium - Within 4 Hours' : 'Medium - Within 4 Hours'}</option>
                  <option value="low">{language === 'en' ? 'Low - Within 24 Hours' : 'Low - Within 24 Hours'}</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Brief Description' : 'Brief Description'}
              </label>
              <textarea 
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder={language === 'en' ? 'Describe the emergency situation...' : 'Emergency situation describe karein...'}
              ></textarea>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => handleEmergencyCall('1800123FARM')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>{language === 'en' ? 'Call Emergency Line' : 'Emergency Line Call Karein'}</span>
              </button>
              <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                {language === 'en' ? 'Submit Report' : 'Report Submit Karein'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Support Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'en' ? 'Support Hours' : 'Support Hours'}
              </h3>
            </div>
            
            <div className="space-y-4">
              {supportHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-gray-700">{schedule.day}</span>
                  <span className={`font-medium ${schedule.day === 'Emergency' ? 'text-red-600' : 'text-gray-600'}`}>
                    {schedule.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>
                  {language === 'en' ? 'Emergency:' : 'Emergency:'}
                </strong>{' '}
                {language === 'en' 
                  ? 'For immediate disease emergencies, call our 24/7 helpline'
                  : 'Turant disease emergencies ke liye, hamari 24/7 helpline call karein'
                }
              </p>
            </div>
          </div>

          {/* Regional Offices */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-teal-100 rounded-full p-3 mr-4">
                <MapPin className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'en' ? 'Regional Offices' : 'Regional Offices'}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-semibold text-gray-800">Northern Region</h4>
                <p className="text-sm text-gray-600">Punjab, Haryana, Himachal Pradesh</p>
                <p className="text-sm text-teal-600">+91-98765-43210</p>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-semibold text-gray-800">Western Region</h4>
                <p className="text-sm text-gray-600">Gujarat, Rajasthan, Maharashtra</p>
                <p className="text-sm text-teal-600">+91-98765-43211</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800">Southern Region</h4>
                <p className="text-sm text-gray-600">Karnataka, Tamil Nadu, Andhra Pradesh</p>
                <p className="text-sm text-teal-600">+91-98765-43212</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Team */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-full p-4 w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {language === 'en' ? 'Meet Our Expert Team' : 'Hamare Expert Team se Miliye'}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Our team includes veterinarians, livestock specialists, and biosecurity experts dedicated to keeping your farm healthy.'
                : 'Hamare team mein veterinarians, livestock specialists, aur biosecurity experts hain jo aapke farm ko healthy rakhne ke liye dedicated hain.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">👩‍⚕️</div>
              <h4 className="font-semibold text-gray-800">Dr. Priya Sharma</h4>
              <p className="text-sm text-gray-600">Chief Veterinarian</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👨‍🔬</div>
              <h4 className="font-semibold text-gray-800">Dr. Rajesh Kumar</h4>
              <p className="text-sm text-gray-600">Livestock Specialist</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👩‍🏫</div>
              <h4 className="font-semibold text-gray-800">Dr. Sunita Patel</h4>
              <p className="text-sm text-gray-600">Biosecurity Expert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Call Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => handleEmergencyCall('1800123FARM')}
          disabled={isCalling}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isCalling 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
          }`}
          title={language === 'en' ? 'Emergency Call' : 'Emergency Call'}
        >
          {isCalling ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <Phone className="h-6 w-6 text-white" />
          )}
        </button>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-red-600 text-white text-xs rounded-lg whitespace-nowrap">
          {language === 'en' ? 'Emergency Call' : 'Emergency Call'}
        </div>
      </div>
    </div>
  );
};

export default Contact;