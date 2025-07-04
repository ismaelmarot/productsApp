const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
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
});

module.exports = db;
