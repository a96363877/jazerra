import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (language: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.flights': 'Flights',
    'nav.deals': 'Deals',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Home page
    'home.title': 'Find Your Perfect Flight',
    'home.subtitle': 'Book flights to over 50 destinations worldwide',
    'search.from': 'From',
    'search.to': 'To',
    'search.departure': 'Departure Date',
    'search.return': 'Return Date',
    'search.passengers': 'Passengers',
    'search.class': 'Class',
    'search.button': 'Search Flights',
    'search.oneway': 'One Way',
    'search.roundtrip': 'Round Trip',
    
    // Classes
    'class.economy': 'Economy',
    'class.business': 'Business',
    'class.first': 'First Class',
    
    // Common
    'common.loading': 'Loading...',
    'common.book': 'Book Now',
    'common.from': 'From',
    'common.to': 'To',
    'common.departure': 'Departure',
    'common.arrival': 'Arrival',
    'common.duration': 'Duration',
    'common.price': 'Price',
    'common.adult': 'Adult',
    'common.child': 'Child',
    'common.infant': 'Infant',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.full_name': 'Full Name',
    'auth.phone': 'Phone Number',
    
    // Footer
    'footer.about': 'About Jazeera Airways',
    'footer.contact': 'Contact Us',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.flights': 'الرحلات',
    'nav.deals': 'العروض',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    
    // Home page
    'home.title': 'اعثر على رحلتك المثالية',
    'home.subtitle': 'احجز رحلات إلى أكثر من 50 وجهة حول العالم',
    'search.from': 'من',
    'search.to': 'إلى',
    'search.departure': 'تاريخ المغادرة',
    'search.return': 'تاريخ العودة',
    'search.passengers': 'المسافرون',
    'search.class': 'الدرجة',
    'search.button': 'البحث عن رحلات',
    'search.oneway': 'ذهاب فقط',
    'search.roundtrip': 'ذهاب وإياب',
    
    // Classes
    'class.economy': 'الاقتصادية',
    'class.business': 'رجال الأعمال',
    'class.first': 'الدرجة الأولى',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.book': 'احجز الآن',
    'common.from': 'من',
    'common.to': 'إلى',
    'common.departure': 'المغادرة',
    'common.arrival': 'الوصول',
    'common.duration': 'المدة',
    'common.price': 'السعر',
    'common.adult': 'بالغ',
    'common.child': 'طفل',
    'common.infant': 'رضيع',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirm_password': 'تأكيد كلمة المرور',
    'auth.full_name': 'الاسم الكامل',
    'auth.phone': 'رقم الهاتف',
    
    // Footer
    'footer.about': 'حول طيران الجزيرة',
    'footer.contact': 'اتصل بنا',
    'footer.terms': 'الشروط والأحكام',
    'footer.privacy': 'سياسة الخصوصية',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl font-arabic' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}