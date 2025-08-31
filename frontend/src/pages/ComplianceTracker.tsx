import React, { useState, useEffect, useRef } from 'react';
import { Plus, Camera, Download, Check, Clock, FileText, Trash2, Edit3, Save, X, AlertCircle, TrendingUp, Calendar, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChecklistItem {
  id: string;
  title: { en: string; hi: string };
  completed: boolean;
  photo?: string;
  timestamp?: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface Checklist {
  id: string;
  name: string;
  category: string;
  items: ChecklistItem[];
  lastUpdated: string;
  color: string;
  targetDate?: string;
}

const ComplianceTracker = () => {
  const { language } = useLanguage();
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      name: 'Daily Hygiene Checklist',
      category: 'Daily',
      lastUpdated: '2025-01-14',
      color: 'teal',
      targetDate: '2025-01-31',
      items: [
        {
          id: '1.1',
          title: { 
            en: 'Clean and disinfect feeding areas', 
            hi: 'Feeding areas saaf aur disinfect karein' 
          },
          completed: true,
          timestamp: '2025-01-14T08:00:00Z',
          priority: 'high'
        },
        {
          id: '1.2',
          title: { 
            en: 'Check water quality and cleanliness', 
            hi: 'Paani ki quality aur safai check karein' 
          },
          completed: true,
          timestamp: '2025-01-14T08:15:00Z',
          priority: 'medium'
        },
        {
          id: '1.3',
          title: { 
            en: 'Remove dead or sick animals immediately', 
            hi: 'Mare ya bimar jaanwaron ko turant hata dein' 
          },
          completed: false,
          priority: 'high',
          dueDate: '2025-01-15'
        },
        {
          id: '1.4',
          title: { 
            en: 'Clean boots before entering farm areas', 
            hi: 'Farm areas mein jaane se pehle boots saaf karein' 
          },
          completed: true,
          timestamp: '2025-01-14T07:30:00Z',
          priority: 'low'
        }
      ]
    },
    {
      id: '2',
      name: 'Weekly Biosecurity Audit',
      category: 'Weekly',
      lastUpdated: '2025-01-12',
      color: 'blue',
      targetDate: '2025-01-19',
      items: [
        {
          id: '2.1',
          title: { 
            en: 'Inspect perimeter fencing and barriers', 
            hi: 'Perimeter fencing aur barriers inspect karein' 
          },
          completed: true,
          timestamp: '2025-01-12T10:00:00Z',
          priority: 'medium'
        },
        {
          id: '2.2',
          title: { 
            en: 'Review visitor log and entry protocols', 
            hi: 'Visitor log aur entry protocols review karein' 
          },
          completed: true,
          timestamp: '2025-01-12T10:30:00Z',
          priority: 'high'
        },
        {
          id: '2.3',
          title: { 
            en: 'Check feed storage and quality', 
            hi: 'Feed storage aur quality check karein' 
          },
          completed: false,
          priority: 'medium',
          dueDate: '2025-01-16'
        }
      ]
    }
  ]);

  const [selectedChecklist, setSelectedChecklist] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newChecklist, setNewChecklist] = useState({ name: '', category: 'Daily', color: 'teal' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showCompleted, setShowCompleted] = useState(true);
  const [dragItem, setDragItem] = useState<{ checklistId: string; itemId: string } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

  // Animation states
  const [animateItems, setAnimateItems] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('complianceData', JSON.stringify(checklists));
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [checklists]);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('complianceData');
    if (saved) {
      setChecklists(JSON.parse(saved));
    }
  }, []);

  const createConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const toggleItem = (checklistId: string, itemId: string) => {
    setChecklists(prev => prev.map(checklist => {
      if (checklist.id === checklistId) {
        const wasCompleted = checklist.items.find(item => item.id === itemId)?.completed;
        const newCompleted = !wasCompleted;
        
        // Add animation for newly completed items
        if (newCompleted && !wasCompleted) {
          setAnimateItems(prev => [...prev, itemId]);
          setTimeout(() => setAnimateItems(prev => prev.filter(id => id !== itemId)), 1000);
          
          // Show confetti for 100% completion
          const updatedItems = checklist.items.map(item => 
            item.id === itemId ? { ...item, completed: newCompleted, timestamp: new Date().toISOString() } : item
          );
          const allCompleted = updatedItems.every(item => item.completed);
          if (allCompleted) {
            createConfetti();
          }
        }

        return {
          ...checklist,
          items: checklist.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                completed: newCompleted,
                timestamp: newCompleted ? new Date().toISOString() : undefined
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

  const addNewChecklist = () => {
    if (newChecklist.name.trim()) {
      const checklist: Checklist = {
        id: Date.now().toString(),
        name: newChecklist.name,
        category: newChecklist.category,
        color: newChecklist.color,
        lastUpdated: new Date().toISOString().split('T')[0],
        items: []
      };
      setChecklists(prev => [...prev, checklist]);
      setNewChecklist({ name: '', category: 'Daily', color: 'teal' });
      setIsCreating(false);
    }
  };

  const deleteChecklist = (id: string) => {
    if (window.confirm('Are you sure you want to delete this checklist?')) {
      setChecklists(prev => prev.filter(c => c.id !== id));
    }
  };

  const addItemToChecklist = (checklistId: string, title: string) => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      title: { en: title, hi: title },
      completed: false,
      priority: 'medium'
    };
    
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId 
        ? { ...checklist, items: [...checklist.items, newItem] }
        : checklist
    ));
  };

  const handleDragStart = (e: React.DragEvent, checklistId: string, itemId: string) => {
    setDragItem({ checklistId, itemId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    setDragOverItem(itemId);
  };

  const handleDrop = (e: React.DragEvent, targetItemId: string) => {
    e.preventDefault();
    if (!dragItem) return;

    setChecklists(prev => prev.map(checklist => {
      if (checklist.id === dragItem.checklistId) {
        const items = [...checklist.items];
        const dragIndex = items.findIndex(item => item.id === dragItem.itemId);
        const targetIndex = items.findIndex(item => item.id === targetItemId);
        
        if (dragIndex !== -1 && targetIndex !== -1) {
          const [draggedItem] = items.splice(dragIndex, 1);
          items.splice(targetIndex, 0, draggedItem);
          return { ...checklist, items };
        }
      }
      return checklist;
    }));

    setDragItem(null);
    setDragOverItem(null);
  };

  const getCompletionRate = (checklist: Checklist) => {
    const completed = checklist.items.filter(item => item.completed).length;
    return Math.round((completed / checklist.items.length) * 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const filteredChecklists = checklists
    .filter(checklist => 
      (filterCategory === 'all' || checklist.category === filterCategory) &&
      (searchTerm === '' || checklist.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'completion': return getCompletionRate(b) - getCompletionRate(a);
        case 'date': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default: return 0;
      }
    });

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
Priority: ${item.priority.toUpperCase()}
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
            <button 
              onClick={() => setIsCreating(!isCreating)}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-3 rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>

          {/* Create Checklist Form */}
          {isCreating && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Checklist name...' : 'Checklist ka naam...'}
                  value={newChecklist.name}
                  onChange={(e) => setNewChecklist({ ...newChecklist, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <select
                  value={newChecklist.category}
                  onChange={(e) => setNewChecklist({ ...newChecklist, category: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
                <select
                  value={newChecklist.color}
                  onChange={(e) => setNewChecklist({ ...newChecklist, color: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="teal">Teal</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="green">Green</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={addNewChecklist}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Create</span>
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder={language === 'en' ? 'Search checklists...' : 'Checklists search karein...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="all">All Categories</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="name">Name</option>
                <option value="completion">Completion Rate</option>
                <option value="date">Last Updated</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">Show Completed</span>
              </label>
            </div>
          </div>
        </div>

        {/* Checklists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredChecklists.map((checklist) => {
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
                    {/* Add New Item */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <Plus className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder={language === 'en' ? 'Add new item...' : 'Naya item add karein...'}
                        className="flex-1 bg-transparent border-none outline-none text-gray-600 placeholder-gray-400"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            addItemToChecklist(checklist.id, e.currentTarget.value.trim());
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>

                    {/* Checklist Items List */}
                    {checklist.items
                      .filter(item => showCompleted || !item.completed)
                      .map((item, index) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, checklist.id, item.id)}
                          onDragOver={(e) => handleDragOver(e, item.id)}
                          onDrop={(e) => handleDrop(e, item.id)}
                          className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-move ${
                            item.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          } ${
                            dragOverItem === item.id ? 'border-teal-400 bg-teal-50' : ''
                          } ${
                            animateItems.includes(item.id) ? 'animate-pulse scale-105' : ''
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
                            <div className="flex items-center space-x-2 mb-2">
                              <p className={`font-medium ${item.completed ? 'text-green-800' : 'text-gray-800'}`}>
                                {item.title[language]}
                              </p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                {getPriorityIcon(item.priority)} {item.priority}
                              </span>
                            </div>
                            
                            {item.timestamp && (
                              <p className="text-xs text-gray-500 mb-1">
                                Completed: {new Date(item.timestamp).toLocaleString()}
                              </p>
                            )}
                            
                            {item.dueDate && !item.completed && (
                              <p className="text-xs text-red-500 mb-1">
                                Due: {new Date(item.dueDate).toLocaleDateString()}
                              </p>
                            )}
                            
                            {item.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">
                                Notes: {item.notes}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-teal-600 transition-colors">
                              <Camera className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => setEditingItem(editingItem === item.id ? null : item.id)}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit3 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {checklists.length} Active Checklists
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Track multiple compliance areas
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((checklists.length / 10) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-4">
              <Check className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {checklists.reduce((acc, checklist) => 
                acc + checklist.items.filter(item => item.completed).length, 0
              )} Items Completed
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              This month's achievements
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((checklists.reduce((acc, checklist) => 
                  acc + checklist.items.filter(item => item.completed).length, 0) / 50) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-teal-100 rounded-full p-3 w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {Math.round(
                checklists.reduce((acc, checklist) => acc + getCompletionRate(checklist), 0) / checklists.length
              )}% Average Completion
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Overall compliance rate
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.round(
                  checklists.reduce((acc, checklist) => acc + getCompletionRate(checklist), 0) / checklists.length
                )}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-4">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {checklists.filter(checklist => 
                checklist.items.some(item => item.dueDate && !item.completed && 
                  new Date(item.dueDate) < new Date())
              ).length} Overdue Items
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Need attention
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((checklists.filter(checklist => 
                  checklist.items.some(item => item.dueDate && !item.completed && 
                    new Date(item.dueDate) < new Date())
                ).length / 5) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <div className={`w-2 h-2 rounded-full ${
                  ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'][Math.floor(Math.random() * 6)]
                }`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceTracker;