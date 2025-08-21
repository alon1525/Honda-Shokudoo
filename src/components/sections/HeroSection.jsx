import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-paper-cream">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-elegant text-6xl md:text-8xl font-bold text-primary mb-4">
            {t('hero.title')}
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
            {t('hero.subtitle')}
          </h2>
          <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-4 text-lg"
              onClick={() => scrollToSection('reservations')}
            >
              {t('hero.reserve')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg"
              onClick={() => scrollToSection('menu')}
            >
              {t('hero.view-menu')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};