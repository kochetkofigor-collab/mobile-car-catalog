-- Add city column to cars table
ALTER TABLE t_p20454517_mobile_car_catalog.cars 
ADD COLUMN city VARCHAR(100) NOT NULL DEFAULT 'Москва';

-- Update existing rows to have Moscow as default city
UPDATE t_p20454517_mobile_car_catalog.cars 
SET city = 'Москва' 
WHERE city IS NULL;