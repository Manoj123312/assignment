const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Database Connection ──────────────────────────────────────────────────────
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'M@dhu4737',
  database: process.env.DB_NAME || 'client_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Test connection
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅  Connected to MySQL database successfully.');
  } catch (err) {
    console.error('❌  Database connection failed:', err.message);
  }
})();

// ─── Import Routes ────────────────────────────────────────────────────────────
const clientRoutes = require('./routes/clients')(db);
const meetingRoutes = require('./routes/meetings')(db);

app.use('/api/clients', clientRoutes);
app.use('/api/meetings', meetingRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Client Management API is running', version: '1.0.0' });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});

module.exports = app;
