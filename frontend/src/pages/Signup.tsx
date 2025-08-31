import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import farmBg from '../assets/farm-bg.jpg';
import { User, Shield, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [selectedType, setSelectedType] = useState<'farmer' | 'vet' | null>(null);
  const navigate = useNavigate();

  const handleTypeSelection = (type: 'farmer' | 'vet') => {
    setSelectedType(type);
    // Navigate to specific registration page
    navigate(`/signup/${type}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${farmBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-2xl w-full space-y-8 bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Join Farm Rakshaa
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose your role to get started with farm health management
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Farmer Registration */}
          <div 
            className="group cursor-pointer p-6 border-2 border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={() => handleTypeSelection('farmer')}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Farmer</h3>
              <p className="text-gray-600 mb-4">
                Manage your farm's biosecurity, track compliance, and get expert guidance
              </p>
              <div className="flex items-center justify-center text-teal-600 font-medium group-hover:text-teal-700">
                <span>Register as Farmer</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Vet Team Registration */}
          <div 
            className="group cursor-pointer p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={() => handleTypeSelection('vet')}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Veterinary Team</h3>
              <p className="text-gray-600 mb-4">
                Join our expert network to provide professional farm health services
              </p>
              <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                <span>Join Vet Team</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">What You'll Get</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-teal-600 font-bold">✓</span>
              </div>
              <p>Expert Guidance</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-teal-600 font-bold">✓</span>
              </div>
              <p>24/7 Support</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-teal-600 font-bold">✓</span>
              </div>
              <p>Secure Platform</p>
            </div>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
