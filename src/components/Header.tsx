import { Globe, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { path: '/risk-checker', label: t('nav.risk-checker') },
    { path: '/training', label: t('nav.training') },
    { path: '/resources', label: t('nav.resources') },
    { path: '/alerts', label: t('nav.alerts') },
    { path: '/compliance', label: t('nav.compliance') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
  <img
    src={logo}
    alt="Farm Rakshaa Logo"
    className="h-10 w-auto group-hover:scale-105 transition-transform"
  />
  <span className="font-bold text-xl text-gray-800">
    Farm Rakshaa
  </span>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                  isActive(item.path)
                    ? 'text-teal-600 border-b-2 border-teal-600 pb-1'
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-teal-600 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'हिं' : 'EN'}</span>
            </button>
            {isAuthenticated ? (
              <Link
                to="/farmer"
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <User className="h-4 w-4" />
                <span>{user?.name || 'Farmer'}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                {t('auth.login')} / {t('auth.signup')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-teal-600 bg-teal-50 rounded-lg'
                      : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-4 pt-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-teal-600"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
                {isAuthenticated ? (
                  <Link
                    to="/farmer"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.name || 'Farmer'}</span>
                  </Link>
                ) : (
                  <Link
                    to="/risk-checker"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {t('cta.check-risk')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;