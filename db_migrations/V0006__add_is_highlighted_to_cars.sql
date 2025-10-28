-- Add is_highlighted column to cars table
ALTER TABLE t_p20454517_mobile_car_catalog.cars
ADD COLUMN is_highlighted BOOLEAN DEFAULT false;
