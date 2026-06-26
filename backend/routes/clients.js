const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // GET /api/clients — List all clients
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/clients/:id — Get single client
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Client not found' });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/clients — Create a new client
  router.post('/', async (req, res) => {
    const { name, email, address, password } = req.body;
    if (!name || !email || !address || !password) {
      return res.status(400).json({ error: 'All fields (name, email, address, password) are required.' });
    }
    try {
      const [result] = await db.query(
        'INSERT INTO clients (name, email, address, password) VALUES (?, ?, ?, ?)',
        [name, email, address, password]
      );
      res.status(201).json({ message: 'Client created successfully', id: result.insertId });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'A client with this email already exists.' });
      }
      res.status(500).json({ error: err.message });
    }
  });

  // PUT /api/clients/:id — Update a client
  router.put('/:id', async (req, res) => {
    const { name, email, address, password } = req.body;
    try {
      const [result] = await db.query(
        'UPDATE clients SET name = ?, email = ?, address = ?, password = ? WHERE id = ?',
        [name, email, address, password, req.params.id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Client not found' });
      res.json({ message: 'Client updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE /api/clients/:id — Delete a client
  router.delete('/:id', async (req, res) => {
    try {
      const [result] = await db.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Client not found' });
      res.json({ message: 'Client deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
