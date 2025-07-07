const express = require('express');
const router = express.Router();
const db = require('../db/database');

// P O S T
router.post('/', (req, res) => {
  const {
    code,
    name,
    price,
    category,
    cost_price,
    sales_price,
    sold_price,
    incoming_date,
    outgoing_date,
    reason_outgoing,
    payment_date,
    payment_method,
    note
  } = req.body;

  if(!name || typeof price !== 'number') {
    return res.status(400).json({ error: "Datos de producto invalidos" });
  }
  const query = `
    INSERT INTO products (
      code, name, price, category,
      cost_price, sales_price, sold_price,
      incoming_date, outgoing_date,
      reason_outgoing, payment_date,
      payment_method, note
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    code || null,
    name,
    price,
    category || null,
    cost_price || null,
    sales_price || null,
    sold_price || null,
    incoming_date || null,
    outgoing_date || null,
    reason_outgoing || null,
    payment_date || null,
    payment_method || null,
    note || null
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error("Error al insertar prodcuto: ", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.status(201).json({ 
      id: this.lastID,
      code,
      name,
      price,
      category,
      cost_price,
      sales_price,
      sold_price,
      incoming_date,
      outgoing_date,
      reason_outgoing,
      payment_date,
      payment_method,
      note
    });
  });
});

// G E T
router.get('/', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      console.error("Error al obtener productos:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error al obtener producto:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    if (!row) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(row);
  }); 
})

// D E L E T E
router.delete('/:id', (req, res) => {
  const productId = req.params.id;

  db.run("DELETE FROM products WHERE id = ?", [productId], function(err) {
    if (err) {
      console.error("Error al eliminar producto:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ "Producto eliminado": productId });
  });
});

module.exports = router;
