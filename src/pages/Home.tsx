import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, BookOpen, AlertTriangle, Users, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('feature.risk.title'),
      description: t('feature.risk.desc'),
      link: '/risk-checker',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: BookOpen,
      title: t('feature.training.title'),
      description: t('feature.training.desc'),
      link: '/training',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: AlertTriangle,
      title: t('feature.alerts.title'),
      description: t('feature.alerts.desc'),
      link: '/alerts',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Poultry Farmer, Punjab',
      content: 'Ye app bahut helpful hai. Risk checker ne meri farming ko safe banaya.',
      avatar: '👨‍🌾'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Veterinarian, Haryana',
      content: 'Excellent resource for farmers. Training modules are very practical.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Amit Patel',
      role: 'Pig Farmer, Gujarat',
      content: 'Disease alerts saved my farm from major losses. Highly recommended!',
      avatar: '👨‍🔬'
    }
  ];

  const partners = [
    'Ministry of Agriculture',
    'Veterinary Council',
    'ICAR',
    'State Animal Husbandry'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <p className="text-base text-gray-500 mb-8">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/risk-checker"
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group"
                >
                  {t('cta.check-risk')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/training"
                  className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-50 transition-all duration-200 text-center"
                >
                  Start Training
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Farm Protection</h3>
                    <p className="text-gray-600">Advanced biosecurity made simple for every farmer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Complete Farm Health Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to maintain biosecurity and protect your livestock
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-8"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center mt-4 text-teal-600 font-medium group-hover:translate-x-2 transition-transform">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-teal-100">Farmers Protected</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-teal-100">Risk Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-teal-100">Alert System</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-teal-100">Training Modules</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Trusted by Farmers Nationwide
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from farmers who transformed their biosecurity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-600 mb-6">Trusted Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;