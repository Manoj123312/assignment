const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const meetingRoutes = require('./routes/meetings');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/meetings', meetingRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Client Management API is running.', version: '1.0.0' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error.', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
