import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();

  const footerLinks = {
    product: [
      { label: { en: 'Risk Assessment', hi: 'Risk Assessment' }, path: '/risk-checker' },
      { label: { en: 'Training', hi: 'Training' }, path: '/training' },
      { label: { en: 'Alerts', hi: 'Alerts' }, path: '/alerts' },
      { label: { en: 'Compliance', hi: 'Compliance' }, path: '/compliance' }
    ],
    support: [
      { label: { en: 'Help Center', hi: 'Help Center' }, path: '/contact' },
      { label: { en: 'Resources', hi: 'Resources' }, path: '/resources' },
      { label: { en: 'Contact Us', hi: 'Contact Us' }, path: '/contact' },
      { label: { en: 'Emergency', hi: 'Emergency' }, path: '/contact' }
    ],
    legal: [
      { label: { en: 'Privacy Policy', hi: 'Privacy Policy' }, path: '/privacy' },
      { label: { en: 'Terms of Service', hi: 'Terms of Service' }, path: '/terms' },
      { label: { en: 'Data Protection', hi: 'Data Protection' }, path: '/data-protection' },
      { label: { en: 'Disclaimer', hi: 'Disclaimer' }, path: '/disclaimer' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-teal-500 to-blue-500 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">Farm Health Guardian</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {language === 'en' 
                ? 'Empowering farmers with smart biosecurity tools to protect livestock and ensure sustainable farming.'
                : 'Smart biosecurity tools ke saath farmers ko empower karna livestock protect karne aur sustainable farming ensure karne ke liye.'
              }
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                1800-123-FARM
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                support@farmhealthguardian.in
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Product' : 'Product'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-teal-400 transition-colors text-sm"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Support' : 'Support'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-teal-400 transition-colors text-sm"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Legal' : 'Legal'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-teal-400 transition-colors text-sm"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Farm Health Guardian. {language === 'en' ? 'All rights reserved.' : 'Saare rights reserved hain.'}
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>
                {language === 'en' ? 'Made for Indian farmers' : 'Indian farmers ke liye banaya gaya'}
              </span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                India
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;