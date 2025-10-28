CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cities (name) VALUES 
    ('Москва'),
    ('Санкт-Петербург'),
    ('Казань'),
    ('Екатеринбург'),
    ('Сочи');