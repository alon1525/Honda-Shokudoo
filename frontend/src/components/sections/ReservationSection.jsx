import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export const ReservationSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    mealType: '',
    partySize: '',
    seatingArea: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [availableSeating, setAvailableSeating] = useState({});
  const [formStep, setFormStep] = useState(1); // 1: basic info, 2: party size, 3: seating
  const [loading, setLoading] = useState(false);

  // Get backend URL from environment or use localhost for development
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  // Check availability when date or meal type changes
  useEffect(() => {
    if (form.date && form.mealType) {
      checkAvailability();
      setFormStep(2);
    }
  }, [form.date, form.mealType]);

  // Check availability when party size changes
  useEffect(() => {
    if (form.partySize) {
      setFormStep(3);
    }
  }, [form.partySize]);

  const checkAvailability = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/reservations/availability/${form.date}/${form.mealType}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableSeating(data.availability);
      } else {
        setMessage('Failed to check availability');
        setAvailableSeating({});
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setMessage('Failed to check availability');
      setAvailableSeating({});
    } finally {
      setLoading(false);
    }
  };

  const getAvailablePartySizes = () => {
    const sizes = [];
    const maxTotalSeats = Object.values(availableSeating).reduce((sum, area) => sum + area.remainingSeats, 0);
    
    // Add party sizes based on available seating
    for (let i = 1; i <= Math.min(6, maxTotalSeats); i++) {
      sizes.push(i);
    }
    
    return sizes;
  };

  const getAvailableSeatingOptions = () => {
    if (!form.partySize) return [];

    const options = [];
    Object.entries(availableSeating).forEach(([area, data]) => {
      if (data.available && data.remainingSeats >= form.partySize) {
        const areaName = area === 'bar' ? 'Bar (5 seats)' : 
                        area === 'table_1' ? 'Table 1 (6 seats)' : 'Table 2 (6 seats)';
        options.push({
          value: area,
          label: areaName,
          remainingSeats: data.remainingSeats
        });
      }
    });

    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.phone || !form.date || !form.mealType || !form.partySize || !form.seatingArea) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: form.name,
          phoneNumber: form.phone,
          seatingArea: form.seatingArea,
          mealType: form.mealType,
          reservationDate: form.date,
          partySize: form.partySize
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage(t('reservations.success'));

        // Reset form
        setForm({
          name: '',
          phone: '',
          date: '',
          mealType: '',
          partySize: '',
          seatingArea: ''
        });
        setFormStep(1);
        setAvailableSeating({});
      } else {
        setMessage(data.error || t('reservations.error'));
      }

    } catch (error) {
      console.error('Reservation error:', error);
      setMessage(t('reservations.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservations" className="py-20 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-wood-800 mb-8">
            {t('reservations.title')}
          </h2>
          
          <p className="text-center text-wood-600 mb-12">
            {t('reservations.description')}
          </p>

          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${formStep >= 1 ? 'bg-primary-600' : 'bg-cream-300'}`}></div>
              <div className={`w-3 h-3 rounded-full ${formStep >= 2 ? 'bg-primary-600' : 'bg-cream-300'}`}></div>
              <div className={`w-3 h-3 rounded-full ${formStep >= 3 ? 'bg-primary-600' : 'bg-cream-300'}`}></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-cream-200">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Step 1: Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-wood-700 mb-2">
                    {t('reservations.name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-cream-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-wood-700 mb-2">
                    {t('reservations.phone')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-cream-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-wood-700 mb-2">
                    {t('reservations.date')}
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value, partySize: '', seatingArea: '' }))}
                    required
                    className="w-full px-3 py-2 border border-cream-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-wood-700 mb-2">
                    {t('reservations.meal')}
                  </label>
                  <select
                    value={form.mealType}
                    onChange={(e) => setForm(prev => ({ ...prev, mealType: e.target.value, partySize: '', seatingArea: '' }))}
                    className="w-full px-3 py-2 border border-cream-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select meal type</option>
                    <option value="lunch">{t('reservations.lunch')}</option>
                    <option value="dinner">{t('reservations.dinner')}</option>
                  </select>
                </div>
              </div>

              {/* Step 2: Party Size (only shown after date and meal selected) */}
              {formStep >= 2 && (
                <div>
                  <label htmlFor="partySize" className="block text-sm font-medium text-wood-700 mb-2">
                    {t('reservations.party-size')}
                  </label>
                  <select
                    value={form.partySize}
                    onChange={(e) => setForm(prev => ({ ...prev, partySize: parseInt(e.target.value), seatingArea: '' }))}
                    className="w-full px-3 py-2 border border-cream-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    disabled={loading}
                  >
                    <option value="">{loading ? 'Checking availability...' : 'Select party size'}</option>
                    {!loading && getAvailablePartySizes().map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                  
                  {/* Availability info */}
                  {!loading && Object.keys(availableSeating).length > 0 && (
                    <div className="mt-2 text-sm text-wood-600">
                      <p>Available seating for {form.mealType} on {form.date}:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {Object.entries(availableSeating).map(([area, data]) => (
                          <span key={area} className="px-2 py-1 bg-cream-100 rounded text-xs">
                            {data.name}: {data.remainingSeats} seats
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Seating Selection (only shown after party size selected) */}
              {formStep >= 3 && (
                <div>
                  <label className="block text-sm font-medium text-wood-700 mb-2">
                    {t('reservations.seating')}
                  </label>
                  <select
                    value={form.seatingArea}
                    onChange={(e) => setForm(prev => ({ ...prev, seatingArea: e.target.value }))}
                    className="w-full px-3 py-2 border border-cream-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select seating area</option>
                    {getAvailableSeatingOptions().map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} ({option.remainingSeats} seats available)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {message && (
                <div className={`p-4 rounded-md ${
                  message.includes('Success') || message.includes('confirmed') 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-green-200'
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-6 text-lg bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 hover:shadow-lg"
                disabled={isSubmitting || formStep < 3}
              >
                {isSubmitting ? t('common.loading') : t('reservations.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
