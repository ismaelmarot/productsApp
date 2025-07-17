const db = require('../database');

function createProductsTable() {
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
    if (err) console.error("Error creating products table:", err.message);
    else console.log("Products table created or already exists.");
  });

  // Check and add producer_id column if not exists
  db.all(`PRAGMA table_info(products)`, (err, columns) => {
    if (err) return console.error("Error reading table info:", err.message);
    const hasProducerId = columns.some(col => col.name === 'producer_id');
    if (!hasProducerId) {
      db.run(`ALTER TABLE products ADD COLUMN producer_id INTEGER`, (err) => {
        if (err) console.error("Error adding producer_id column:", err.message);
        else console.log("Column producer_id added to products.");
      });
    }
  });
}

module.exports = createProductsTable;
