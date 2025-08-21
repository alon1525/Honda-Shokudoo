import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const GallerySection = () => {
  const { t } = useLanguage();

  // Restaurant food gallery images
  const galleryImages = [
    {
      src: '/lovable-uploads/e90271af-7522-4d00-b59a-881794d8d110.png',
      alt: 'Chocolate dessert with cream and berry sauce',
      title: 'Signature Dessert'
    },
    {
      src: '/lovable-uploads/6c6c2b22-0c1c-4376-8aae-01500fc8a378.png',
      alt: 'Grilled beef with seasonal vegetables',
      title: 'Premium Beef'
    },
    {
      src: '/lovable-uploads/f0151ae5-2b67-45e5-beb2-4d89a7c31e69.png',
      alt: 'Fresh sashimi with colorful garnishes',
      title: 'Seasonal Sashimi'
    },
    {
      src: '/lovable-uploads/c2c6d14d-0378-4db7-ad72-20a893778718.png',
      alt: 'Creamy risotto with vegetables and pancetta',
      title: 'Vegetable Risotto'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-paper-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-center text-primary mb-12 animate-fade-in">
            {t('gallery.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="group cursor-pointer animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden rounded-lg warm-shadow hover:shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:shadow-warm-gold/20">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
                <p className="text-center mt-3 text-foreground font-medium transition-colors group-hover:text-primary">
                  {image.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};