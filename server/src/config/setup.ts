import pool from "./db";


const createTables = async () => {
    try {

    await pool.query(`CREATE TABLE IF NOT EXISTS "admin"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    password VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`)
        await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(500),
        phone VARCHAR(20),
        dob DATE,
        gender CHAR(1) CHECK (gender IN ('m', 'f', 'o')),
        address VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS artist (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        dob DATE,
        gender CHAR(1) CHECK (gender IN ('m', 'f', 'o')),
        address VARCHAR(255),
        first_release_year INT,
        no_of_albums_released INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS music (
        id SERIAL PRIMARY KEY,
        artist_id INT REFERENCES artist(id) ON DELETE CASCADE,
        title VARCHAR(255),
        album_name VARCHAR(255),
        genre VARCHAR(10) CHECK (genre IN ('rnb', 'country', 'classic', 'rock', 'jazz')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_music_artist FOREIGN KEY (artist_id)
        REFERENCES artist(id)
        ON DELETE CASCADE
      );
    `);

        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

export default createTables;
