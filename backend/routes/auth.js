const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, address, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }
  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, address, password) VALUES (?, ?, ?, ?)',
      [name, email, address || '', hashedPassword]
    );
    res.status(201).json({ message: 'User registered successfully.', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
    res.json({ message: 'Login successful.', token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
