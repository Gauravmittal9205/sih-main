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
    
    // Alerts Page
    'alerts.title': 'Disease Alerts & Outbreaks',
    'alerts.subtitle': 'Stay informed about disease outbreaks in your area and take preventive action to protect your livestock',
    'alerts.get-alerts': 'Get Real-time Alerts',
    'alerts.subscribe-description': 'Subscribe to receive instant notifications about disease outbreaks in your area',
    'alerts.subscribe': 'Subscribe to Alerts',
    'alerts.learn-more': 'Learn More',
    'alerts.list-view': 'List View',
    'alerts.map-view': 'Map View',
    'alerts.about-system': 'About Our Alert System',
    'alerts.real-time': 'Real-time Notifications',
    'alerts.real-time-desc': 'Get instant alerts when disease outbreaks are detected in your area. Our system monitors farms 24/7 and sends notifications within minutes of detection.',
    'alerts.preventive': 'Preventive Measures',
    'alerts.preventive-desc': 'Early warning system helps you take preventive action before diseases spread to your farm. Protect your livestock and livelihood.',
    'alerts.community': 'Community Protection',
    'alerts.community-desc': 'Join thousands of farmers protecting their communities. Our network covers all major farming regions across India.',
    'alerts.how-works': 'How It Works',
    'alerts.detection': 'Detection',
    'alerts.detection-desc': 'AI-powered monitoring detects disease patterns',
    'alerts.verification': 'Verification',
    'alerts.verification-desc': 'Expert veterinarians verify the outbreak',
    'alerts.notification': 'Notification',
    'alerts.notification-desc': 'Instant alerts sent to nearby farmers',
    'alerts.benefits': 'Key Benefits',
    'alerts.early-detection': 'Early disease detection',
    'alerts.reduced-losses': 'Reduced livestock losses',
    'alerts.cost-effective': 'Cost-effective prevention',
    'alerts.expert-guidance': 'Expert guidance included',
    'alerts.free-subscription': 'Free subscription',
    'alerts.success-stories': 'Success Stories',
    'alerts.success-desc': 'Our alert system has helped prevent outbreaks in over 500 farms across India, saving millions in livestock value and protecting farmer livelihoods.',
    'alerts.subscribe-now': 'Subscribe Now',
    'alerts.join-farmers': 'Join thousands of protected farmers today!',
    'alerts.subscribing': 'Subscribing...',
    'alerts.successfully-subscribed': 'Successfully Subscribed!',
    'alerts.success-message': 'You will now receive real-time alerts about disease outbreaks in your area.',
    'alerts.no-active': 'No active alerts',
    'alerts.alert-summary': 'Alert Summary',
    'alerts.farm-alert-map': 'Farm Alert Map',
    'alerts.map-description': 'Interactive map showing farms with disease alerts',
    'alerts.search-placeholder': 'Search farms, owners, locations...',
    'alerts.legend': 'Legend',
    'alerts.owner': 'Owner',
    'alerts.location': 'Location',
    'alerts.alert-type': 'Alert Type',
    'alerts.status': 'Status',
    'alerts.affected-animals': 'Affected Animals',
    'alerts.last-updated': 'Last Updated',
    
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
    'nav.risk-checker': 'जोखिम जांचकर्ता',
    'nav.training': 'प्रशिक्षण',
    'nav.resources': 'संसाधन',
    'nav.alerts': 'सचेतक',
    'nav.compliance': 'अनुपालन',
    'nav.contact': 'संपर्क',
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
    'hero.title': 'स्मार्ट जैव सुरक्षा के साथ अपने खेत की रक्षा करें',
    'hero.subtitle': 'अपने जानवरों को स्वस्थ और अपने व्यवसाय को सुरक्षित रखने के लिए सरल उपकरण',
    'hero.description': 'छोटे किसानों के लिए डिज़ाइन किए गए व्यक्तिगत जोखिम मूल्यांकन, विशेषज्ञ प्रशिक्षण और वास्तविक समय सचेतक प्राप्त करें',
    'feature.risk.title': 'जोखिम मूल्यांकन',
    'feature.risk.desc': 'कमजोरियों की पहचान के लिए 5 मिनट की त्वरित जांच',
    'feature.training.title': 'विशेषज्ञ प्रशिक्षण',
    'feature.training.desc': 'पशु चिकित्सा विशेषज्ञों से सर्वोत्तम प्रथाएं सीखें',
    'feature.alerts.title': 'रोग सचेतक',
    'feature.alerts.desc': 'स्थानीय रोग प्रकोपों पर नवीनतम जानकारी रखें',
    
    // Risk Checker
    'risk.title': 'खेत जोखिम मूल्यांकन',
    'risk.subtitle': 'अपने खेत की जैव सुरक्षा का मूल्यांकन करने के लिए कुछ प्रश्नों का उत्तर दें',
    'risk.location': 'आपका राज्य/क्षेत्र',
    'risk.system': 'उत्पादन प्रणाली',
    'risk.local-risk-high': 'आपके क्षेत्र में उच्च स्थानीय प्रकोप जोखिम',
    'risk.local-risk-medium': 'आपके क्षेत्र में मध्यम स्थानीय प्रकोप जोखिम',
    'risk.local-risk-low': 'आपके क्षेत्र में कम स्थानीय प्रकोप जोखिम',
    'risk.animal-type': 'आप कौन से जानवर पालते हैं?',
    'risk.visitors': 'सप्ताह में कितने आगंतुक आते हैं?',
    'risk.controls': 'क्या आपके पास प्रवेश नियंत्रण हैं?',
    'risk.feed': 'चारा कहाँ से प्राप्त करते हैं?',
    'risk.sick': 'हाल ही में कोई बीमार जानवर?',
    'risk.proximity': 'निकटतम बाजार की दूरी?',
    'risk.low': 'कम जोखिम - अच्छी जैव सुरक्षा प्रथाएं',
    'risk.medium': 'मध्यम जोखिम - कुछ सुधार की आवश्यकता',
    'risk.high': 'उच्च जोखिम - तत्काल कार्रवाई आवश्यक',
    
    // Alerts Page
    'alerts.title': 'रोग सचेतक और प्रकोप',
    'alerts.subtitle': 'अपने क्षेत्र में रोग प्रकोपों के बारे में जानकारी रखें और अपने पशुधन की रक्षा के लिए निवारक कार्रवाई करें',
    'alerts.get-alerts': 'वास्तविक समय सचेतक प्राप्त करें',
    'alerts.subscribe-description': 'अपने क्षेत्र में रोग प्रकोपों के बारे में तत्काल सूचनाएं प्राप्त करने के लिए सदस्यता लें',
    'alerts.subscribe': 'सचेतक के लिए सदस्यता लें',
    'alerts.learn-more': 'और जानें',
    'alerts.list-view': 'सूची दृश्य',
    'alerts.map-view': 'मानचित्र दृश्य',
    'alerts.about-system': 'हमारे सचेतक प्रणाली के बारे में',
    'alerts.real-time': 'वास्तविक समय सूचनाएं',
    'alerts.real-time-desc': 'जब आपके क्षेत्र में रोग प्रकोप का पता चलता है तो तत्काल सचेतक प्राप्त करें। हमारी प्रणाली 24/7 खेतों की निगरानी करती है और पता लगाने के कुछ मिनटों के भीतर सूचनाएं भेजती है।',
    'alerts.preventive': 'निवारक उपाय',
    'alerts.preventive-desc': 'प्रारंभिक चेतावनी प्रणाली आपको रोगों के आपके खेत तक फैलने से पहले निवारक कार्रवाई करने में मदद करती है। अपने पशुधन और आजीविका की रक्षा करें।',
    'alerts.community': 'समुदाय सुरक्षा',
    'alerts.community-desc': 'अपने समुदायों की रक्षा करने वाले हजारों किसानों में शामिल हों। हमारा नेटवर्क भारत के सभी प्रमुख कृषि क्षेत्रों को कवर करता है।',
    'alerts.how-works': 'यह कैसे काम करता है',
    'alerts.detection': 'पता लगाना',
    'alerts.detection-desc': 'एआई-संचालित निगरानी रोग पैटर्न का पता लगाती है',
    'alerts.verification': 'सत्यापन',
    'alerts.verification-desc': 'विशेषज्ञ पशु चिकित्सक प्रकोप की पुष्टि करते हैं',
    'alerts.notification': 'सूचना',
    'alerts.notification-desc': 'निकटवर्ती किसानों को तत्काल सचेतक भेजे जाते हैं',
    'alerts.benefits': 'मुख्य लाभ',
    'alerts.early-detection': 'प्रारंभिक रोग पता लगाना',
    'alerts.reduced-losses': 'पशुधन हानि में कमी',
    'alerts.cost-effective': 'लागत प्रभावी निवारण',
    'alerts.expert-guidance': 'विशेषज्ञ मार्गदर्शन शामिल',
    'alerts.free-subscription': 'निःशुल्क सदस्यता',
    'alerts.success-stories': 'सफलता की कहानियां',
    'alerts.success-desc': 'हमारी सचेतक प्रणाली ने भारत भर के 500 से अधिक खेतों में प्रकोपों को रोकने में मदद की है, पशुधन मूल्य में लाखों बचाए हैं और किसान आजीविका की रक्षा की है।',
    'alerts.subscribe-now': 'अभी सदस्यता लें',
    'alerts.join-farmers': 'आज ही हजारों संरक्षित किसानों में शामिल हों!',
    'alerts.subscribing': 'सदस्यता ले रहे हैं...',
    'alerts.successfully-subscribed': 'सफलतापूर्वक सदस्यता ली गई!',
    'alerts.success-message': 'अब आप अपने क्षेत्र में रोग प्रकोपों के बारे में वास्तविक समय सचेतक प्राप्त करेंगे।',
    'alerts.no-active': 'कोई सक्रिय सचेतक नहीं',
    'alerts.alert-summary': 'सचेतक सारांश',
    'alerts.farm-alert-map': 'खेत सचेतक मानचित्र',
    'alerts.map-description': 'रोग सचेतक वाले खेतों को दिखाने वाला इंटरैक्टिव मानचित्र',
    'alerts.search-placeholder': 'खेत, मालिक, स्थान खोजें...',
    'alerts.legend': 'किंवदंती',
    'alerts.owner': 'मालिक',
    'alerts.location': 'स्थान',
    'alerts.alert-type': 'सचेतक प्रकार',
    'alerts.status': 'स्थिति',
    'alerts.affected-animals': 'प्रभावित पशु',
    'alerts.last-updated': 'अंतिम अपडेट',
    
    // Common
    'btn.next': 'आगे',
    'btn.back': 'पीछे',
    'btn.submit': 'जमा करें',
    'btn.save': 'सहेजें',
    'btn.export': 'पीडीएफ निर्यात',
    'loading': 'लोड हो रहा है...',
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