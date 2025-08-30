import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import farmBg from '../assets/farm-bg.jpg';
import { authAPI } from '../services/api';

const Signup = () => {
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
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
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
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string): string => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== formData.password) return 'Passwords do not match';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    try {
      const { name, email, phone, flatNo, street, district, state, aadhaarNumber, village, password } = formData;
      
      // Debug logging
      console.log('🔍 Sending registration data:', {
        name,
        email,
        phone,
        flatNo,
        street,
        district,
        state,
        aadhaarNumber,
        village,
        password: '***hidden***'
      });
      
      // Combine address fields
      const address = `${flatNo}, ${street}, ${district}, ${state}`;
      await authAPI.register({ name, email, phone, flatNo, street, district, state, aadhaarNumber, village, password });
      navigate('/', { state: { success: 'Registration successful' } });
    } catch (err: any) {
      console.error('❌ Registration error:', err);
      console.error('❌ Error response:', err?.response?.data);
      console.error('❌ Error status:', err?.response?.status);
      
      let errorMessage = err?.response?.data?.message || 'Registration failed. Please try again.';
      
      // Handle validation errors
      if (err?.response?.data?.errors) {
        const validationErrors = err.response.data.errors.map((error: any) => error.msg).join(', ');
        errorMessage = `Validation errors: ${validationErrors}`;
      }
      
      setError(errorMessage);
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
      <div className="max-w-md w-full space-y-6 bg-white bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              Login
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Name Input */}
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

          {/* Email Input */}
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

          {/* Phone Input */}
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

          {/* Address Fields */}
          <div className="grid grid-cols-2 gap-3">
            {/* Flat/House Number */}
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

            {/* Street */}
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* District */}
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

            {/* State */}
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
          </div>

          {/* Village Input */}
          <div>
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

          {/* Aadhaar Input */}
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

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName('password')}
            />
            {errors.password && touched.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName('confirmPassword')}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
