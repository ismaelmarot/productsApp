const db = require('../database');

function createProducersTable() {
  db.run(`CREATE TABLE IF NOT EXISTS producers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    nickname TEXT,
    category TEXT,
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
    if (err) console.error("Error creating producers table:", err.message);
    else console.log("Producers table created or already exists.");
  });
}

module.exports = createProducersTable;
