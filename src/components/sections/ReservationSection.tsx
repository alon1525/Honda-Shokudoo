import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReservationForm {
  name: string;
  phone: string;
  date: string;
  mealType: 'lunch' | 'dinner' | '';
  partySize: number;
  seatingArea: 'bar' | 'table_1' | 'table_2' | '';
}

export const ReservationSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState<ReservationForm>({
    name: '',
    phone: '',
    date: '',
    mealType: '',
    partySize: 1,
    seatingArea: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.phone || !form.date || !form.mealType || !form.seatingArea) {
      toast({
        title: t('common.error'),
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    // Validate party size based on seating area
    const maxSeats = form.seatingArea === 'bar' ? 5 : 6;
    if (form.partySize > maxSeats) {
      toast({
        title: t('common.error'),
        description: `Maximum ${maxSeats} people for ${form.seatingArea === 'bar' ? 'bar' : 'table'}.`,
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if the seating area is already reserved for the same date and meal
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
          description: 'This seating area is already reserved for the selected date and meal.',
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
                    onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label>{t('reservations.meal')}</Label>
                  <Select
                    value={form.mealType}
                    onValueChange={(value: 'lunch' | 'dinner') => 
                      setForm(prev => ({ ...prev, mealType: value }))
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
                      setForm(prev => ({ ...prev, partySize: parseInt(value) }))
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
                    onValueChange={(value: 'bar' | 'table_1' | 'table_2') => 
                      setForm(prev => ({ ...prev, seatingArea: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">{t('reservations.bar')}</SelectItem>
                      <SelectItem value="table_1">{t('reservations.table1')}</SelectItem>
                      <SelectItem value="table_2">{t('reservations.table2')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg"
                disabled={isSubmitting}
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