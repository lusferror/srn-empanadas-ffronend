import mysql from 'mysql2/promise';

/**
 * This is the connection pool for the MySQL database.
 */
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'empanadas_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * This function initializes the database by creating the empanadas table if it doesn't exist.
 * */
export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS empanadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    filling TEXT,
    price DECIMAL(10, 2),
    is_sold_out BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  `);
  console.log('Base de datos inicializada');
}

