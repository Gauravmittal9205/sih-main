import React, { useState } from 'react';
import { MapPin, AlertTriangle, Info, CheckCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FarmLocation {
  id: string;
  name: string;
  owner: string;
  location: string;
  coordinates: { x: number; y: number };
  alertType: 'avian_flu' | 'swine_fever' | 'foot_mouth' | 'none';
  severity: 'high' | 'medium' | 'low' | 'none';
  status: 'active' | 'monitoring' | 'resolved' | 'none';
  affectedAnimals: string[];
  lastUpdated: string;
}

const farmLocations: FarmLocation[] = [
  {
    id: '1',
    name: 'Punjab Poultry Farm',
    owner: 'Rajinder Singh',
    location: 'Ludhiana, Punjab',
    coordinates: { x: 45, y: 35 },
    alertType: 'avian_flu',
    severity: 'high',
    status: 'active',
    affectedAnimals: ['Chickens', 'Ducks'],
    lastUpdated: '2025-01-14'
  },
  {
    id: '2',
    name: 'Gujarat Swine Farm',
    owner: 'Patel Brothers',
    location: 'Rajkot, Gujarat',
    coordinates: { x: 35, y: 75 },
    alertType: 'swine_fever',
    severity: 'medium',
    status: 'monitoring',
    affectedAnimals: ['Pigs'],
    lastUpdated: '2025-01-12'
  },
  {
    id: '3',
    name: 'Haryana Cattle Farm',
    owner: 'Mohan Lal',
    location: 'Hisar, Haryana',
    coordinates: { x: 50, y: 40 },
    alertType: 'foot_mouth',
    severity: 'low',
    status: 'resolved',
    affectedAnimals: ['Cattle'],
    lastUpdated: '2025-01-08'
  },
  {
    id: '4',
    name: 'Maharashtra Dairy Farm',
    owner: 'Shivaji Patil',
    location: 'Pune, Maharashtra',
    coordinates: { x: 30, y: 70 },
    alertType: 'none',
    severity: 'none',
    status: 'none',
    affectedAnimals: [],
    lastUpdated: '2025-01-15'
  },
  {
    id: '5',
    name: 'Karnataka Poultry Farm',
    owner: 'Kumar Reddy',
    location: 'Bangalore, Karnataka',
    coordinates: { x: 25, y: 85 },
    alertType: 'avian_flu',
    severity: 'medium',
    status: 'monitoring',
    affectedAnimals: ['Chickens'],
    lastUpdated: '2025-01-13'
  },
  {
    id: '6',
    name: 'Tamil Nadu Goat Farm',
    owner: 'Muthu Velu',
    location: 'Coimbatore, Tamil Nadu',
    coordinates: { x: 20, y: 90 },
    alertType: 'foot_mouth',
    severity: 'high',
    status: 'active',
    affectedAnimals: ['Goats', 'Sheep'],
    lastUpdated: '2025-01-15'
  },
  {
    id: '7',
    name: 'Uttar Pradesh Buffalo Farm',
    owner: 'Ram Kumar',
    location: 'Lucknow, Uttar Pradesh',
    coordinates: { x: 55, y: 45 },
    alertType: 'none',
    severity: 'none',
    status: 'none',
    affectedAnimals: [],
    lastUpdated: '2025-01-14'
  },
  {
    id: '8',
    name: 'West Bengal Duck Farm',
    owner: 'Amit Das',
    location: 'Kolkata, West Bengal',
    coordinates: { x: 70, y: 60 },
    alertType: 'avian_flu',
    severity: 'low',
    status: 'monitoring',
    affectedAnimals: ['Ducks'],
    lastUpdated: '2025-01-11'
  },
  {
    id: '9',
    name: 'Rajasthan Camel Farm',
    owner: 'Bhanwar Singh',
    location: 'Jodhpur, Rajasthan',
    coordinates: { x: 25, y: 45 },
    alertType: 'none',
    severity: 'none',
    status: 'none',
    affectedAnimals: [],
    lastUpdated: '2025-01-13'
  },
  {
    id: '10',
    name: 'Kerala Fish Farm',
    owner: 'Thomas Mathew',
    location: 'Kochi, Kerala',
    coordinates: { x: 15, y: 95 },
    alertType: 'none',
    severity: 'none',
    status: 'none',
    affectedAnimals: [],
    lastUpdated: '2025-01-12'
  }
];

interface AlertMapProps {
  filterSeverity: 'all' | 'high' | 'medium' | 'low';
}

const AlertMap: React.FC<AlertMapProps> = ({ filterSeverity }) => {
  const { language } = useLanguage();
  const [selectedFarm, setSelectedFarm] = useState<FarmLocation | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'monitoring' | 'resolved' | 'none'>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'monitoring': return <Info className="h-4 w-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const filteredFarms = farmLocations.filter(farm => {
    const matchesSeverity = filterSeverity === 'all' || farm.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || farm.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const handleFarmClick = (farm: FarmLocation) => {
    setSelectedFarm(farm);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
      isExpanded ? 'h-[800px]' : 'h-[600px]'
    }`}>
      {/* Map Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold">
              {language === 'en' ? 'Farm Alert Map' : 'Farm Alert Map'}
            </h3>
            <p className="text-sm opacity-90">
              {language === 'en' 
                ? 'Interactive map showing farms with disease alerts'
                : 'Disease alerts wale farms ki interactive map'
              }
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder={language === 'en' ? 'Search farms, owners, locations...' : 'Farms, owners, locations search karein...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-1">
            {['all', 'active', 'monitoring', 'resolved', 'none'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filterStatus === status 
                    ? 'bg-white text-teal-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-full">
        {/* India Map SVG */}
        <div className="absolute inset-0 p-4">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}
          >
            {/* India Outline - Simplified */}
            <path
              d="M20 20 L80 20 L85 30 L80 40 L75 50 L70 60 L65 70 L60 75 L55 80 L50 85 L45 80 L40 75 L35 70 L30 65 L25 60 L20 50 L20 40 L20 30 Z"
              fill="#e5f3ff"
              stroke="#3b82f6"
              strokeWidth="0.5"
            />

            {/* State Boundaries */}
            <path d="M30 30 L50 30 L50 50 L30 50 Z" fill="none" stroke="#94a3b8" strokeWidth="0.2" />
            <path d="M50 30 L70 30 L70 50 L50 50 Z" fill="none" stroke="#94a3b8" strokeWidth="0.2" />
            <path d="M30 50 L50 50 L50 70 L30 70 Z" fill="none" stroke="#94a3b8" strokeWidth="0.2" />
            <path d="M50 50 L70 50 L70 70 L50 70 Z" fill="none" stroke="#94a3b8" strokeWidth="0.2" />

            {/* Farm Markers */}
            {filteredFarms.map((farm) => (
              <g key={farm.id}>
                {/* Marker Circle */}
                <circle
                  cx={farm.coordinates.x}
                  cy={farm.coordinates.y}
                  r={farm.severity === 'none' ? 1.5 : 2.5}
                  fill={getSeverityColor(farm.severity)}
                  stroke="white"
                  strokeWidth="0.5"
                  className="cursor-pointer hover:r-3 transition-all duration-200"
                  onClick={() => handleFarmClick(farm)}
                />
                
                {/* Pulse Animation for Active Alerts */}
                {farm.status === 'active' && (
                  <circle
                    cx={farm.coordinates.x}
                    cy={farm.coordinates.y}
                    r="4"
                    fill="none"
                    stroke={getSeverityColor(farm.severity)}
                    strokeWidth="0.5"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Farm Name Label */}
                <text
                  x={farm.coordinates.x}
                  y={farm.coordinates.y - 3}
                  textAnchor="middle"
                  fontSize="2"
                  fill="#374151"
                  className="font-medium"
                >
                  {farm.name.split(' ')[0]}
                </text>
              </g>
            ))}

            {/* Legend */}
            <g transform="translate(5, 5)">
              <rect x="0" y="0" width="20" height="25" fill="white" stroke="#d1d5db" strokeWidth="0.2" rx="1" />
              <text x="10" y="8" textAnchor="middle" fontSize="2" fill="#374151" className="font-semibold">
                {language === 'en' ? 'Legend' : 'Legend'}
              </text>
              
              {/* High Severity */}
              <circle cx="3" cy="12" r="1" fill="#ef4444" />
              <text x="6" y="13" fontSize="1.5" fill="#374151">High</text>
              
              {/* Medium Severity */}
              <circle cx="3" cy="16" r="1" fill="#f59e0b" />
              <text x="6" y="17" fontSize="1.5" fill="#374151">Medium</text>
              
              {/* Low Severity */}
              <circle cx="3" cy="20" r="1" fill="#10b981" />
              <text x="6" y="21" fontSize="1.5" fill="#374151">Low</text>
              
              {/* No Alert */}
              <circle cx="3" cy="24" r="1" fill="#6b7280" />
              <text x="6" y="25" fontSize="1.5" fill="#374151">Safe</text>
            </g>
          </svg>
        </div>

        {/* Farm Details Panel */}
        {selectedFarm && (
          <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{selectedFarm.name}</h4>
                <button
                  onClick={() => setSelectedFarm(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Owner' : 'Malik'}: {selectedFarm.owner}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Location' : 'Sthan'}: {selectedFarm.location}
                  </p>
                </div>

                {selectedFarm.alertType !== 'none' ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedFarm.status)}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedFarm.severity === 'high' ? 'bg-red-100 text-red-700' :
                        selectedFarm.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {selectedFarm.severity.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Alert Type' : 'Alert Type'}: {selectedFarm.alertType.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {language === 'en' ? 'Status' : 'Status'}: {selectedFarm.status}
                      </p>
                    </div>

                    {selectedFarm.affectedAnimals.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {language === 'en' ? 'Affected Animals' : 'Prabhavit Pashu'}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedFarm.affectedAnimals.map((animal, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {animal}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                      {language === 'en' ? 'Last Updated' : 'Last Updated'}: {new Date(selectedFarm.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'No active alerts' : 'Koi active alert nahi'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Statistics Panel */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <h5 className="font-semibold text-gray-800 text-sm mb-2">
            {language === 'en' ? 'Alert Summary' : 'Alert Summary'}
          </h5>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-red-600">High:</span>
              <span className="font-medium">{filteredFarms.filter(f => f.severity === 'high').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-600">Medium:</span>
              <span className="font-medium">{filteredFarms.filter(f => f.severity === 'medium').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Low:</span>
              <span className="font-medium">{filteredFarms.filter(f => f.severity === 'low').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Safe:</span>
              <span className="font-medium">{filteredFarms.filter(f => f.severity === 'none').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertMap;
