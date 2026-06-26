-- ============================================================
-- Client Management Application — MySQL Database Schema
-- ============================================================

-- Create and select the database
CREATE DATABASE IF NOT EXISTS client_management;
USE client_management;

-- ─── Clients Table ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  address    VARCHAR(255) NOT NULL,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- ─── Meetings Table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS meetings (
  id               INT          NOT NULL AUTO_INCREMENT,
  topic            VARCHAR(200) NOT NULL,
  number_of_people INT          NOT NULL,
  start_time       DATETIME     NOT NULL,
  client_id        INT          NOT NULL,
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_meeting_client FOREIGN KEY (client_id)
    REFERENCES clients (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- ─── Sample Seed Data ─────────────────────────────────────────
INSERT INTO clients (name, email, address, password) VALUES
  ('Anna Smith',   'anna@architectfirm.com',  '12 Oak Street, Springfield', 'hashed_password_1'),
  ('Bob Johnson',  'bob@clientcorp.com',       '45 Maple Ave, Shelbyville',  'hashed_password_2'),
  ('Carol White',  'carol@designhouse.com',    '78 Pine Road, Capitol City', 'hashed_password_3');

INSERT INTO meetings (topic, number_of_people, start_time, client_id) VALUES
  ('Initial Project Brief',    4, '2024-03-20 09:00:00', 1),
  ('Architecture Review',      6, '2024-03-25 14:00:00', 1),
  ('Contract Signing',         3, '2024-04-01 10:00:00', 2),
  ('Design Presentation',      8, '2024-04-05 11:00:00', 3);
