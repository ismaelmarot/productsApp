const express = require('express');
const router = express.Router();
const db = require('../db/database');

// G E T
// List all categories
router.get('/', (req, res) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});
// Get by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM categories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json(row);
    }
  });
});


// C R E A T E
router.post('/', (req, res) => {
  const { name, note } = req.body;
  db.run('INSERT INTO categories (name, note) VALUES (?, ?)', [name, note], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, name });
    }
  });
});

// E D I T
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, note } = req.body;
  db.run(
    'UPDATE categories SET name = ?, note = ? WHERE id = ?',
    [name, note, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id, name, note });
      }
    }
  );
});

// D E L E T E
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM categories WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ deleted: this.changes > 0 });
    }
  });
});

module.exports = router;
