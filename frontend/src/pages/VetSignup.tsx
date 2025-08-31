import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Mail, Phone, Home, GraduationCap, Award, Eye, EyeOff, Upload } from 'lucide-react';
import farmBg from '../assets/farm-bg.jpg';
import { authAPI } from '../services/api';

const VetSignup = () => {
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
    qualification: '',
    specialization: '',
    experience: '',
    licenseNumber: '',
    organization: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [documents, setDocuments] = useState<{
    license: File | null;
    degree: File | null;
    idProof: File | null;
  }>({
    license: null,
    degree: null,
    idProof: null
  });
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
    if (!/^\d{10,15}$/.test(phone)) return 'Phone number must be 10-15 digits';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    // Remove complex password requirements
    // if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    // if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    // if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof documents) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments(prev => ({ ...prev, [type]: file }));
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
    // Remove strict validation - allow submission with minimal data
    const newErrors: Record<string, string> = {};
    
    // Only validate essential fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    
    // Make all other fields optional
    // if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    // if (!formData.flatNo.trim()) newErrors.flatNo = 'Flat/House number is required';
    // if (!formData.street.trim()) newErrors.street = 'Street address is required';
    // if (!formData.district.trim()) newErrors.district = 'District is required';
    // if (!formData.state.trim()) newErrors.state = 'State is required';
    // if (!formData.village.trim()) newErrors.village = 'Village is required';
    // if (!formData.aadhaarNumber.trim()) newErrors.aadhaarNumber = 'Aadhaar number is required';
    // if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    // if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
    // if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    // if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    // if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    
    // Document validation - temporarily optional for testing
    // if (!documents.license) newErrors.license = 'License document is required';
    // if (!documents.degree) newErrors.degree = 'Degree certificate is required';
    // if (!documents.idProof) newErrors.idProof = 'ID proof is required';
    
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
      const { name, email, phone, flatNo, street, district, state, aadhaarNumber, village, qualification, specialization, experience, licenseNumber, organization, password } = formData;
      
      // Create FormData for file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('phone', phone);
      formDataToSend.append('flatNo', flatNo);
      formDataToSend.append('street', street);
      formDataToSend.append('district', district);
      formDataToSend.append('state', state);
      formDataToSend.append('aadhaarNumber', aadhaarNumber);
      formDataToSend.append('village', village);
      formDataToSend.append('qualification', qualification);
      formDataToSend.append('specialization', specialization);
      formDataToSend.append('experience', experience);
      formDataToSend.append('licenseNumber', licenseNumber);
      formDataToSend.append('organization', organization);
      formDataToSend.append('password', password);
      formDataToSend.append('role', 'vet');
      
      if (documents.license) formDataToSend.append('license', documents.license);
      if (documents.degree) formDataToSend.append('degree', documents.degree);
      if (documents.idProof) formDataToSend.append('idProof', documents.idProof);
      
      // Debug: Log what's being sent
      console.log('Form data being sent:', {
        name, email, phone, flatNo, street, district, state, aadhaarNumber, village,
        qualification, specialization, experience, licenseNumber, organization, password
      });
      console.log('Documents:', documents);
      console.log('FormData entries:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      
      await authAPI.registerVet(formDataToSend);
      
      navigate('/login', { state: { success: 'Vet team registration submitted! We will review and approve your application.' } });
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
    return `${baseClasses} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
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
      <div className="max-w-4xl w-full space-y-6 bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900">Veterinary Team Registration</h2>
          </div>
          <p className="text-gray-600">
            Join our expert network to provide professional farm health services
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
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
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
                    placeholder="Phone Number (10-15 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={15}
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
              <Home className="h-5 w-5 mr-2 text-blue-600" />
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

          {/* Professional Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
              Professional Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="qualification"
                  placeholder="Qualification (e.g., BVSc, MVSc)"
                  value={formData.qualification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('qualification')}
                />
                {errors.qualification && touched.qualification && (
                  <p className="mt-1 text-xs text-red-600">{errors.qualification}</p>
                )}
              </div>

              <div>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('specialization')}
                >
                  <option value="">Select Specialization</option>
                  <option value="large-animal">Large Animal Medicine</option>
                  <option value="small-animal">Small Animal Medicine</option>
                  <option value="poultry">Poultry Medicine</option>
                  <option value="surgery">Veterinary Surgery</option>
                  <option value="pathology">Veterinary Pathology</option>
                  <option value="preventive">Preventive Medicine</option>
                  <option value="emergency">Emergency Medicine</option>
                  <option value="other">Other</option>
                </select>
                {errors.specialization && touched.specialization && (
                  <p className="mt-1 text-xs text-red-600">{errors.specialization}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="experience"
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('experience')}
                />
                {errors.experience && touched.experience && (
                  <p className="mt-1 text-xs text-red-600">{errors.experience}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="Veterinary License Number"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('licenseNumber')}
                />
                {errors.licenseNumber && touched.licenseNumber && (
                  <p className="mt-1 text-xs text-red-600">{errors.licenseNumber}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <input
                  type="text"
                  name="organization"
                  placeholder="Current Organization/Hospital"
                  value={formData.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('organization')}
                />
                {errors.organization && touched.organization && (
                  <p className="mt-1 text-xs text-red-600">{errors.organization}</p>
                )}
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-blue-600" />
              Document Verification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Veterinary License
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'license')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.license && (
                  <p className="mt-1 text-xs text-red-600">{errors.license}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree Certificate
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'degree')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.degree && (
                  <p className="mt-1 text-xs text-red-600">{errors.degree}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Proof (Aadhaar/PAN)
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'idProof')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.idProof && (
                  <p className="mt-1 text-xs text-red-600">{errors.idProof}</p>
                )}
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-600">
              Please upload clear, legible copies of your documents. Supported formats: PDF, JPG, JPEG, PNG
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
               Password must contain at least 6 characters.
             </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {isLoading ? 'Submitting Application...' : 'Submit Vet Team Application'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VetSignup;
