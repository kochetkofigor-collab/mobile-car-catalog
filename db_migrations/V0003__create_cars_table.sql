-- Create cars table with all necessary fields
CREATE TABLE t_p20454517_mobile_car_catalog.cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    price_per_day INTEGER NOT NULL,
    deposit INTEGER NOT NULL,
    buyout_months INTEGER NOT NULL,
    images TEXT[] NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Москва',
    is_new BOOLEAN DEFAULT false,
    is_promo BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO t_p20454517_mobile_car_catalog.cars (name, brand, year, price_per_day, deposit, buyout_months, images, city, is_new, is_promo) VALUES
('Mercedes-Benz S-Class', 'mercedes', 2024, 8500, 50000, 36, ARRAY['https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/919e78a9-fb0d-4981-a0b3-e23a40578130.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/919e78a9-fb0d-4981-a0b3-e23a40578130.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/919e78a9-fb0d-4981-a0b3-e23a40578130.jpg'], 'Москва', true, true),
('BMW 7 Series', 'bmw', 2023, 7500, 45000, 36, ARRAY['https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/f2b3e76d-abab-42c4-9e07-b88f1aefe650.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/f2b3e76d-abab-42c4-9e07-b88f1aefe650.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/f2b3e76d-abab-42c4-9e07-b88f1aefe650.jpg'], 'Москва', true, false),
('Audi A8', 'audi', 2023, 7000, 42000, 36, ARRAY['https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/59a7321f-5770-4aba-8a79-f0768baf4a89.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/59a7321f-5770-4aba-8a79-f0768baf4a89.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/59a7321f-5770-4aba-8a79-f0768baf4a89.jpg'], 'Москва', false, true),
('Mercedes-Benz E-Class', 'mercedes', 2022, 5500, 35000, 24, ARRAY['https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/104e4a89-cfa7-41d6-ab6b-d3ddef38f590.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/104e4a89-cfa7-41d6-ab6b-d3ddef38f590.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/104e4a89-cfa7-41d6-ab6b-d3ddef38f590.jpg'], 'Москва', false, false),
('BMW 5 Series', 'bmw', 2022, 5000, 32000, 24, ARRAY['https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/d2152d46-5475-4a5e-989f-e26dd22ee1d3.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/d2152d46-5475-4a5e-989f-e26dd22ee1d3.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/d2152d46-5475-4a5e-989f-e26dd22ee1d3.jpg'], 'Москва', false, false),
('Audi A6', 'audi', 2021, 4500, 30000, 24, ARRAY['https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/df5dcf0d-fb2c-466c-a696-7c722b58ee53.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/df5dcf0d-fb2c-466c-a696-7c722b58ee53.jpg', 'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/df5dcf0d-fb2c-466c-a696-7c722b58ee53.jpg'], 'Москва', false, false);