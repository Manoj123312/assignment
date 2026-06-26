const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/clients - Get all clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// GET /api/clients/:id - Get client by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Client not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// POST /api/clients - Create a new client
router.post('/', async (req, res) => {
  const { name, email, address, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }
  try {
    const [existing] = await db.query('SELECT id FROM clients WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Client with this email already exists.' });
    }
    const [result] = await db.query(
      'INSERT INTO clients (name, email, address, phone) VALUES (?, ?, ?, ?)',
      [name, email, address || '', phone || '']
    );
    res.status(201).json({ message: 'Client created successfully.', clientId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// PUT /api/clients/:id - Update a client
router.put('/:id', async (req, res) => {
  const { name, email, address, phone } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE clients SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?',
      [name, email, address || '', phone || '', req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found.' });
    }
    res.json({ message: 'Client updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// DELETE /api/clients/:id - Delete a client
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found.' });
    }
    res.json({ message: 'Client deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
