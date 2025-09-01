import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { Menu, X, Globe } from 'lucide-react';

export const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'menu', label: t('nav.menu') },
    { id: 'about', label: t('nav.about') },
    { id: 'reservations', label: t('nav.reservations') }
  ];

  const NavButton = ({ id, label, className = '' }) => (
    <button
      onClick={() => handleNavigation(id)}
      className={`text-wood-700 hover:text-primary-600 transition-all duration-300 hover:scale-105 ${className}`}
    >
      {label}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="font-serif text-2xl font-bold text-wood-800 cursor-pointer hover:text-primary-600 transition-colors"
            onClick={() => handleNavigation('home')}
          >
            Honda-Shokudo
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <NavButton key={item.id} id={item.id} label={item.label} />
            ))}
            
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-1 px-3 py-2 border border-cream-300 rounded-md hover:bg-cream-50 transition-colors"
            >
              <Globe className="w-4 h-4 text-wood-600" />
              <span className="text-wood-700">{language.toUpperCase()}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleLanguageToggle}
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

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-cream-200">
            <div className="flex flex-col space-y-4">
              {navItems.map(item => (
                <NavButton 
                  key={item.id} 
                  id={item.id} 
                  label={item.label} 
                  className="text-left" 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
