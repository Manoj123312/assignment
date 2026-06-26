-- Client Management Application - MySQL Schema
-- Run this file to set up the database

CREATE DATABASE IF NOT EXISTS client_management;
USE client_management;

-- Users table (for registration & login)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  address VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  address VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  topic VARCHAR(200) NOT NULL,
  number_of_people INT NOT NULL,
  start_time DATETIME NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

-- Sample data
INSERT INTO clients (name, email, address, phone) VALUES
  ('Anna Smith', 'anna@architectfirm.com', '123 Main St, Springfield', '555-0101'),
  ('Bob Johnson', 'bob@example.com', '456 Oak Ave, Shelbyville', '555-0102');

INSERT INTO meetings (client_id, topic, number_of_people, start_time, description) VALUES
  (1, 'Project Kickoff', 5, '2024-03-20 09:00:00', 'Initial meeting to discuss project scope'),
  (1, 'Design Review', 3, '2024-03-27 14:00:00', 'Review architectural designs');
