import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'nav.risk-checker': 'Risk Checker',
    'nav.training': 'Training',
    'nav.resources': 'Resources',
    'nav.alerts': 'Alerts',
    'nav.compliance': 'Compliance',
    'nav.contact': 'Contact',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Logout',
    'auth.profile': 'Profile',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.address': 'Address',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot your password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.createAccount': 'Create an account',
    'auth.registrationSuccess': 'Registration successful! Please login to continue.',
    'auth.passwordsDontMatch': 'Passwords do not match',
    'auth.invalidCredentials': 'Invalid email or password',
    'cta.check-risk': 'Login / Sign Up',
    
    // Home page
    'hero.title': 'Protect Your Farm with Smart Biosecurity',
    'hero.subtitle': 'Simple tools to keep your animals healthy and your business safe',
    'hero.description': 'Get personalized risk assessments, expert training, and real-time alerts designed for small farmers',
    'feature.risk.title': 'Risk Assessment',
    'feature.risk.desc': 'Quick 5-minute check to identify vulnerabilities',
    'feature.training.title': 'Expert Training',
    'feature.training.desc': 'Learn best practices from veterinary experts',
    'feature.alerts.title': 'Disease Alerts',
    'feature.alerts.desc': 'Stay updated on local disease outbreaks',
    
    // Risk Checker
    'risk.title': 'Farm Risk Assessment',
    'risk.subtitle': 'Answer a few questions to assess your farm\'s biosecurity',
    'risk.location': 'Your State/Region',
    'risk.system': 'Production System',
    'risk.local-risk-high': 'High local outbreak risk in your area',
    'risk.local-risk-medium': 'Medium local outbreak risk in your area',
    'risk.local-risk-low': 'Low local outbreak risk in your area',
    'risk.animal-type': 'What animals do you raise?',
    'risk.visitors': 'How many visitors per week?',
    'risk.controls': 'Do you have entry controls?',
    'risk.feed': 'Where do you source feed?',
    'risk.sick': 'Any sick animals recently?',
    'risk.proximity': 'Distance to nearest market?',
    'risk.low': 'Low Risk - Good biosecurity practices',
    'risk.medium': 'Medium Risk - Some improvements needed',
    'risk.high': 'High Risk - Immediate action required',
    
    // Common
    'btn.next': 'Next',
    'btn.back': 'Back',
    'btn.submit': 'Submit',
    'btn.save': 'Save',
    'btn.export': 'Export PDF',
    'loading': 'Loading...',
  },
  hi: {
    // Header
    'nav.risk-checker': 'Risk Checker',
    'nav.training': 'Training',
    'nav.resources': 'Resources',
    'nav.alerts': 'Alerts',
    'nav.compliance': 'Compliance',
    'nav.contact': 'Contact',
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.logout': 'लॉग आउट',
    'auth.profile': 'प्रोफाइल',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.fullName': 'पूरा नाम',
    'auth.phone': 'फोन नंबर',
    'auth.address': 'पता',
    'auth.rememberMe': 'मुझे याद रखें',
    'auth.forgotPassword': 'क्या आप अपना पासवर्ड भूल गए?',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.alreadyHaveAccount': 'क्या आपके पास पहले से एक खाता मौजूद है?',
    'auth.createAccount': 'खाता बनाएं',
    'auth.registrationSuccess': 'पंजीकरण सफल! जारी रखने के लिए कृपया लॉगिन करें।',
    'auth.passwordsDontMatch': 'पासवर्ड मेल नहीं खाते',
    'auth.invalidCredentials': 'अमान्य ईमेल या पासवर्ड',
    'cta.check-risk': 'लॉगिन / साइन अप',
    
    // Home page
    'hero.title': 'Smart Biosecurity ke saath Farm ko Bachayein',
    'hero.subtitle': 'Aapke jaanwaron ko healthy aur business ko safe rakhne ke liye simple tools',
    'hero.description': 'Personal risk assessment, expert training, aur real-time alerts - small farmers ke liye design kiya gaya',
    'feature.risk.title': 'Risk Assessment',
    'feature.risk.desc': '5 minute mein farm ki kamjoriyaan pata karein',
    'feature.training.title': 'Expert Training',
    'feature.training.desc': 'Veterinary experts se best practices sikhein',
    'feature.alerts.title': 'Disease Alerts',
    'feature.alerts.desc': 'Local disease outbreaks ki updates rahein',
    
    // Risk Checker
    'risk.title': 'Farm Risk Assessment',
    'risk.subtitle': 'Kuch sawalon ka jawab dekar apne farm ki biosecurity check karein',
    'risk.location': 'Aapka Rajya/Shetra',
    'risk.system': 'Utpadan Pranali',
    'risk.local-risk-high': 'Aapke kshetra mein uchch star ka outbreak risk',
    'risk.local-risk-medium': 'Aapke kshetra mein madhyam star ka outbreak risk',
    'risk.local-risk-low': 'Aapke kshetra mein kam outbreak risk',
    'risk.animal-type': 'Aap kaun se jaanwar paaltē hain?',
    'risk.visitors': 'Hafte mein kitne visitors aate hain?',
    'risk.controls': 'Kya aapke paas entry controls hain?',
    'risk.feed': 'Feed kahan se laate hain?',
    'risk.sick': 'Haal mein koi bimar jaanwar?',
    'risk.proximity': 'Sabse nazdeeki market ki doori?',
    'risk.low': 'Low Risk - Achhi biosecurity practices',
    'risk.medium': 'Medium Risk - Kuch sudhar ki zaroorat',
    'risk.high': 'High Risk - Turant action zaroori',
    
    // Common
    'btn.next': 'Aage',
    'btn.back': 'Peeche',
    'btn.submit': 'Submit',
    'btn.save': 'Save',
    'btn.export': 'PDF Export',
    'loading': 'Load ho raha hai...',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};