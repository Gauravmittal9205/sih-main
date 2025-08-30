import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, AlertTriangle, Plus, Download, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AdminDashboard = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'alerts' | 'content'>('overview');

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '12,543',
      change: '+12.5%',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: BarChart3,
      label: 'Risk Assessments',
      value: '8,942',
      change: '+8.2%',
      color: 'text-teal-600 bg-teal-100'
    },
    {
      icon: TrendingUp,
      label: 'Training Completions',
      value: '15,678',
      change: '+15.3%',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: '23',
      change: '-5.1%',
      color: 'text-red-600 bg-red-100'
    }
  ];

  const recentActivity = [
    {
      user: 'Rajesh Kumar',
      action: 'Completed risk assessment',
      location: 'Punjab',
      time: '2 minutes ago',
      risk: 'medium'
    },
    {
      user: 'Priya Patel',
      action: 'Started training module',
      location: 'Gujarat',
      time: '5 minutes ago',
      risk: 'low'
    },
    {
      user: 'Admin System',
      action: 'New disease alert published',
      location: 'Haryana',
      time: '10 minutes ago',
      risk: 'high'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'content', label: 'Content', icon: Plus }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage your Farm Health Guardian platform and monitor farm health nationwide
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm p-2 mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Risk Assessment Trends */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Risk Assessment Trends</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would be here</p>
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">User Distribution by State</h3>
                <div className="space-y-4">
                  {[
                    { state: 'Punjab', users: 3245, percentage: 26 },
                    { state: 'Gujarat', users: 2890, percentage: 23 },
                    { state: 'Haryana', users: 2156, percentage: 17 },
                    { state: 'Maharashtra', users: 1876, percentage: 15 },
                    { state: 'Others', users: 2376, percentage: 19 }
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-700">{data.state}</span>
                        <span className="text-sm text-gray-500">{data.users} users</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${data.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-8">
                          {data.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      activity.risk === 'high' ? 'bg-red-500' :
                      activity.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.location}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">User Management</h3>
              <div className="flex space-x-3">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Last Assessment</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Risk Level</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Rajesh Kumar', location: 'Punjab', lastAssessment: '2 days ago', risk: 'Medium', status: 'Active' },
                    { name: 'Priya Patel', location: 'Gujarat', lastAssessment: '1 week ago', risk: 'Low', status: 'Active' },
                    { name: 'Amit Singh', location: 'Haryana', lastAssessment: '3 days ago', risk: 'High', status: 'Active' }
                  ].map((user, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-800">{user.name}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{user.location}</td>
                      <td className="py-4 px-4 text-gray-600">{user.lastAssessment}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.risk === 'High' ? 'bg-red-100 text-red-700' :
                          user.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {user.risk}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Alert Management</h3>
              <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New Alert
              </button>
            </div>
            
            <div className="text-center py-12 text-gray-500">
              <AlertTriangle className="h-16 w-16 mx-auto mb-4" />
              <p>Alert management interface would be implemented here</p>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Content Management</h3>
              <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Training Module
              </button>
            </div>
            
            <div className="text-center py-12 text-gray-500">
              <Plus className="h-16 w-16 mx-auto mb-4" />
              <p>Training module management interface would be implemented here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;