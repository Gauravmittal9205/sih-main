import React, { useState } from 'react';
import { 
  Shield, 
  Farm, 
  Users, 
  Droplets, 
  Bug, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

interface BiosecurityFormData {
  // Farm Infrastructure
  farm_size_acres: number;
  fencing_quality: 'excellent' | 'good' | 'fair' | 'poor';
  biosecurity_gates: 'yes' | 'no';
  quarantine_facility: 'yes' | 'no';
  vehicle_wash_station: 'yes' | 'no';
  
  // Livestock Management
  livestock_count: number;
  vaccination_protocol: 'strict' | 'moderate' | 'basic' | 'none';
  disease_monitoring: 'daily' | 'weekly' | 'monthly' | 'rarely';
  isolation_practices: 'excellent' | 'good' | 'fair' | 'poor';
  
  // Hygiene Practices
  disinfection_frequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
  personal_protective_equipment: 'full' | 'partial' | 'basic' | 'none';
  visitor_control: 'strict' | 'moderate' | 'basic' | 'none';
  
  // Feed and Water
  feed_storage_security: 'excellent' | 'good' | 'fair' | 'poor';
  water_source_protection: 'excellent' | 'good' | 'fair' | 'poor';
  
  // Pest Control
  rodent_control: 'excellent' | 'good' | 'fair' | 'poor';
  insect_control: 'excellent' | 'good' | 'fair' | 'poor';
  
  // Training and Documentation
  staff_training: 'monthly' | 'quarterly' | 'biannual' | 'annual';
  protocol_documentation: 'comprehensive' | 'moderate' | 'basic' | 'none';
  
  // Emergency Response
  emergency_plan: 'yes' | 'no';
  veterinary_contact: 'yes' | 'no';
}

interface BiosecurityAssessmentFormProps {
  onSubmit: (data: BiosecurityFormData) => void;
  isLoading?: boolean;
}

const BiosecurityAssessmentForm: React.FC<BiosecurityAssessmentFormProps> = ({ 
  onSubmit, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<BiosecurityFormData>({
    // Farm Infrastructure
    farm_size_acres: 100,
    fencing_quality: 'good',
    biosecurity_gates: 'no',
    quarantine_facility: 'no',
    vehicle_wash_station: 'no',
    
    // Livestock Management
    livestock_count: 200,
    vaccination_protocol: 'moderate',
    disease_monitoring: 'weekly',
    isolation_practices: 'good',
    
    // Hygiene Practices
    disinfection_frequency: 'weekly',
    personal_protective_equipment: 'partial',
    visitor_control: 'moderate',
    
    // Feed and Water
    feed_storage_security: 'good',
    water_source_protection: 'good',
    
    // Pest Control
    rodent_control: 'good',
    insect_control: 'fair',
    
    // Training and Documentation
    staff_training: 'quarterly',
    protocol_documentation: 'moderate',
    
    // Emergency Response
    emergency_plan: 'yes',
    veterinary_contact: 'yes'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handleInputChange = (field: keyof BiosecurityFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index + 1 < currentStep 
                ? 'bg-green-500 text-white' 
                : index + 1 === currentStep 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {index + 1 < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-2 text-sm text-gray-600">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );

  const renderFarmInfrastructure = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Farm className="w-5 h-5 mr-2 text-blue-600" />
        Farm Infrastructure
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Farm Size (acres) *
          </label>
          <input
            type="number"
            value={formData.farm_size_acres}
            onChange={(e) => handleInputChange('farm_size_acres', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fencing Quality *
          </label>
          <select
            value={formData.fencing_quality}
            onChange={(e) => handleInputChange('fencing_quality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Biosecurity Gates
          </label>
          <select
            value={formData.biosecurity_gates}
            onChange={(e) => handleInputChange('biosecurity_gates', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quarantine Facility
          </label>
          <select
            value={formData.quarantine_facility}
            onChange={(e) => handleInputChange('quarantine_facility', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Wash Station
          </label>
          <select
            value={formData.vehicle_wash_station}
            onChange={(e) => handleInputChange('vehicle_wash_station', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderLivestockManagement = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Users className="w-5 h-5 mr-2 text-green-600" />
        Livestock Management
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Livestock Count *
          </label>
          <input
            type="number"
            value={formData.livestock_count}
            onChange={(e) => handleInputChange('livestock_count', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vaccination Protocol
          </label>
          <select
            value={formData.vaccination_protocol}
            onChange={(e) => handleInputChange('vaccination_protocol', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="strict">Strict</option>
            <option value="moderate">Moderate</option>
            <option value="basic">Basic</option>
            <option value="none">None</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disease Monitoring
          </label>
          <select
            value={formData.disease_monitoring}
            onChange={(e) => handleInputChange('disease_monitoring', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Isolation Practices
          </label>
          <select
            value={formData.isolation_practices}
            onChange={(e) => handleInputChange('isolation_practices', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderHygienePractices = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-purple-600" />
        Hygiene Practices
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disinfection Frequency
          </label>
          <select
            value={formData.disinfection_frequency}
            onChange={(e) => handleInputChange('disinfection_frequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personal Protective Equipment
          </label>
          <select
            value={formData.personal_protective_equipment}
            onChange={(e) => handleInputChange('personal_protective_equipment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="full">Full</option>
            <option value="partial">Partial</option>
            <option value="basic">Basic</option>
            <option value="none">None</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visitor Control
          </label>
          <select
            value={formData.visitor_control}
            onChange={(e) => handleInputChange('visitor_control', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="strict">Strict</option>
            <option value="moderate">Moderate</option>
            <option value="basic">Basic</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderFeedAndWater = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Droplets className="w-5 h-5 mr-2 text-blue-600" />
        Feed and Water Security
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Feed Storage Security
          </label>
          <select
            value={formData.feed_storage_security}
            onChange={(e) => handleInputChange('feed_storage_security', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water Source Protection
          </label>
          <select
            value={formData.water_source_protection}
            onChange={(e) => handleInputChange('water_source_protection', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPestControl = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Bug className="w-5 h-5 mr-2 text-red-600" />
        Pest Control
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rodent Control
          </label>
          <select
            value={formData.rodent_control}
            onChange={(e) => handleInputChange('rodent_control', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insect Control
          </label>
          <select
            value={formData.insect_control}
            onChange={(e) => handleInputChange('insect_control', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderTrainingAndEmergency = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-orange-600" />
        Training, Documentation & Emergency Response
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Staff Training
          </label>
          <select
            value={formData.staff_training}
            onChange={(e) => handleInputChange('staff_training', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="biannual">Biannual</option>
            <option value="annual">Annual</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Protocol Documentation
          </label>
          <select
            value={formData.protocol_documentation}
            onChange={(e) => handleInputChange('protocol_documentation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="comprehensive">Comprehensive</option>
            <option value="moderate">Moderate</option>
            <option value="basic">Basic</option>
            <option value="none">None</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emergency Plan
          </label>
          <select
            value={formData.emergency_plan}
            onChange={(e) => handleInputChange('emergency_plan', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Veterinary Contact
          </label>
          <select
            value={formData.veterinary_contact}
            onChange={(e) => handleInputChange('veterinary_contact', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderFarmInfrastructure();
      case 2:
        return renderLivestockManagement();
      case 3:
        return renderHygienePractices();
      case 4:
        return renderFeedAndWater();
      case 5:
        return renderPestControl();
      case 6:
        return renderTrainingAndEmergency();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Biosecurity Assessment
        </h2>
        <p className="text-gray-600">
          Complete this comprehensive assessment to get your farm's biosecurity score
        </p>
      </div>

      {renderStepIndicator()}

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderCurrentStep()}

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Get Biosecurity Score
                </>
              )}
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>This assessment uses advanced ML algorithms to calculate your biosecurity score</li>
              <li>All fields marked with * are required</li>
              <li>Be honest in your responses for accurate results</li>
              <li>Your data is processed securely and anonymously</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiosecurityAssessmentForm;
