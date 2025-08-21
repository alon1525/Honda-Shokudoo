import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { Menu, X, Globe } from 'lucide-react';

export const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="font-serif text-2xl font-bold text-wood-800 cursor-pointer hover:text-primary-600 transition-colors"
            onClick={() => scrollToSection('home')}
          >
            Honda-Shokudo
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-wood-700 hover:text-primary-600 transition-all duration-300 hover:scale-105"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-wood-700 hover:text-primary-600 transition-all duration-300 hover:scale-105"
            >
              {t('nav.menu')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-wood-700 hover:text-primary-600 transition-all duration-300 hover:scale-105"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('reservations')}
              className="text-wood-700 hover:text-primary-600 transition-all duration-300 hover:scale-105"
            >
              {t('nav.reservations')}
            </button>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 border border-cream-300 rounded-md hover:bg-cream-50 transition-colors"
            >
              <Globe className="w-4 h-4 text-wood-600" />
              <span className="text-wood-700">{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 border border-cream-300 rounded-md hover:bg-cream-50 transition-colors"
            >
              <Globe className="w-4 h-4 text-wood-600" />
              <span className="text-wood-700">{language.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-cream-100 rounded-md transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-wood-600" /> : <Menu className="w-5 h-5 text-wood-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-cream-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-wood-700 hover:text-primary-600 transition-colors"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left text-wood-700 hover:text-primary-600 transition-colors"
              >
                {t('nav.menu')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-wood-700 hover:text-primary-600 transition-colors"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection('reservations')}
                className="text-left text-wood-700 hover:text-primary-600 transition-colors"
              >
                {t('nav.reservations')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
