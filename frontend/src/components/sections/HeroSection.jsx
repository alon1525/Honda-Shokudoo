import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-gradient-to-br from-cream-50 via-wood-50 to-primary-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-japanese-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-wood-400/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-wood-800 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-wood-600 mb-8 font-medium">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-wood-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('reservations')}
              className="px-8 py-6 text-lg bg-primary-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all duration-300 hover:scale-105"
            >
              {t('hero.reserve')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="px-8 py-6 text-lg border-2 border-wood-600 text-wood-700 rounded-lg hover:bg-wood-50 transition-all duration-300 hover:scale-105"
            >
              {t('hero.view-menu')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
