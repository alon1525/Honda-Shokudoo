import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const ReservationSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    mealType: '',
    partySize: 1,
    seatingArea: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState({});

  // Check availability when date or meal type changes
  useEffect(() => {
    if (form.date && form.mealType) {
      checkAvailability();
    }
  }, [form.date, form.mealType]);

  const checkAvailability = async () => {
    try {
      const { data: reservations, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('reservation_date', form.date)
        .eq('meal_type', form.mealType);

      if (error) throw error;

      const barReserved = reservations?.some(r => r.seating_area === 'bar') || false;
      const table1Reserved = reservations?.some(r => r.seating_area === 'table_1') || false;
      const table2Reserved = reservations?.some(r => r.seating_area === 'table_2') || false;

      setAvailability({
        barAvailable: !barReserved,
        tablesAvailable: !(table1Reserved && table2Reserved),
        anyTableAvailable: !table1Reserved || !table2Reserved
      });
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const checkPhoneExists = async () => {
    try {
      const { data: existingReservations, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('phone_number', form.phone)
        .eq('reservation_date', form.date);

      if (error) throw error;

      return existingReservations && existingReservations.length > 0;
    } catch (error) {
      console.error('Error checking phone:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.phone || !form.date || !form.mealType || !form.seatingArea) {
      toast({
        title: t('common.error'),
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if phone number already has a reservation on this date
      const phoneExists = await checkPhoneExists();
      if (phoneExists) {
        toast({
          title: t('common.error'),
          description: t('reservations.phone-exists'),
          variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
      }

      // Validate party size and seating logic
      if (form.partySize <= 2 && form.seatingArea !== 'bar') {
        toast({
          title: t('common.error'),
          description: 'For 1-2 people, you must choose the bar.',
          variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
      }

      if (form.partySize >= 3 && form.seatingArea === 'bar') {
        toast({
          title: t('common.error'),
          description: 'For 3+ people, you must choose a table.',
          variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
      }

      // Check final availability
      const { data: existingReservations, error: checkError } = await supabase
        .from('reservations')
        .select('*')
        .eq('seating_area', form.seatingArea)
        .eq('meal_type', form.mealType)
        .eq('reservation_date', form.date);

      if (checkError) throw checkError;

      if (existingReservations && existingReservations.length > 0) {
        toast({
          title: t('common.error'),
          description: t('reservations.unavailable'),
          variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
      }

      // Create the reservation
      const { error } = await supabase
        .from('reservations')
        .insert({
          customer_name: form.name,
          phone_number: form.phone,
          seating_area: form.seatingArea,
          meal_type: form.mealType,
          reservation_date: form.date,
          party_size: form.partySize
        });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: t('reservations.success')
      });

      // Reset form
      setForm({
        name: '',
        phone: '',
        date: '',
        mealType: '',
        partySize: 1,
        seatingArea: ''
      });

    } catch (error) {
      console.error('Reservation error:', error);
      toast({
        title: t('common.error'),
        description: t('reservations.error'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const getSeatingOptions = () => {
    const options = [];
    
    if (form.partySize <= 2) {
      // 1-2 people: only bar
      if (availability.barAvailable) {
        options.push({ value: 'bar', label: t('reservations.bar') });
      }
    } else {
      // 3+ people: only tables
      if (availability.anyTableAvailable) {
        options.push({ value: 'table_1', label: `${t('reservations.table')} 1` });
        options.push({ value: 'table_2', label: `${t('reservations.table')} 2` });
      }
    }
    
    return options;
  };

  const seatingOptions = getSeatingOptions();

  return (
    <section id="reservations" className="py-20 bg-paper-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-center text-primary mb-8">
            {t('reservations.title')}
          </h2>
          
          <p className="text-center text-muted-foreground mb-12">
            {t('reservations.description')}
          </p>

          <Card className="warm-shadow">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">{t('reservations.name')}</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">{t('reservations.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date">{t('reservations.date')}</Label>
                  <Input
                    id="date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value, seatingArea: '' }))}
                    required
                  />
                </div>
                
                <div>
                  <Label>{t('reservations.meal')}</Label>
                  <Select
                    value={form.mealType}
                    onValueChange={(value) => 
                      setForm(prev => ({ ...prev, mealType: value, seatingArea: '' }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lunch">{t('reservations.lunch')}</SelectItem>
                      <SelectItem value="dinner">{t('reservations.dinner')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="partySize">{t('reservations.party-size')}</Label>
                  <Select
                    value={form.partySize.toString()}
                    onValueChange={(value) => 
                      setForm(prev => ({ ...prev, partySize: parseInt(value), seatingArea: '' }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{t('reservations.seating')}</Label>
                  <Select
                    value={form.seatingArea}
                    onValueChange={(value) => 
                      setForm(prev => ({ ...prev, seatingArea: value }))
                    }
                    disabled={!form.date || !form.mealType || seatingOptions.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={seatingOptions.length === 0 ? t('reservations.unavailable') : undefined} />
                    </SelectTrigger>
                    <SelectContent>
                      {seatingOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg"
                disabled={isSubmitting || seatingOptions.length === 0}
              >
                {isSubmitting ? t('common.loading') : t('reservations.submit')}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};