-- Add coming_soon_date column to cars table
ALTER TABLE t_p20454517_mobile_car_catalog.cars
ADD COLUMN coming_soon_date DATE DEFAULT NULL;

COMMENT ON COLUMN t_p20454517_mobile_car_catalog.cars.coming_soon_date IS 'Date when car will be available. NULL means car is available now.';
