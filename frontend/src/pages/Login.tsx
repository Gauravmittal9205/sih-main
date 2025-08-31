import { Loader2, Lock, Mail, User, Shield } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import farmBg from '../assets/farm-bg.jpg'; // ✅ Import from src/assets
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { authAPI } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'farmer' | 'vet'>('farmer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login } = useAuth();

  const from = (location.state as any)?.from || '/farmer';

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t('auth.enterEmailPassword') || 'Please enter email and password');
      return;
    }

    setIsLoading(true);

    try {
      const userData = await authAPI.login({ email, password });
      
      // Check if user type matches selected type
      if (userData.user.role !== userType) {
        setError(`This account is registered as a ${userData.user.role}, not a ${userType}. Please select the correct user type.`);
        setIsLoading(false);
        return;
      }

      // Remove approval check - allow vets to login directly
      // if (userType === 'vet' && !userData.user.isApproved) {
      //   setError('Your vet application is still under review. Please wait for approval before logging in.');
      //   setIsLoading(false);
      //   return;
      // }

      login(userData);
      
      // Navigate based on user type
      const redirectPath = userType === 'farmer' ? '/farmer' : '/vet';
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        t('auth.loginFailed') ||
        'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${farmBg})`, // ✅ Use imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.login')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
              {t('auth.signup')}
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* User Type Selection - Simplified */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 text-center">
              Login As
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('farmer')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  userType === 'farmer'
                    ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-lg'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-teal-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    userType === 'farmer' ? 'bg-teal-100' : 'bg-gray-100'
                  }`}>
                    <User className={`h-6 w-6 ${userType === 'farmer' ? 'text-teal-600' : 'text-gray-400'}`} />
                  </div>
                  <span className="text-sm font-semibold">Farmer</span>
                  <span className="text-xs text-gray-500 text-center">Main Login</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('vet')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  userType === 'vet'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-blue-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    userType === 'vet' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Shield className={`h-6 w-6 ${userType === 'vet' ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <span className="text-sm font-semibold">Vet Team</span>
                  <span className="text-xs text-gray-500 text-center">Veterinary Staff</span>
                </div>
              </button>
            </div>
          </div>

          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                placeholder={t('auth.email')}
                className="block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                placeholder={t('auth.password')}
                className="block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
              <span className="ml-2 text-gray-900">{t('auth.rememberMe')}</span>
            </label>
            <Link className="text-sm font-medium text-teal-600 hover:text-teal-500" to="/forgot-password">
              {t('auth.forgotPassword')}?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white ${
              isLoading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                {t('auth.loggingIn') || 'Logging in...'}
              </>
            ) : (
              `Login as ${userType === 'farmer' ? 'Farmer' : 'Vet Team'}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
