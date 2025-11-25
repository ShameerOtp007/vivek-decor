import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let db;

// Check if we are in production (PostgreSQL) or development (SQLite)
const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL;

export async function getDb() {
  if (db) return db;

  if (isProduction) {
    // PostgreSQL Connection
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Wrapper to match SQLite API for simple queries
    db = {
      all: async (text, ...params) => {
        const res = await pool.query(text.replace(/\?/g, (match, offset, string) => `$${params.length > 0 ? params.indexOf(params[0]) + 1 : 1}`), params); // Simple param replacement hack or use pg-format. 
        // Actually, let's just use standard pg query style but we need to adapt the calling code or adapt this wrapper.
        // The calling code uses '?' for params. Postgres uses $1, $2.
        // We need a proper adapter.
        
        // Better approach: Let's just rewrite the queries in index.js to be compatible or use an ORM.
        // But to keep it simple, let's do a simple regex replacement for ? to $1, $2...
        let query = text;
        let paramIndex = 1;
        while (query.includes('?')) {
          query = query.replace('?', `$${paramIndex++}`);
        }
        const result = await pool.query(query, params);
        return result.rows;
      },
      get: async (text, ...params) => {
        let query = text;
        let paramIndex = 1;
        while (query.includes('?')) {
          query = query.replace('?', `$${paramIndex++}`);
        }
        const result = await pool.query(query, params);
        return result.rows[0];
      },
      run: async (text, ...params) => {
        let query = text;
        let paramIndex = 1;
        while (query.includes('?')) {
          query = query.replace('?', `$${paramIndex++}`);
        }
        try {
          const result = await pool.query(query, params);
          return { lastID: result.rows[0]?.id }; // PG RETURNING id
        } catch (err) {
          console.error('Database Error:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
          throw err;
        }
      },
      exec: async (text) => {
        return await pool.query(text);
      }
    };

    // Initialize Tables for Postgres
    await db.exec(`
      CREATE TABLE IF NOT EXISTS masterpieces (
        id SERIAL PRIMARY KEY,
        title TEXT,
        category TEXT,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS packages (
        id SERIAL PRIMARY KEY,
        title TEXT,
        price TEXT,
        description TEXT,
        features TEXT,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT
      );
    `);

  } else {
    // SQLite Connection (Local)
    db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS masterpieces (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS packages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        price TEXT,
        description TEXT,
        features TEXT,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      );
    `);
  }

  // Seed admin if not exists
  const admin = await db.get('SELECT * FROM admins WHERE username = ?', 'admin');
  if (!admin) {
    if (isProduction) {
       // For PG, we need to be careful with syntax if we used the wrapper
       await db.exec("INSERT INTO admins (username, password) VALUES ('admin', 'admin123')");
    } else {
       await db.run('INSERT INTO admins (username, password) VALUES (?, ?)', 'admin', 'admin123');
    }
  }

  return db;
}
