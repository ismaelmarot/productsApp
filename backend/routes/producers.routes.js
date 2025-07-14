const express = require('express');
const router = express.Router();
const db = require('../db/database');

// P O S T
router.post('/', (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    nickname,
    cell_phone,
    home_phone,
    email,
    address,
    city,
    state,
    country,
    zip_code,
    website,
    social_media,
    note
  } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ error: "Nombre y apellido son obligatorios" });
  }

  const query = `
    INSERT INTO producers (
      first_name, middle_name, last_name,
      nickname, cell_phone, home_phone, email,
      address, city, state, country, zip_code,
      website, social_media, note
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    first_name, middle_name, last_name,
    nickname, cell_phone, home_phone, email,
    address, city, state, country, zip_code,
    website, social_media, note
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error("Error al insertar productor:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// G E T
// Obtaning all producers
router.get('/', (req, res) => {
  db.all("SELECT * FROM producers", [], (err, rows) => {
    if (err) {
      console.error("Error al obtener productores:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(rows);
  });
});

// Obtain producer by ID
router.get('/:id', (req, res) => {
  db.get("SELECT * FROM producers WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.error("Error al obtener productor:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    if (!row) {
      return res.status(404).json({ error: "Productor no encontrado" });
    }
    res.json(row);
  });
});

// U P D A T E
router.patch('/:id', (req, res) => {
  const updates = req.body;
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    return res.status(400).json({ error: 'No hay campos para actualizar' });
  }

  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const sql = `UPDATE producers SET ${setClause} WHERE id = ?`;

  db.run(sql, [...values, req.params.id], function (err) {
    if (err) {
      console.error("Error al actualizar productor:", err.message);
      return res.status(500).json({ error: 'Error de base de datos' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Productor no encontrado' });
    }
    res.json({ message: 'Productor actualizado', changes: this.changes });
  });
});

// D E L E T E
router.delete('/:id', (req, res) => {
  db.run("DELETE FROM producers WHERE id = ?", [req.params.id], function (err) {
    if (err) {
      console.error("Error al eliminar productor:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Productor no encontrado" });
    }
    res.status(200).json({ message: "Productor eliminado" });
  });
});

module.exports = router;
