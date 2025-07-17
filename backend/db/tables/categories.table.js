const db = require('../database');

function createCategoriesTable(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `, (err) => {
    if (err) {
      console.error("Error creating categories table:", err.message);
    } else {
      console.log("Categories table created or already exists.");
    }
  });
}

module.exports = createCategoriesTable;
