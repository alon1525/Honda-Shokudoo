-- Create enum for seating areas
CREATE TYPE public.seating_area AS ENUM ('bar', 'table_1', 'table_2');

-- Create enum for meal types
CREATE TYPE public.meal_type AS ENUM ('lunch', 'dinner');

-- Create reservations table
CREATE TABLE public.reservations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    seating_area seating_area NOT NULL,
    meal_type meal_type NOT NULL,
    reservation_date DATE NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size > 0 AND party_size <= 6),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no login required)
CREATE POLICY "Anyone can view reservations" 
ON public.reservations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create reservations" 
ON public.reservations 
FOR INSERT 
WITH CHECK (true);