import React from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Clock, Phone } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-center text-primary mb-12">
            {t('contact.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="warm-shadow text-center">
              <div className="p-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-4 text-primary">
                  {t('contact.address')}
                </h3>
                <p className="text-muted-foreground">
                  1-2-3 Ginza<br />
                  Chuo-ku, Tokyo<br />
                  104-0061 Japan
                </p>
              </div>
            </Card>

            <Card className="warm-shadow text-center">
              <div className="p-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-4 text-primary">
                  {t('contact.hours')}
                </h3>
                <div className="text-muted-foreground space-y-1">
                  <p>{t('contact.lunch-hours')}</p>
                  <p>{t('contact.dinner-hours')}</p>
                  <p className="text-sm mt-2 font-medium text-destructive">
                    {t('contact.closed')}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="warm-shadow text-center">
              <div className="p-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-4 text-primary">
                  {t('contact.phone')}
                </h3>
                <p className="text-muted-foreground">
                  +81 3-1234-5678
                </p>
              </div>
            </Card>
          </div>

          {/* Location Map Placeholder */}
          <Card className="warm-shadow mt-12">
            <div className="p-8">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map Location</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};