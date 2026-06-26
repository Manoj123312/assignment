const mysql = require('mysql2');

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'client_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

// Test DB connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database successfully.');
    connection.release();
  }
});

module.exports = db;
