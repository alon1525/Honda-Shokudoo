import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border warm-shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="font-elegant text-2xl font-bold text-primary cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            Honda-Shokudo
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 story-link"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 story-link"
            >
              {t('nav.menu')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 story-link"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('reservations')}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 story-link"
            >
              {t('nav.reservations')}
            </button>
            
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t('nav.menu')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection('reservations')}
                className="text-left text-foreground hover:text-primary transition-colors"
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