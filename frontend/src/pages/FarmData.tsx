import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FarmData as FarmDataInterface, authAPI } from '../services/api';
import { Save, ArrowLeft, Home, PiggyBank, Feather, Heart, Star } from 'lucide-react';

const FarmData: React.FC = () => {
  const { user } = useAuth();
  const [farmData, setFarmData] = useState<FarmDataInterface>({
    totalAcres: 0,
    livestock: {
      pigs: { total: 0, vaccinated: 0 },
      poultry: { total: 0, vaccinated: 0 },
      cattle: { total: 0, vaccinated: 0 },
      goats: { total: 0, vaccinated: 0 }
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.farmData) {
      setFarmData(user.farmData);
    }
  }, [user]);

  const handleInputChange = (category: string, field: string, value: number) => {
    // Validate input value
    if (isNaN(value) || value < 0) {
      return; // Don't update if invalid
    }
    
    // Special validation for vaccinated count
    if (field === 'vaccinated') {
      const currentTotal = farmData.livestock[category as keyof typeof farmData.livestock].total;
      if (value > currentTotal) {
        return; // Don't allow vaccinated to exceed total
      }
    }
    
    setFarmData(prev => ({
      ...prev,
      livestock: {
        ...prev.livestock,
        [category]: {
          ...prev.livestock[category as keyof typeof prev.livestock],
          [field]: value
        }
      }
    }));
  };

  const handleAcresChange = (value: number) => {
    // Validate input value
    if (isNaN(value) || value < 0) {
      return; // Don't update if invalid
    }
    
    setFarmData(prev => ({
      ...prev,
      totalAcres: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Validate farm data before saving
      const validationErrors = [];
      
      // Check for negative values
      if (farmData.totalAcres < 0) {
        validationErrors.push('Total acres cannot be negative');
      }
      
      // Check livestock counts
      Object.entries(farmData.livestock).forEach(([animal, data]) => {
        if (data.total < 0) {
          validationErrors.push(`${animal} total count cannot be negative`);
        }
        if (data.vaccinated < 0) {
          validationErrors.push(`${animal} vaccinated count cannot be negative`);
        }
        if (data.vaccinated > data.total) {
          validationErrors.push(`${animal} vaccinated count cannot exceed total count`);
        }
      });
      
      if (validationErrors.length > 0) {
        setMessage(`Validation errors: ${validationErrors.join(', ')}`);
        return;
      }

      // Make API call to save farm data
      const result = await authAPI.updateFarmData(farmData);
      
      // Update local user data if successful
      if (result) {
        setMessage('Farm data saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error: any) {
      console.error('Error saving farm data:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Error saving farm data. Please try again.';
      
      if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please login again.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid data provided.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalLivestock = () => {
    const { livestock } = farmData;
    return livestock.pigs.total + livestock.poultry.total + livestock.cattle.total + livestock.goats.total;
  };

  const calculateTotalVaccinated = () => {
    const { livestock } = farmData;
    return livestock.pigs.vaccinated + livestock.poultry.vaccinated + livestock.cattle.vaccinated + livestock.goats.vaccinated;
  };

  const totalLivestock = calculateTotalLivestock();
  const totalVaccinated = calculateTotalVaccinated();
  const vaccinationPercentage = totalLivestock > 0 ? Math.round((totalVaccinated / totalLivestock) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Farm Data Management
            </h1>
            <p className="text-gray-600">
              Update your farm information and livestock counts
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/farmer'}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Farm Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
                         <Home className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-800">Farm Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Farm Area (Acres)
              </label>
              <input
                type="number"
                min="0"
                value={farmData.totalAcres}
                onChange={(e) => handleAcresChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter total acres"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-blue-800">Total Livestock</div>
              <div className="text-2xl font-bold text-blue-900">{totalLivestock}</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-green-800">Vaccination Coverage</div>
              <div className="text-2xl font-bold text-green-900">{vaccinationPercentage}%</div>
            </div>
          </div>
        </div>

        {/* Livestock Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Livestock Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pigs */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <PiggyBank className="h-5 w-5 text-pink-600" />
                <h3 className="font-semibold text-gray-800">Pigs</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Pigs</label>
                  <input
                    type="number"
                    min="0"
                    value={farmData.livestock.pigs.total}
                    onChange={(e) => handleInputChange('pigs', 'total', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaccinated Pigs</label>
                  <input
                    type="number"
                    min="0"
                    max={farmData.livestock.pigs.total}
                    value={farmData.livestock.pigs.vaccinated}
                    onChange={(e) => handleInputChange('pigs', 'vaccinated', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Remaining:</span> 
                  <span className={`ml-1 font-semibold ${
                    (farmData.livestock.pigs.total - farmData.livestock.pigs.vaccinated) > 0 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {farmData.livestock.pigs.total - farmData.livestock.pigs.vaccinated}
                  </span>
                </div>
              </div>
            </div>

            {/* Poultry */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Feather className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-gray-800">Poultry</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Poultry</label>
                  <input
                    type="number"
                    min="0"
                    value={farmData.livestock.poultry.total}
                    onChange={(e) => handleInputChange('poultry', 'total', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaccinated Poultry</label>
                  <input
                    type="number"
                    min="0"
                    max={farmData.livestock.poultry.total}
                    value={farmData.livestock.poultry.vaccinated}
                    onChange={(e) => handleInputChange('poultry', 'vaccinated', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Remaining:</span> 
                  <span className={`ml-1 font-semibold ${
                    (farmData.livestock.poultry.total - farmData.livestock.poultry.vaccinated) > 0 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {farmData.livestock.poultry.total - farmData.livestock.poultry.vaccinated}
                  </span>
                </div>
              </div>
            </div>

                         {/* Cattle */}
             <div className="border border-gray-200 rounded-lg p-4">
               <div className="flex items-center space-x-2 mb-4">
                 <Heart className="h-5 w-5 text-brown-600" />
                 <h3 className="font-semibold text-gray-800">Cattle</h3>
               </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Cattle</label>
                  <input
                    type="number"
                    min="0"
                    value={farmData.livestock.cattle.total}
                    onChange={(e) => handleInputChange('cattle', 'total', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaccinated Cattle</label>
                  <input
                    type="number"
                    min="0"
                    max={farmData.livestock.cattle.total}
                    value={farmData.livestock.cattle.vaccinated}
                    onChange={(e) => handleInputChange('cattle', 'vaccinated', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Remaining:</span> 
                  <span className={`ml-1 font-semibold ${
                    (farmData.livestock.cattle.total - farmData.livestock.cattle.vaccinated) > 0 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {farmData.livestock.cattle.total - farmData.livestock.cattle.vaccinated}
                  </span>
                </div>
              </div>
            </div>

                         {/* Goats */}
             <div className="border border-gray-200 rounded-lg p-4">
               <div className="flex items-center space-x-2 mb-4">
                 <Star className="h-5 w-5 text-orange-600" />
                 <h3 className="font-semibold text-gray-800">Goats</h3>
               </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Goats</label>
                  <input
                    type="number"
                    min="0"
                    value={farmData.livestock.goats.total}
                    onChange={(e) => handleInputChange('goats', 'total', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaccinated Goats</label>
                  <input
                    type="number"
                    min="0"
                    max={farmData.livestock.goats.total}
                    value={farmData.livestock.goats.vaccinated}
                    onChange={(e) => handleInputChange('goats', 'vaccinated', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Remaining:</span> 
                  <span className={`ml-1 font-semibold ${
                    (farmData.livestock.goats.total - farmData.livestock.goats.vaccinated) > 0 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {farmData.livestock.goats.total - farmData.livestock.goats.vaccinated}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <span className="text-gray-600">Total Livestock:</span>
                <span className="font-bold text-blue-800 ml-2 text-lg">{totalLivestock}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-100">
                <span className="text-gray-600">Total Vaccinated:</span>
                <span className="font-bold text-green-800 ml-2 text-lg">{totalVaccinated}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-orange-100">
                <span className="text-gray-600">Remaining:</span>
                <span className={`font-bold ml-2 text-lg ${
                  (totalLivestock - totalVaccinated) > 0 ? 'text-orange-800' : 'text-green-800'
                }`}>
                  {totalLivestock - totalVaccinated}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <span className="text-gray-600">Coverage:</span>
                <span className={`font-bold ml-2 text-lg ${
                  vaccinationPercentage >= 80 ? 'text-green-800' : 
                  vaccinationPercentage >= 60 ? 'text-yellow-800' : 'text-red-800'
                }`}>
                  {vaccinationPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Saving...' : 'Save Farm Data'}</span>
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes('Error') || message.includes('Validation errors') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmData;
