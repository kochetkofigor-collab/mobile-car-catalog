-- Supabase Database Setup Script
-- Выполни этот скрипт в SQL Editor на supabase.com

-- 1. Создаём таблицу landlords (комитенты)
CREATE TABLE IF NOT EXISTS landlords (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  telegram VARCHAR(100),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Создаём таблицу cities (города)
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Создаём таблицу cars (автомобили)
CREATE TABLE IF NOT EXISTS cars (
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
  is_highlighted BOOLEAN DEFAULT false,
  coming_soon_date DATE,
  landlord_id INTEGER REFERENCES landlords(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Включаем Row Level Security (для безопасности)
ALTER TABLE landlords ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- 5. Создаём политики доступа (разрешаем всем читать)
CREATE POLICY "Allow public read access on landlords" ON landlords FOR SELECT USING (true);
CREATE POLICY "Allow public read access on cities" ON cities FOR SELECT USING (true);
CREATE POLICY "Allow public read access on cars" ON cars FOR SELECT USING (true);

-- 6. Разрешаем анонимным пользователям делать INSERT/UPDATE/DELETE (для админки)
-- ВАЖНО: В продакшене лучше использовать service_role ключ илиAuth
CREATE POLICY "Allow public insert on landlords" ON landlords FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on landlords" ON landlords FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on landlords" ON landlords FOR DELETE USING (true);

CREATE POLICY "Allow public insert on cities" ON cities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on cities" ON cities FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on cities" ON cities FOR DELETE USING (true);

CREATE POLICY "Allow public insert on cars" ON cars FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on cars" ON cars FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on cars" ON cars FOR DELETE USING (true);

-- 7. Добавляем тестовые города
INSERT INTO cities (name) VALUES 
  ('Москва'),
  ('Санкт-Петербург'),
  ('Казань'),
  ('Екатеринбург')
ON CONFLICT DO NOTHING;

-- 8. Добавляем тестовых комитентов
INSERT INTO landlords (name, phone, whatsapp, telegram, is_verified) VALUES 
  ('Иван Иванов', '+79991234567', '+79991234567', '@ivanov', true),
  ('Мария Петрова', '+79997654321', '+79997654321', '@petrova', false)
ON CONFLICT DO NOTHING;
