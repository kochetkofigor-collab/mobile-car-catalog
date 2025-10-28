-- Create landlords table
CREATE TABLE t_p20454517_mobile_car_catalog.landlords (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20),
    telegram VARCHAR(100),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add landlord_id to cars table
ALTER TABLE t_p20454517_mobile_car_catalog.cars 
ADD COLUMN landlord_id INTEGER REFERENCES t_p20454517_mobile_car_catalog.landlords(id);

-- Insert sample landlord
INSERT INTO t_p20454517_mobile_car_catalog.landlords (name, phone, whatsapp, telegram, is_verified) 
VALUES ('Премиум Авто', '+79999999999', '79999999999', 'username', true);

-- Update all cars to have this landlord
UPDATE t_p20454517_mobile_car_catalog.cars 
SET landlord_id = 1 
WHERE landlord_id IS NULL;