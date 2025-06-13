import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Globe, Plane } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-sky-500 rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-primary-800">
              {language === 'ar' ? 'طيران الجزيرة' : 'Jazeera Airways'}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/flights" className="text-gray-700 hover:text-primary-600 font-medium">
              {t('nav.flights')}
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-primary-600 font-medium">
              {t('nav.deals')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 animate-slide-up">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/flights"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.flights')}
            </Link>
            <Link
              to="/deals"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.deals')}
            </Link>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}