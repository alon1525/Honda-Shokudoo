-- Create reservations table for Honda Shokudo restaurant
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    seating_area VARCHAR(50) NOT NULL,
    meal_type VARCHAR(20) NOT NULL,
    reservation_date DATE NOT NULL,
    party_size INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reservations_date_meal ON reservations(reservation_date, meal_type);
CREATE INDEX IF NOT EXISTS idx_reservations_seating_area ON reservations(seating_area);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_reservations_updated_at 
    BEFORE UPDATE ON reservations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO reservations (customer_name, phone_number, seating_area, meal_type, reservation_date, party_size) VALUES
('John Doe', '+1234567890', 'bar', 'lunch', '2025-01-20', 2),
('Jane Smith', '+0987654321', 'table_1', 'dinner', '2025-01-20', 4)
ON CONFLICT DO NOTHING;
