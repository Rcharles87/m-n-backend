DROP DATABASE IF EXISTS m_n_dev;
CREATE DATABASE m_n_dev;

\c m_n_dev;


CREATE TABLE pins (
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    description TEXT,
    price NUMERIC,
    is_featured BOOLEAN,
    image TEXT
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer TEXT,
    title TEXT,
    content TEXT, 
    rating NUMERIC,
    CHECK (rating >= 0 AND rating <=5),
    pin_id INTEGER REFERENCES pins (id)
    ON DELETE CASCADE
);
