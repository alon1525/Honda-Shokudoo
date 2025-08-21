import React from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-paper-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-center text-primary mb-12">
            {t('about.title')}
          </h2>
          
          <Card className="warm-shadow bg-card/80 backdrop-blur-sm">
            <div className="p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground/90 text-center">
                {t('about.description')}
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">Intimate Dining</h3>
                  <p className="text-muted-foreground text-sm">
                    Only 17 seats for a personalized experience
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">Seasonal Menu</h3>
                  <p className="text-muted-foreground text-sm">
                    Fresh ingredients reflecting Japan's seasons
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">Master Chef</h3>
                  <p className="text-muted-foreground text-sm">
                    European training with Japanese precision
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};