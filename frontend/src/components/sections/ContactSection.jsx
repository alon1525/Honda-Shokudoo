import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { MapPin, Clock, Phone } from 'lucide-react';

export const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-wood-800 mb-12">
            {t('contact.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg text-center border border-cream-200 hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-4 text-wood-800">
                  {t('contact.address')}
                </h3>
                <p className="text-wood-600">
                  〒393-0056 Japan Nagano<br />
                  Suwa District, Shimosuwa<br />
                  広瀬町5382
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg text-center border border-cream-200 hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-4 text-wood-800">
                  {t('contact.hours')}
                </h3>
                <div className="text-wood-600 space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Tuesday – Saturday:</span><br />
                    <span className="text-japanese-600">11:30–14:00, 18:00–22:00</span>
                  </div>
                  <div>
                    <span className="font-medium text-japanese-600">Sunday-Monday: Closed</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-lg shadow-lg text-center border border-cream-200 hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-4 text-wood-800">
                  {t('contact.phone')}
                </h3>
                <p className="text-wood-600">
                  +81 8087296671
                </p>
              </div>
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="bg-white rounded-lg shadow-lg mt-12 border border-cream-200">
            <div className="p-8">
              <div className="aspect-video bg-cream-100 rounded-lg flex items-center justify-center border border-cream-200">
                <div className="text-center">
                  <p className="text-wood-500 mb-2">Map Location</p>
                  <p className="text-sm text-wood-400">〒393-0056 Japan Nagano</p>
                  <p className="text-sm text-wood-400">Suwa District, Shimosuwa</p>
                  <p className="text-sm text-wood-400">広瀬町5382</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
