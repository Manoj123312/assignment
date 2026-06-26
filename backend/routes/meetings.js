const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/meetings - Get all meetings
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT m.*, c.name AS client_name 
       FROM meetings m 
       LEFT JOIN clients c ON m.client_id = c.id 
       ORDER BY m.start_time DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// GET /api/meetings/:id - Get meeting by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT m.*, c.name AS client_name 
       FROM meetings m 
       LEFT JOIN clients c ON m.client_id = c.id 
       WHERE m.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Meeting not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// POST /api/meetings - Schedule a new meeting
router.post('/', async (req, res) => {
  const { client_id, topic, number_of_people, start_time, description } = req.body;
  if (!topic || !number_of_people || !start_time) {
    return res.status(400).json({ message: 'Topic, number of people and start time are required.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO meetings (client_id, topic, number_of_people, start_time, description) VALUES (?, ?, ?, ?, ?)',
      [client_id || null, topic, number_of_people, start_time, description || '']
    );
    res.status(201).json({ message: 'Meeting scheduled successfully.', meetingId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// PUT /api/meetings/:id - Update a meeting
router.put('/:id', async (req, res) => {
  const { client_id, topic, number_of_people, start_time, description } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE meetings SET client_id = ?, topic = ?, number_of_people = ?, start_time = ?, description = ? WHERE id = ?',
      [client_id || null, topic, number_of_people, start_time, description || '', req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Meeting not found.' });
    }
    res.json({ message: 'Meeting updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// DELETE /api/meetings/:id - Delete a meeting
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM meetings WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Meeting not found.' });
    }
    res.json({ message: 'Meeting deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
