const express = require('express');
const router = express.Router();
const db = require('../config/db');

/**
 * GET /api/meetings
 * Get all meetings
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.*, c.name AS client_name, c.email AS client_email
      FROM meetings m
      LEFT JOIN clients c ON m.client_id = c.id
      ORDER BY m.start_time DESC
    `);
    return res.status(200).json(rows);
  } catch (err) {
    console.error('Get meetings error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /api/meetings/:id
 * Get a single meeting by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.*, c.name AS client_name, c.email AS client_email
      FROM meetings m
      LEFT JOIN clients c ON m.client_id = c.id
      WHERE m.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Get meeting error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /api/meetings
 * Create a new meeting
 */
router.post('/', async (req, res) => {
  const { meeting_topic, number_of_people, start_time, end_time, client_id } = req.body;

  if (!meeting_topic || !number_of_people || !start_time) {
    return res.status(400).json({
      message: 'meeting_topic, number_of_people, and start_time are required'
    });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO meetings (meeting_topic, number_of_people, start_time, end_time, client_id)
       VALUES (?, ?, ?, ?, ?)`,
      [meeting_topic, number_of_people, start_time, end_time || null, client_id || null]
    );

    return res.status(201).json({
      message: 'Meeting scheduled successfully',
      meetingId: result.insertId
    });
  } catch (err) {
    console.error('Create meeting error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * PUT /api/meetings/:id
 * Update a meeting
 */
router.put('/:id', async (req, res) => {
  const { meeting_topic, number_of_people, start_time, end_time, client_id, status } = req.body;

  try {
    const [existing] = await db.query('SELECT id FROM meetings WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await db.query(
      `UPDATE meetings
       SET meeting_topic = ?, number_of_people = ?, start_time = ?,
           end_time = ?, client_id = ?, status = ?
       WHERE id = ?`,
      [meeting_topic, number_of_people, start_time, end_time || null,
       client_id || null, status || 'scheduled', req.params.id]
    );

    return res.status(200).json({ message: 'Meeting updated successfully' });
  } catch (err) {
    console.error('Update meeting error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * DELETE /api/meetings/:id
 * Delete a meeting
 */
router.delete('/:id', async (req, res) => {
  try {
    const [existing] = await db.query('SELECT id FROM meetings WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await db.query('DELETE FROM meetings WHERE id = ?', [req.params.id]);
    return res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (err) {
    console.error('Delete meeting error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
