const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // GET /api/meetings — List all meetings (with client name)
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.query(
        `SELECT m.*, c.name AS client_name
         FROM meetings m
         LEFT JOIN clients c ON m.client_id = c.id
         ORDER BY m.start_time ASC`
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/meetings/:id — Get single meeting
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await db.query(
        `SELECT m.*, c.name AS client_name
         FROM meetings m
         LEFT JOIN clients c ON m.client_id = c.id
         WHERE m.id = ?`,
        [req.params.id]
      );
      if (rows.length === 0) return res.status(404).json({ error: 'Meeting not found' });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/meetings — Create a new meeting
  router.post('/', async (req, res) => {
    const { topic, number_of_people, start_time, client_id } = req.body;
    if (!topic || !number_of_people || !start_time || !client_id) {
      return res.status(400).json({
        error: 'All fields (topic, number_of_people, start_time, client_id) are required.'
      });
    }
    try {
      const [result] = await db.query(
        'INSERT INTO meetings (topic, number_of_people, start_time, client_id) VALUES (?, ?, ?, ?)',
        [topic, number_of_people, start_time, client_id]
      );
      res.status(201).json({ message: 'Meeting created successfully', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT /api/meetings/:id — Update a meeting
  router.put('/:id', async (req, res) => {
    const { topic, number_of_people, start_time, client_id } = req.body;
    try {
      const [result] = await db.query(
        'UPDATE meetings SET topic = ?, number_of_people = ?, start_time = ?, client_id = ? WHERE id = ?',
        [topic, number_of_people, start_time, client_id, req.params.id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Meeting not found' });
      res.json({ message: 'Meeting updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE /api/meetings/:id — Delete a meeting
  router.delete('/:id', async (req, res) => {
    try {
      const [result] = await db.query('DELETE FROM meetings WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Meeting not found' });
      res.json({ message: 'Meeting deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
