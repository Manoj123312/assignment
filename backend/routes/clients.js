const express = require('express');
const router = express.Router();
const db = require('../config/db');

/**
 * GET /api/clients
 * Get all clients
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
    return res.status(200).json(rows);
  } catch (err) {
    console.error('Get clients error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /api/clients/:id
 * Get a single client by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Get client error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /api/clients
 * Create a new client
 */
router.post('/', async (req, res) => {
  const { name, email, address, phone, company } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM clients WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Client with this email already exists' });
    }

    const [result] = await db.query(
      'INSERT INTO clients (name, email, address, phone, company) VALUES (?, ?, ?, ?, ?)',
      [name, email, address || null, phone || null, company || null]
    );

    return res.status(201).json({
      message: 'Client created successfully',
      clientId: result.insertId
    });
  } catch (err) {
    console.error('Create client error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * PUT /api/clients/:id
 * Update a client
 */
router.put('/:id', async (req, res) => {
  const { name, email, address, phone, company, status } = req.body;

  try {
    const [existing] = await db.query('SELECT id FROM clients WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await db.query(
      'UPDATE clients SET name = ?, email = ?, address = ?, phone = ?, company = ?, status = ? WHERE id = ?',
      [name, email, address || null, phone || null, company || null, status || 'active', req.params.id]
    );

    return res.status(200).json({ message: 'Client updated successfully' });
  } catch (err) {
    console.error('Update client error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * DELETE /api/clients/:id
 * Delete a client
 */
router.delete('/:id', async (req, res) => {
  try {
    const [existing] = await db.query('SELECT id FROM clients WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await db.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
    return res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error('Delete client error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
