import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Home, Shield, Eye, EyeOff } from 'lucide-react';
import farmBg from '../assets/farm-bg.jpg';
import { authAPI } from '../services/api';

const FarmerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    flatNo: '',
    street: '',
    district: '',
    state: '',
    aadhaarNumber: '',
    village: '',
    farmSize: '',
    livestockType: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (/\d/.test(name)) return 'Name cannot contain numbers';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone) return 'Phone number is required';
    if (!/^\d{10}$/.test(phone)) return 'Phone number must be exactly 10 digits';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string): string => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== formData.password) return 'Passwords do not match';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    let fieldError = '';
    switch (name) {
      case 'name':
        fieldError = validateName(value);
        break;
      case 'email':
        fieldError = validateEmail(value);
        break;
      case 'phone':
        fieldError = validatePhone(value);
        break;
      case 'password':
        fieldError = validatePassword(value);
        break;
      case 'confirmPassword':
        fieldError = validateConfirmPassword(value);
        break;
    }
    
    if (fieldError) {
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword);
    
    // Required field validations
    if (!formData.flatNo.trim()) newErrors.flatNo = 'Flat/House number is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.village.trim()) newErrors.village = 'Village is required';
    if (!formData.aadhaarNumber.trim()) newErrors.aadhaarNumber = 'Aadhaar number is required';
    if (!formData.farmSize.trim()) newErrors.farmSize = 'Farm size is required';
    if (!formData.livestockType.trim()) newErrors.livestockType = 'Livestock type is required';
    
    // Aadhaar validation
    if (formData.aadhaarNumber) {
      const aadhaarRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
      if (!aadhaarRegex.test(formData.aadhaarNumber)) {
        newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
      }
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      setError('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    
    try {
      const { name, email, phone, flatNo, street, district, state, aadhaarNumber, village, farmSize, livestockType, password } = formData;
      
      await authAPI.register({ 
        name, 
        email, 
        phone, 
        flatNo, 
        street, 
        district, 
        state, 
        aadhaarNumber, 
        village, 
        farmSize,
        livestockType,
        password,
        role: 'farmer'
      });
      
      navigate('/login', { state: { success: 'Farmer registration successful! Please login.' } });
    } catch (err: any) {
      console.error('Registration error:', err);
      
      let errorMessage = err?.response?.data?.message || 'Registration failed. Please try again.';
      
      if (err?.response?.data?.errors) {
        const validationErrors = err.response.data.errors.map((error: any) => error.msg).join(', ');
        errorMessage = `Validation errors: ${validationErrors}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName: string): string => {
    const baseClasses = "block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
    const hasError = errors[fieldName] && touched[fieldName];
    
    if (hasError) {
      return `${baseClasses} border-red-300 focus:ring-red-500 focus:border-red-500`;
    }
    return `${baseClasses} border-gray-300 focus:ring-teal-500 focus:border-teal-500`;
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
      <div className="max-w-2xl w-full space-y-6 bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Link to="/signup" className="text-teal-600 hover:text-teal-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900">Farmer Registration</h2>
          </div>
          <p className="text-gray-600">
            Join Farm Rakshaa to manage your farm's health and biosecurity
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-teal-600" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name (Letters only)"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('name')}
                />
                {errors.name && touched.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('email')}
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (10 digits)"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={10}
                  className={getInputClassName('phone')}
                />
                {errors.phone && touched.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="aadhaarNumber"
                  placeholder="Aadhaar Number (12 digits)"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={12}
                  className={getInputClassName('aadhaarNumber')}
                />
                {errors.aadhaarNumber && touched.aadhaarNumber && (
                  <p className="mt-1 text-xs text-red-600">{errors.aadhaarNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Home className="h-5 w-5 mr-2 text-teal-600" />
              Address Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="flatNo"
                  placeholder="Flat/House No."
                  value={formData.flatNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('flatNo')}
                />
                {errors.flatNo && touched.flatNo && (
                  <p className="mt-1 text-xs text-red-600">{errors.flatNo}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('street')}
                />
                {errors.street && touched.street && (
                  <p className="mt-1 text-xs text-red-600">{errors.street}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('district')}
                />
                {errors.district && touched.district && (
                  <p className="mt-1 text-xs text-red-600">{errors.district}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('state')}
                />
                {errors.state && touched.state && (
                  <p className="mt-1 text-xs text-red-600">{errors.state}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <input
                  type="text"
                  name="village"
                  placeholder="Village"
                  value={formData.village}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('village')}
                />
                {errors.village && touched.village && (
                  <p className="mt-1 text-xs text-red-600">{errors.village}</p>
                )}
              </div>
            </div>
          </div>

          {/* Farm Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-teal-600" />
              Farm Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="farmSize"
                  placeholder="Farm Size (acres/hectares)"
                  value={formData.farmSize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('farmSize')}
                />
                {errors.farmSize && touched.farmSize && (
                  <p className="mt-1 text-xs text-red-600">{errors.farmSize}</p>
                )}
              </div>

              <div>
                <select
                  name="livestockType"
                  value={formData.livestockType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('livestockType')}
                >
                  <option value="">Select Livestock Type</option>
                  <option value="cattle">Cattle</option>
                  <option value="poultry">Poultry</option>
                  <option value="pigs">Pigs</option>
                  <option value="goats">Goats</option>
                  <option value="sheep">Sheep</option>
                  <option value="mixed">Mixed Livestock</option>
                  <option value="other">Other</option>
                </select>
                {errors.livestockType && touched.livestockType && (
                  <p className="mt-1 text-xs text-red-600">{errors.livestockType}</p>
                )}
              </div>
            </div>
          </div>

          {/* Password Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-600">
              Password must contain at least 6 characters, one lowercase letter, one uppercase letter, and one number.
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            {isLoading ? 'Creating Account...' : 'Create Farmer Account'}
          </button>
        </form>

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

export default FarmerSignup;
