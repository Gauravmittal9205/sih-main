import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { language } = useLanguage();

  const contactMethods = [
    {
      icon: Phone,
      title: { en: 'Emergency Helpline', hi: 'Emergency Helpline' },
      info: '1800-123-FARM',
      description: { 
        en: '24/7 support for disease emergencies',
        hi: 'Disease emergencies ke liye 24/7 support'
      },
      action: { en: 'Call Now', hi: 'Abhi Call Karein' }
    },
    {
      icon: MessageSquare,
      title: { en: 'WhatsApp Support', hi: 'WhatsApp Support' },
      info: '+91-98765-43210',
      description: { 
        en: 'Quick questions and general guidance',
        hi: 'Quick questions aur general guidance'
      },
      action: { en: 'Chat Now', hi: 'Abhi Chat Karein' }
    },
    {
      icon: Mail,
      title: { en: 'Email Support', hi: 'Email Support' },
      info: 'support@farmhealthguardian.in',
      description: { 
        en: 'Detailed queries and documentation',
        hi: 'Detailed queries aur documentation'
      },
      action: { en: 'Send Email', hi: 'Email Bhejein' }
    }
  ];

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
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-full p-4 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
                <method.icon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {method.title[language]}
              </h3>
              <div className="text-lg font-medium text-teal-600 mb-2">
                {method.info}
              </div>
              <p className="text-gray-600 text-sm mb-6">
                {method.description[language]}
              </p>
              <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
                {method.action[language]}
              </button>
            </div>
          ))}
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
    </div>
  );
};

export default Contact;