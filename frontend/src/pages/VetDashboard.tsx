import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  User, 
  Shield, 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Users,
  MapPin,
  Phone,
  Mail,
  LogOut,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Star,
  MessageCircle,
  X
} from 'lucide-react';

const VetDashboard = () => {
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddCaseModal, setShowAddCaseModal] = useState(false);
  const [newCase, setNewCase] = useState({
    farmerName: '',
    farmLocation: '',
    issue: '',
    priority: 'medium',
    status: 'pending',
    assignedDate: new Date().toISOString().split('T')[0],
    contact: '',
    description: ''
  });
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    farmerName: '',
    farmLocation: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    purpose: '',
    contact: '',
    notes: ''
  });
  const [showFarmerProfileModal, setShowFarmerProfileModal] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    specialization: '',
    experience: '',
    organization: '',
    licenseNumber: ''
  });

  const handleLogout = () => {
    logout();
  };

  // Case management functions
  const handleAddCase = () => {
    const caseToAdd = {
      id: Date.now(), // Simple ID generation
      ...newCase,
      assignedDate: newCase.assignedDate
    };
    
    // Add to allCases array
    allCases.unshift(caseToAdd);
    
    // Reset form and close modal
    setNewCase({
      farmerName: '',
      farmLocation: '',
      issue: '',
      priority: 'medium',
      status: 'pending',
      assignedDate: new Date().toISOString().split('T')[0],
      contact: '',
      description: ''
    });
    setShowAddCaseModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCase(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddCaseModal = () => {
    setShowAddCaseModal(true);
  };

  // Appointment management functions
  const handleAppointmentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAppointment = () => {
    const appointmentToAdd = {
      id: Date.now(), // Simple ID generation
      ...newAppointment,
      date: newAppointment.date,
      time: newAppointment.time
    };
    
    // Add to upcomingAppointments array
    upcomingAppointments.unshift(appointmentToAdd);
    
    // Reset form and close modal
    setNewAppointment({
      farmerName: '',
      farmLocation: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      purpose: '',
      contact: '',
      notes: ''
    });
    setShowAppointmentModal(false);
  };

  const openAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  // Farmer profile and call functions
  const openFarmerProfile = (farmer: any) => {
    setSelectedFarmer(farmer);
    setShowFarmerProfileModal(true);
  };

  const handleCallFarmer = (phoneNumber: string) => {
    setIsCalling(true);
    
    // Create a temporary link element to trigger the call
    const link = document.createElement('a');
    link.href = `tel:${phoneNumber}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset calling state after a delay
    setTimeout(() => {
      setIsCalling(false);
    }, 2000);
  };

  const closeFarmerProfile = () => {
    setShowFarmerProfileModal(false);
    setSelectedFarmer(null);
  };

  // Edit profile functions
  const openEditProfile = () => {
    setEditProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      qualification: user?.qualification || '',
      specialization: user?.specialization || '',
      experience: user?.experience || '',
      organization: user?.organization || '',
      licenseNumber: user?.licenseNumber || ''
    });
    setShowEditProfileModal(true);
  };

  const handleEditProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to update the profile
    console.log('Saving profile data:', editProfileData);
    
    // For now, just close the modal
    setShowEditProfileModal(false);
    
    // You could also update the local user state here
    // setUser(prev => ({ ...prev, ...editProfileData }));
  };

  const closeEditProfile = () => {
    setShowEditProfileModal(false);
  };

  // Sample data for the dashboard
  const stats = [
    {
      title: 'Total Cases',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Cases',
      value: '8',
      change: '+3%',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'bg-orange-500'
    },
    {
      title: 'Farmers Assisted',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Response Time',
      value: '2.3h',
      change: '-15%',
      changeType: 'negative',
      icon: Clock,
      color: 'bg-purple-500'
    }
  ];

  const recentCases = [
    {
      id: 1,
      farmerName: 'Rajesh Kumar',
      farmLocation: 'Haryana, Karnal',
      issue: 'Poultry Disease Outbreak',
      priority: 'High',
      status: 'In Progress',
      assignedDate: '2024-01-15',
      contact: '+91 98765 43210'
    },
    {
      id: 2,
      farmerName: 'Priya Singh',
      farmLocation: 'Punjab, Ludhiana',
      issue: 'Cattle Vaccination',
      priority: 'Medium',
      status: 'Completed',
      assignedDate: '2024-01-14',
      contact: '+91 98765 43211'
    },
    {
      id: 3,
      farmerName: 'Amit Patel',
      farmLocation: 'Gujarat, Anand',
      issue: 'Biosecurity Assessment',
      priority: 'Low',
      status: 'Pending',
      assignedDate: '2024-01-13',
      contact: '+91 98765 43212'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      farmerName: 'Suresh Verma',
      farmLocation: 'Maharashtra, Nashik',
      date: '2024-01-16',
      time: '10:00 AM',
      purpose: 'Emergency Consultation',
      contact: '+91 98765 43213'
    },
    {
      id: 2,
      farmerName: 'Lakshmi Devi',
      farmLocation: 'Tamil Nadu, Coimbatore',
      date: '2024-01-17',
      time: '2:00 PM',
      purpose: 'Regular Health Check',
      contact: '+91 98765 43214'
    }
  ];

  const allCases = [
    {
      id: 1,
      farmerName: 'Rajesh Kumar',
      farmLocation: 'Haryana, Karnal',
      issue: 'Poultry Disease Outbreak',
      priority: 'High',
      status: 'In Progress',
      assignedDate: '2024-01-15',
      contact: '+91 98765 43210'
    },
    {
      id: 2,
      farmerName: 'Priya Singh',
      farmLocation: 'Punjab, Ludhiana',
      issue: 'Cattle Vaccination',
      priority: 'Medium',
      status: 'Completed',
      assignedDate: '2024-01-14',
      contact: '+91 98765 43211'
    },
    {
      id: 3,
      farmerName: 'Amit Patel',
      farmLocation: 'Gujarat, Anand',
      issue: 'Biosecurity Assessment',
      priority: 'Low',
      status: 'Pending',
      assignedDate: '2024-01-13',
      contact: '+91 98765 43212'
    },
    {
      id: 4,
      farmerName: 'Vikram Singh',
      farmLocation: 'Rajasthan, Jaipur',
      issue: 'Dairy Farm Management',
      priority: 'Medium',
      status: 'Scheduled',
      assignedDate: '2024-01-18',
      contact: '+91 98765 43215'
    },
    {
      id: 5,
      farmerName: 'Meera Iyer',
      farmLocation: 'Karnataka, Bangalore',
      issue: 'Organic Farming Consultation',
      priority: 'Low',
      status: 'Completed',
      assignedDate: '2024-01-12',
      contact: '+91 98765 43216'
    }
  ];

  const farmers = [
    { id: 1, name: 'Rajesh Kumar', location: 'Haryana, Karnal', contact: '+91 98765 43210' },
    { id: 2, name: 'Priya Singh', location: 'Punjab, Ludhiana', contact: '+91 98765 43211' },
    { id: 3, name: 'Amit Patel', location: 'Gujarat, Anand', contact: '+91 98765 43212' },
    { id: 4, name: 'Vikram Singh', location: 'Rajasthan, Jaipur', contact: '+91 98765 43215' },
    { id: 5, name: 'Meera Iyer', location: 'Karnataka, Bangalore', contact: '+91 98765 43216' },
  ];

  const filteredCases = allCases.filter(case_ => {
    const matchesSearch = case_.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.farmLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || case_.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Vet Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, Dr. {user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{user?.organization || 'Independent Practice'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'cases', label: 'Cases', icon: FileText },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'farmers', label: 'Farmers', icon: Users },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">from last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Cases and Appointments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Cases */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Cases</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentCases.map((case_) => (
                    <div key={case_.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{case_.farmerName}</p>
                          <p className="text-sm text-gray-500">{case_.farmLocation}</p>
                          <p className="text-sm text-gray-600">{case_.issue}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(case_.priority)}`}>
                            {case_.priority}
                          </span>
                          <p className={`text-xs mt-1 px-2 py-1 rounded-full ${getStatusColor(case_.status)}`}>
                            {case_.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{appointment.farmerName}</p>
                          <p className="text-sm text-gray-500">{appointment.farmLocation}</p>
                          <p className="text-sm text-gray-600">{appointment.purpose}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search cases by farmer name, issue, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={openAddCaseModal}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cases List */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">All Cases ({filteredCases.length})</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredCases.map((case_) => (
                  <div key={case_.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{case_.farmerName}</p>
                            <p className="text-sm text-gray-500">{case_.farmLocation}</p>
                            <p className="text-sm text-gray-600">{case_.issue}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(case_.priority)}`}>
                              {case_.priority}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(case_.status)}`}>
                              {case_.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                          <span>Assigned: {case_.assignedDate}</span>
                          <span>Contact: {case_.contact}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={openAppointmentModal}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{appointment.farmerName}</h4>
                        <p className="text-sm text-gray-500">{appointment.farmLocation}</p>
                        <p className="text-sm text-gray-600">{appointment.purpose}</p>
                        <p className="text-sm text-gray-500">Contact: {appointment.contact}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">{appointment.date}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                        <div className="mt-2 flex space-x-2">
                          <button className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200">
                            Confirm
                          </button>
                          <button className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full hover:bg-red-200">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'farmers' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Farmer Directory</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {farmers.map((farmer) => (
                  <div key={farmer.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{farmer.name}</h4>
                        <p className="text-sm text-gray-500">{farmer.location}</p>
                        <p className="text-sm text-gray-600">{farmer.contact}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button 
                        onClick={() => openFarmerProfile(farmer)}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-800 text-sm rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        View Profile
                      </button>
                      <button 
                        onClick={() => handleCallFarmer(farmer.contact)}
                        disabled={isCalling}
                        className="px-3 py-2 bg-green-100 text-green-800 text-sm rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                      >
                        {isCalling ? (
                          <div className="w-4 h-4 border-2 border-green-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        ) : (
                          <Phone className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Profile</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Qualification</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.qualification}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.specialization}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.experience} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Organization</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.organization}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">License Number</label>
                    <p className="mt-1 text-sm text-gray-900">{user?.licenseNumber}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  onClick={openEditProfile}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Edit Profile</h3>
                <button
                  onClick={closeEditProfile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editProfileData.name}
                      onChange={handleEditProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editProfileData.email}
                      onChange={handleEditProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editProfileData.phone}
                      onChange={handleEditProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={editProfileData.qualification}
                      onChange={handleEditProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your qualification"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={editProfileData.specialization}
                      onChange={handleEditProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your specialization"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={editProfileData.experience}
                      onChange={handleEditProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your experience in years"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={editProfileData.organization}
                      onChange={handleEditProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your organization"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Number
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={editProfileData.licenseNumber}
                      onChange={handleEditProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your license number"
                    />
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={closeEditProfile}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Case Modal */}
      {showAddCaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Add New Case</h3>
              <button
                onClick={() => setShowAddCaseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farmer Name *
                  </label>
                  <input
                    type="text"
                    name="farmerName"
                    value={newCase.farmerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter farmer's name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Location *
                  </label>
                  <input
                    type="text"
                    name="farmLocation"
                    value={newCase.farmLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, State"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue/Problem *
                  </label>
                  <input
                    type="text"
                    name="issue"
                    value={newCase.issue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority *
                  </label>
                  <select
                    name="priority"
                    value={newCase.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={newCase.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned Date *
                  </label>
                  <input
                    type="date"
                    name="assignedDate"
                    value={newCase.assignedDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={newCase.contact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  value={newCase.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide detailed information about the case..."
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddCaseModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCase}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={!newCase.farmerName || !newCase.farmLocation || !newCase.issue}
              >
                Add Case
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Schedule New Appointment</h3>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farmer Name *
                  </label>
                  <input
                    type="text"
                    name="farmerName"
                    value={newAppointment.farmerName}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter farmer's name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Location *
                  </label>
                  <input
                    type="text"
                    name="farmLocation"
                    value={newAppointment.farmLocation}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, State"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose *
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    value={newAppointment.purpose}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Emergency Consultation, Regular Check"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={newAppointment.contact}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={newAppointment.notes}
                  onChange={handleAppointmentInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any special instructions or additional information..."
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={!newAppointment.farmerName || !newAppointment.farmLocation || !newAppointment.purpose}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Farmer Profile Modal */}
      {showFarmerProfileModal && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {console.log('Rendering farmer profile modal for:', selectedFarmer)}
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Farmer Profile</h3>
              <button
                onClick={closeFarmerProfile}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedFarmer.name}</h2>
                <p className="text-gray-600">{selectedFarmer.location}</p>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{selectedFarmer.contact}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{selectedFarmer.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCallFarmer(selectedFarmer.contact)}
                  disabled={isCalling}
                  className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isCalling ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Calling...</span>
                    </>
                  ) : (
                    <>
                      <Phone className="h-4 w-4" />
                      <span>Call Farmer</span>
                    </>
                  )}
                </button>
              </div>

              {/* Farm Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  Farm Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Farm Location:</span>
                    <span className="font-medium">{selectedFarmer.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Farm Type:</span>
                    <span className="font-medium">{selectedFarmer.farmType || 'Mixed Farming'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{selectedFarmer.experience || '5+ years'}</span>
                  </div>
                </div>
              </div>

              {/* Recent Cases */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  Recent Cases
                </h4>
                <div className="space-y-2">
                  {allCases.filter(case_ => case_.farmerName === selectedFarmer.name).slice(0, 3).map((case_, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm text-gray-700">{case_.issue}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        case_.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        case_.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {case_.status}
                      </span>
                    </div>
                  ))}
                  {allCases.filter(case_ => case_.farmerName === selectedFarmer.name).length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-2">No cases found for this farmer</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      closeFarmerProfile();
                      setNewCase(prev => ({
                        ...prev,
                        farmerName: selectedFarmer.name,
                        farmLocation: selectedFarmer.location,
                        contact: selectedFarmer.contact
                      }));
                      setShowAddCaseModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Create Case
                  </button>
                  <button
                    onClick={() => {
                      closeFarmerProfile();
                      setNewAppointment(prev => ({
                        ...prev,
                        farmerName: selectedFarmer.name,
                        farmLocation: selectedFarmer.location,
                        contact: selectedFarmer.contact
                      }));
                      setShowAppointmentModal(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeFarmerProfile}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VetDashboard;
