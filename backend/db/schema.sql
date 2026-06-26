-- ============================================================
-- Client Management Application - MySQL Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS client_management;
USE client_management;

-- Users table (for registration/login)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  address VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  address VARCHAR(255),
  phone VARCHAR(20),
  company VARCHAR(150),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meeting_topic VARCHAR(255) NOT NULL,
  number_of_people INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME,
  client_id INT,
  created_by INT,
  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Sample data
INSERT INTO clients (name, email, address, phone, company) VALUES
  ('Anna Smith', 'anna@example.com', '123 Main St', '555-0101', 'Smith Architecture'),
  ('Bob Johnson', 'bob@example.com', '456 Oak Ave', '555-0102', 'Johnson Designs');

INSERT INTO meetings (meeting_topic, number_of_people, start_time, end_time, client_id) VALUES
  ('Project Kickoff', 5, '2024-03-20 09:00:00', '2024-03-20 10:00:00', 1),
  ('Design Review', 3, '2024-03-21 14:00:00', '2024-03-21 15:00:00', 2);
