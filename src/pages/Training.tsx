import React, { useState } from 'react';
import { Play, Clock, Users, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TrainingModule {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  duration: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl: string;
  completionRate: number;
  participants: number;
}

const trainingModules: TrainingModule[] = [
  {
    id: '1',
    title: { 
      en: 'Basic Farm Hygiene', 
      hi: 'Basic Farm Safai' 
    },
    description: { 
      en: 'Essential hygiene practices for daily farm operations', 
      hi: 'Daily farm operations ke liye zaroori safai practices' 
    },
    duration: 5,
    category: 'Hygiene',
    difficulty: 'beginner',
    videoUrl: 'https://example.com/video1',
    completionRate: 95,
    participants: 1250
  },
  {
    id: '2',
    title: { 
      en: 'Animal Quarantine Protocols', 
      hi: 'Jaanwaron ki Quarantine Protocols' 
    },
    description: { 
      en: 'How to safely isolate new or sick animals', 
      hi: 'Naye ya bimar jaanwaron ko safely isolate kaise karein' 
    },
    duration: 8,
    category: 'Quarantine',
    difficulty: 'intermediate',
    videoUrl: 'https://example.com/video2',
    completionRate: 87,
    participants: 980
  },
  {
    id: '3',
    title: { 
      en: 'Vaccination Schedule Management', 
      hi: 'Vaccination Schedule Management' 
    },
    description: { 
      en: 'Planning and tracking animal vaccinations', 
      hi: 'Jaanwaron ke vaccinations plan aur track karna' 
    },
    duration: 6,
    category: 'Vaccination',
    difficulty: 'intermediate',
    videoUrl: 'https://example.com/video3',
    completionRate: 92,
    participants: 1100
  },
  {
    id: '4',
    title: { 
      en: 'Waste Management Best Practices', 
      hi: 'Waste Management Best Practices' 
    },
    description: { 
      en: 'Safe disposal of animal waste and farm materials', 
      hi: 'Jaanwaron ke waste aur farm materials ka safe disposal' 
    },
    duration: 7,
    category: 'Waste',
    difficulty: 'beginner',
    videoUrl: 'https://example.com/video4',
    completionRate: 89,
    participants: 850
  },
  {
    id: '5',
    title: { 
      en: 'Disease Recognition Signs', 
      hi: 'Bimari ke Signs Pehchanana' 
    },
    description: { 
      en: 'Early identification of common livestock diseases', 
      hi: 'Common livestock diseases ko jaldi pehchanana' 
    },
    duration: 10,
    category: 'Health',
    difficulty: 'advanced',
    videoUrl: 'https://example.com/video5',
    completionRate: 78,
    participants: 650
  }
];

const Training = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Hygiene', 'Quarantine', 'Vaccination', 'Waste', 'Health'];

  const filteredModules = trainingModules.filter(module => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    const matchesSearch = module.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description[language].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Expert Training Modules' : 'Expert Training Modules'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Learn from veterinary experts with practical, easy-to-follow training modules'
              : 'Veterinary experts se practical, aasan training modules ke saath sikhein'
            }
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search training modules...' : 'Training modules search karein...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Training Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Video Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <button className="relative bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white hover:scale-110 transition-all">
                  <Play className="h-8 w-8 text-teal-600 ml-1" fill="currentColor" />
                </button>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {module.duration} min
                </div>
                <div className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                  {module.title[language]}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {module.description[language]}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration} min
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {module.participants}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Completion Rate</span>
                    <span>{module.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${module.completionRate}%` }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
                  {language === 'en' ? 'Start Training' : 'Training Shuru Karein'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {language === 'en' ? 'No modules found' : 'Koi modules nahi mile'}
            </h3>
            <p className="text-gray-500">
              {language === 'en' 
                ? 'Try adjusting your search or filter criteria'
                : 'Apne search ya filter criteria ko adjust karke dekhein'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Training;