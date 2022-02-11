-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users, confidentials;

CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE confidentials(
    confi_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users (id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);