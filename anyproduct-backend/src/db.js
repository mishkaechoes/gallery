import mysql from "mysql2/promise";
import { getDatabaseCredentials } from "./secrets.js";

let pool;

export const connectToDatabase = async () => {
  if (!pool) {
    const { host, username, password, database } = await getDatabaseCredentials();
    pool = mysql.createPool({
      host,
      user: username,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};

// Initialize tables (Flyway-like migration)
export const initializeDatabase = async () => {
  const pool = await connectToDatabase();

  const createImagesTable = `
    CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      image_url VARCHAR(2083) NOT NULL
    );
  `;

  const createUnicornsTable = `
    CREATE TABLE IF NOT EXISTS unicorns (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      timestamp DATETIME NOT NULL
    );
  `;

  try {
    console.log("Ensuring database tables exist...");
    await pool.query(createImagesTable);
    console.log("Images table ensured.");
    await pool.query(createUnicornsTable);
    console.log("Unicorns table ensured.");
  } catch (err) {
    console.error("Error initializing database tables:", err);
    throw err;
  }
};
