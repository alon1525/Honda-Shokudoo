import React from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Clock } from 'lucide-react';

export const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-center text-primary mb-12">
            {t('contact.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="warm-shadow p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('contact.address')}</h3>
                    <p className="text-muted-foreground">
                      יפן, 〒393-0056 Nagano, Suwa District,<br />
                      Shimosuwa, 広瀬町5382
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('contact.phone')}</h3>
                    <p className="text-muted-foreground">
                      +81 80 8729 6671
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Opening Hours */}
            <Card className="warm-shadow p-8">
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div className="w-full">
                  <h3 className="font-semibold text-lg mb-4">{t('contact.hours')}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>{t('contact.friday')}</p>
                    <p>{t('contact.saturday')}</p>
                    <p>{t('contact.sunday')}</p>
                    <p>{t('contact.monday')}</p>
                    <p>{t('contact.tuesday')}</p>
                    <p>{t('contact.wednesday')}</p>
                    <p>{t('contact.thursday')}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};