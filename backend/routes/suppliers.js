const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all suppliers
router.get('/', (req, res) => {
  db.query('SELECT * FROM suppliers', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a supplier
router.post('/', (req, res) => {
  const { name, contact, category, type } = req.body;

  if (!name || !category || !type) {
    return res.status(400).json({ error: 'Name, category, and type are required.' });
  }

  // Contact must be exactly 10 digits if provided
  if (contact && !/^\d{10}$/.test(contact)) {
    return res.status(400).json({ error: 'Contact must be exactly 10 digits.' });
  }

  // Prevent duplicate supplier in same category and type
  db.query(
    'SELECT * FROM suppliers WHERE name=? AND category=? AND type=?',
    [name, category, type],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error.' });
      if (results.length > 0) {
        return res.status(400).json({ error: 'Supplier already exists in this category and type.' });
      }

      db.query(
        'INSERT INTO suppliers (name, contact, category, type) VALUES (?, ?, ?, ?)',
        [name, contact, category, type],
        (err, results) => {
          if (err) return res.status(500).json({ error: 'Database insert failed.' });
          res.json({ message: 'Supplier added', id: results.insertId });
        }
      );
    }
  );
});


// Delete a supplier
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM suppliers WHERE id=?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Supplier deleted' });
  });
});

module.exports = router;
