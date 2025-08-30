import React, { useState } from 'react';
import { Download, FileText, Phone, MessageSquare, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Resource {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  type: 'pdf' | 'guide' | 'faq';
  category: string;
  downloadUrl: string;
  size: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: { 
      en: 'Poultry Biosecurity Complete Guide', 
      hi: 'Poultry Biosecurity Complete Guide' 
    },
    description: { 
      en: 'Comprehensive guide covering all aspects of poultry farm biosecurity',
      hi: 'Poultry farm biosecurity ke saare aspects cover karne wali comprehensive guide'
    },
    type: 'pdf',
    category: 'Poultry',
    downloadUrl: '/guides/poultry-biosecurity.pdf',
    size: '2.4 MB'
  },
  {
    id: '2',
    title: { 
      en: 'Pig Farm Disease Prevention Manual', 
      hi: 'Pig Farm Disease Prevention Manual' 
    },
    description: { 
      en: 'Step-by-step manual for preventing diseases in pig farming',
      hi: 'Pig farming mein diseases prevent karne ke liye step-by-step manual'
    },
    type: 'pdf',
    category: 'Swine',
    downloadUrl: '/guides/pig-disease-prevention.pdf',
    size: '1.8 MB'
  },
  {
    id: '3',
    title: { 
      en: 'Emergency Response Checklist', 
      hi: 'Emergency Response Checklist' 
    },
    description: { 
      en: 'Quick reference for handling disease outbreaks on your farm',
      hi: 'Farm par disease outbreaks handle karne ke liye quick reference'
    },
    type: 'guide',
    category: 'Emergency',
    downloadUrl: '/checklists/emergency-response.pdf',
    size: '0.5 MB'
  }
];

const faqs = [
  {
    question: { 
      en: 'How often should I clean my poultry house?', 
      hi: 'Poultry house kitni baar saaf karna chahiye?' 
    },
    answer: { 
      en: 'Daily cleaning of feeding areas and water sources, with deep cleaning weekly.',
      hi: 'Feeding areas aur water sources daily saaf karein, aur weekly deep cleaning karein.'
    }
  },
  {
    question: { 
      en: 'What should I do if I suspect disease in my animals?', 
      hi: 'Agar mujhe lagta hai ki mere jaanwaron mein bimari hai to kya karna chahiye?' 
    },
    answer: { 
      en: 'Immediately isolate affected animals, contact your veterinarian, and report to local authorities.',
      hi: 'Turant affected jaanwaron ko isolate karein, veterinarian se contact karein, aur local authorities ko report karein.'
    }
  },
  {
    question: { 
      en: 'How can I prevent visitors from spreading diseases?', 
      hi: 'Visitors ko diseases spread karne se kaise rok sakte hain?' 
    },
    answer: { 
      en: 'Implement foot baths, provide protective clothing, maintain visitor logs, and restrict access to animal areas.',
      hi: 'Foot baths lagayein, protective clothing provide karein, visitor logs maintain karein, aur animal areas mein access restrict karein.'
    }
  }
];

const Resources = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'guides' | 'faqs' | 'contact'>('guides');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Poultry', 'Swine', 'Emergency', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title[language].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredFAQs = faqs.filter(faq => 
    faq.question[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer[language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Resources & Support' : 'Resources aur Support'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Access guides, FAQs, and support to keep your farm healthy and compliant'
              : 'Apne farm ko healthy aur compliant rakhne ke liye guides, FAQs, aur support access karein'
            }
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm p-2 mb-8 max-w-md mx-auto">
          <div className="flex">
            {[
              { id: 'guides', label: language === 'en' ? 'Guides' : 'Guides' },
              { id: 'faqs', label: 'FAQs' },
              { id: 'contact', label: language === 'en' ? 'Contact' : 'Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        {(activeTab === 'guides' || activeTab === 'faqs') && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search resources...' : 'Resources search karein...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              {activeTab === 'guides' && (
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-teal-100 rounded-lg p-3">
                      <FileText className="h-6 w-6 text-teal-600" />
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {resource.size}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                    {resource.title[language]}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {resource.description[language]}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {resource.category}
                    </span>
                    <button className="flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-6">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {faq.question[language]}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer[language]}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="bg-teal-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <Phone className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Emergency Helpline' : 'Emergency Helpline'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'en' 
                    ? '24/7 support for disease emergencies'
                    : 'Disease emergencies ke liye 24/7 support'
                  }
                </p>
                <div className="text-2xl font-bold text-teal-600 mb-4">
                  1800-123-FARM
                </div>
                <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                  {language === 'en' ? 'Call Now' : 'Abhi Call Karein'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Report Disease' : 'Disease Report Karein'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'Report suspected disease outbreaks in your area'
                    : 'Apne area mein suspected disease outbreaks report karein'
                  }
                </p>
              </div>
              
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Your Name' : 'Aapka Naam'}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Farm Location' : 'Farm Location'}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <textarea
                  placeholder={language === 'en' ? 'Describe the suspected issue...' : 'Suspected issue describe karein...'}
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
                <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                  {language === 'en' ? 'Submit Report' : 'Report Submit Karein'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;