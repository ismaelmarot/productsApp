const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Crate Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT,
    cost_price REAL,
    sales_price REAL,
    sold_price REAL,
    incoming_date TEXT,
    outgoing_date TEXT,
    reason_outgoing TEXT,
    payment_date TEXT,
    payment_method TEXT,
    note TEXT
  )`, (err) => {
    if (err) {
      console.error("Error creating products table:", err.message);
    } else {
      console.log("Products table created or already exists.");
    }
  });

  // Verify if producer_id column exists in products table
  db.all(`PRAGMA table_info(products)`, (err, columns) => {
    if (err) {
      console.error("Error al obtener info de tabla products:", err.message);
      return;
    }

    const hasProducerId = columns.some(col => col.name === 'producer_id');

    if (!hasProducerId) {
      db.run(`ALTER TABLE products ADD COLUMN producer_id INTEGER`, (err) => {
        if (err) {
          console.error("Error agregando columna producer_id:", err.message);
        } else {
          console.log("Columna producer_id agregada a products.");
        }
      });
    } else {
      console.log("La columna producer_id ya existe.");
    }
  });

  // Create Producers table
  db.run(`CREATE TABLE IF NOT EXISTS producers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    nickname TEXT,
    cell_phone TEXT,
    home_phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    zip_code TEXT,
    website TEXT,
    social_media TEXT,
    note TEXT
  )`, (err) => {
    if (err) {
      console.error("Error creating producers table:", err.message);
    } else {
      console.log("Producers table created or already exists.");
    }
  });
});

module.exports = db;
