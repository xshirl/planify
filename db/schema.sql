\c planify_db

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS cards;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  pw_digest VARCHAR(255),
  username VARCHAR(255)
);

CREATE TABLE boards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  user_id INTEGER REFERENCES users(id)
  );

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  board_id INTEGER REFERENCES boards(id)
);

-- CREATE TABLE cards (
--   id SERIAL PRIMARY KEY,
--   content TEXT,
--   user_id INTEGER REFERENCES users(id),
--   list_id INTEGER REFERENCES lists(id),
--   board_id INTEGER REFERENCES boards(id)
-- );
