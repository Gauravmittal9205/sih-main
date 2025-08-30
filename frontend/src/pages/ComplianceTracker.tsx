import React, { useState } from 'react';
import { Plus, Camera, Download, Check, Clock, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChecklistItem {
  id: string;
  title: { en: string; hi: string };
  completed: boolean;
  photo?: string;
  timestamp?: string;
  notes?: string;
}

interface Checklist {
  id: string;
  name: string;
  category: string;
  items: ChecklistItem[];
  lastUpdated: string;
}

const ComplianceTracker = () => {
  const { language } = useLanguage();
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      name: 'Daily Hygiene Checklist',
      category: 'Daily',
      lastUpdated: '2025-01-14',
      items: [
        {
          id: '1.1',
          title: { 
            en: 'Clean and disinfect feeding areas', 
            hi: 'Feeding areas saaf aur disinfect karein' 
          },
          completed: true,
          timestamp: '2025-01-14T08:00:00Z'
        },
        {
          id: '1.2',
          title: { 
            en: 'Check water quality and cleanliness', 
            hi: 'Paani ki quality aur safai check karein' 
          },
          completed: true,
          timestamp: '2025-01-14T08:15:00Z'
        },
        {
          id: '1.3',
          title: { 
            en: 'Remove dead or sick animals immediately', 
            hi: 'Mare ya bimar jaanwaron ko turant hata dein' 
          },
          completed: false
        },
        {
          id: '1.4',
          title: { 
            en: 'Clean boots before entering farm areas', 
            hi: 'Farm areas mein jaane se pehle boots saaf karein' 
          },
          completed: true,
          timestamp: '2025-01-14T07:30:00Z'
        }
      ]
    },
    {
      id: '2',
      name: 'Weekly Biosecurity Audit',
      category: 'Weekly',
      lastUpdated: '2025-01-12',
      items: [
        {
          id: '2.1',
          title: { 
            en: 'Inspect perimeter fencing and barriers', 
            hi: 'Perimeter fencing aur barriers inspect karein' 
          },
          completed: true,
          timestamp: '2025-01-12T10:00:00Z'
        },
        {
          id: '2.2',
          title: { 
            en: 'Review visitor log and entry protocols', 
            hi: 'Visitor log aur entry protocols review karein' 
          },
          completed: true,
          timestamp: '2025-01-12T10:30:00Z'
        },
        {
          id: '2.3',
          title: { 
            en: 'Check feed storage and quality', 
            hi: 'Feed storage aur quality check karein' 
          },
          completed: false
        }
      ]
    }
  ]);

  const [selectedChecklist, setSelectedChecklist] = useState<string | null>(null);

  const toggleItem = (checklistId: string, itemId: string) => {
    setChecklists(prev => prev.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          items: checklist.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                completed: !item.completed,
                timestamp: !item.completed ? new Date().toISOString() : undefined
              };
            }
            return item;
          }),
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return checklist;
    }));
  };

  const getCompletionRate = (checklist: Checklist) => {
    const completed = checklist.items.filter(item => item.completed).length;
    return Math.round((completed / checklist.items.length) * 100);
  };

  const exportCompliance = (checklist: Checklist) => {
    const content = `
COMPLIANCE REPORT
${checklist.name}
Date: ${new Date().toLocaleDateString()}

Items Completed: ${checklist.items.filter(i => i.completed).length}/${checklist.items.length}
Completion Rate: ${getCompletionRate(checklist)}%

CHECKLIST ITEMS:
${checklist.items.map(item => `
${item.completed ? '✓' : '✗'} ${item.title.en}
${item.timestamp ? `Completed: ${new Date(item.timestamp).toLocaleString()}` : 'Not completed'}
${item.notes ? `Notes: ${item.notes}` : ''}
`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${checklist.name.replace(/\s+/g, '_')}_compliance_report.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Compliance Tracker' : 'Compliance Tracker'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Track your biosecurity compliance with customizable checklists and generate reports'
              : 'Customizable checklists ke saath apni biosecurity compliance track karein aur reports generate karein'
            }
          </p>
        </div>

        {/* Create New Checklist */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'Create New Checklist' : 'Nayi Checklist Banayein'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Start a new compliance tracking checklist for your farm'
                  : 'Apne farm ke liye nayi compliance tracking checklist shuru karein'
                }
              </p>
            </div>
            <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-3 rounded-full hover:shadow-lg hover:scale-105 transition-all">
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Checklists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {checklists.map((checklist) => {
            const completionRate = getCompletionRate(checklist);
            const isExpanded = selectedChecklist === checklist.id;

            return (
              <div
                key={checklist.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Checklist Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {checklist.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {checklist.category}
                        </span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Updated {new Date(checklist.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => exportCompliance(checklist)}
                      className="text-gray-400 hover:text-teal-600 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          completionRate === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-teal-500 to-blue-500'
                        }`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedChecklist(isExpanded ? null : checklist.id)}
                    className="w-full text-left text-teal-600 font-medium hover:text-teal-700 transition-colors"
                  >
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {/* Checklist Items */}
                {isExpanded && (
                  <div className="p-6 space-y-4">
                    {checklist.items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all ${
                          item.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(checklist.id, item.id)}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            item.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-300 hover:border-teal-500'
                          }`}
                        >
                          {item.completed && <Check className="h-4 w-4" />}
                        </button>
                        
                        <div className="flex-1">
                          <p className={`font-medium ${item.completed ? 'text-green-800' : 'text-gray-800'}`}>
                            {item.title[language]}
                          </p>
                          {item.timestamp && (
                            <p className="text-xs text-gray-500 mt-1">
                              Completed: {new Date(item.timestamp).toLocaleString()}
                            </p>
                          )}
                        </div>

                        <button className="text-gray-400 hover:text-teal-600 transition-colors">
                          <Camera className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {checklists.length} Active Checklists
            </h3>
            <p className="text-sm text-gray-600">
              Track multiple compliance areas
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-4">
              <Check className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {checklists.reduce((acc, checklist) => 
                acc + checklist.items.filter(item => item.completed).length, 0
              )} Items Completed
            </h3>
            <p className="text-sm text-gray-600">
              This month's achievements
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-teal-100 rounded-full p-3 w-fit mx-auto mb-4">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {Math.round(
                checklists.reduce((acc, checklist) => acc + getCompletionRate(checklist), 0) / checklists.length
              )}% Average Completion
            </h3>
            <p className="text-sm text-gray-600">
              Overall compliance rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTracker;