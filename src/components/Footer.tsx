import React from 'react';
import { Plane, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-sky-400 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold">
                {language === 'ar' ? 'طيران الجزيرة' : 'Jazeera Airways'}
              </div>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed">
              {language === 'ar' 
                ? 'رحلات آمنة ومريحة إلى أكثر من 50 وجهة حول العالم مع خدمة عملاء متميزة.'
                : 'Safe and comfortable flights to over 50 destinations worldwide with exceptional customer service.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-primary-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'الوجهات' : 'Destinations'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'العروض الخاصة' : 'Special Offers'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'برنامج الولاء' : 'Loyalty Program'}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === 'ar' ? 'خدمة العملاء' : 'Customer Support'}
            </h3>
            <ul className="space-y-2 text-primary-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'سياسة الأمتعة' : 'Baggage Policy'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'إلغاء وتعديل الحجز' : 'Cancel & Modify'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
            </h3>
            <div className="space-y-3 text-primary-200">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+965 177 1111</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">info@jazeeraairways.com</span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  {language === 'ar' 
                    ? 'مطار الكويت الدولي، الكويت'
                    : 'Kuwait International Airport, Kuwait'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-300 text-sm">
              © 2024 Jazeera Airways. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse text-sm">
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}