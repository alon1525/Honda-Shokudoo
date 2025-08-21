import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-wood-800 mb-12">
            {t('about.title')}
          </h2>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-cream-200">
            <div className="p-8 md:p-12">
              <p className="text-lg leading-relaxed text-wood-700 text-center">
                {t('about.description')}
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-wood-800">Intimate Dining</h3>
                  <p className="text-wood-600 text-sm">
                    Only 17 seats for a personalized experience
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-wood-800">Seasonal Menu</h3>
                  <p className="text-wood-600 text-sm">
                    Fresh ingredients reflecting Japan's seasons
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-wood-800">Master Chef</h3>
                  <p className="text-wood-600 text-sm">
                    European training with Japanese precision
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
