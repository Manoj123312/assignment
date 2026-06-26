# Client Management Application

A full-stack client management web application built with **Angular 17**, **Express.js**, **MySQL**, and **Cucumber BDD**.

---

## Project Structure

```
assignment/
├── backend/              # Express.js REST API
│   ├── server.js         # Entry point — DB connection + routes
│   ├── db.js             # MySQL connection pool
│   ├── routes/
│   │   ├── clients.js    # CRUD routes for clients
│   │   └── meetings.js   # CRUD routes for meetings
│   └── package.json
├── frontend/             # Angular 17 SPA
│   └── src/app/
│       ├── components/   # client-list, client-create, client-edit,
│       │                 # meeting-list, meeting-create, meeting-edit, navbar
│       ├── services/     # client.service.ts, meeting.service.ts
│       ├── app.routes.ts
│       └── app.config.ts
├── database/
│   └── schema.sql        # MySQL schema + seed data
├── cucumber/             # BDD tests (Gherkin + step definitions)
│   ├── features/
│   │   ├── client.feature
│   │   └── meeting.feature
│   ├── step_definitions/
│   │   └── common.steps.js
│   └── package.json
├── docs/
│   └── writeup.md        # Full project writeup
└── README.md
```

---

## How to Run Locally

### Prerequisites

Make sure the following are installed on your machine:

- **Node.js** v18+ → https://nodejs.org
- **npm** v9+
- **MySQL** 8.0+ → https://dev.mysql.com/downloads/
- **Angular CLI** v17 → `npm install -g @angular/cli@17`
- **Git** → https://git-scm.com

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Manoj123312/assignment.git
cd assignment
```

---

### Step 2 — Set Up the MySQL Database

1. Open your MySQL client (MySQL Workbench, CLI, etc.)
2. Run the schema file:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `client_management` database with `clients` and `meetings` tables, plus seed data.

---

### Step 3 — Start the Backend

```bash
cd backend
npm install
npm start
```

The server starts at **http://localhost:3000**.

> **Configure DB credentials** (optional): Edit `backend/server.js` and update
> `user`, `password`, and `database` fields, or set environment variables:
> ```bash
> DB_HOST=localhost DB_USER=root DB_PASSWORD=yourpassword DB_NAME=client_management npm start
> ```

---

### Step 4 — Start the Angular Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
ng serve
```

The app opens at **http://localhost:4200**.

---

### Step 5 — Test with Postman

Import and test the API at `http://localhost:3000`:

| Method | URL                        | Body (JSON)                                                         |
|--------|----------------------------|---------------------------------------------------------------------|
| GET    | /api/clients               | —                                                                   |
| POST   | /api/clients               | `{"name":"Anna","email":"a@b.com","address":"123 St","password":"x"}` |
| GET    | /api/clients/1             | —                                                                   |
| PUT    | /api/clients/1             | `{"name":"Anna Updated","email":"a@b.com","address":"456 Rd","password":"y"}` |
| DELETE | /api/clients/1             | —                                                                   |
| GET    | /api/meetings              | —                                                                   |
| POST   | /api/meetings              | `{"topic":"Review","number_of_people":4,"start_time":"2024-04-10T10:00:00","client_id":1}` |
| GET    | /api/meetings/1            | —                                                                   |
| PUT    | /api/meetings/1            | `{"topic":"Updated","number_of_people":5,"start_time":"2024-04-15T14:00:00","client_id":1}` |
| DELETE | /api/meetings/1            | —                                                                   |

---

### Step 6 — Run Cucumber BDD Tests

Make sure the backend is running, then:

```bash
cd cucumber
npm install
npm test
```

---

## Jira Setup Guide

### Step 1 — Create a Jira Project

1. Go to **https://www.atlassian.com/software/jira** and sign in (or create a free account).
2. Click **Create project**.
3. Choose **Scrum** template → click **Select**.
4. Set:
   - **Name:** `ClientManagement`
   - **Key:** `CM`
   - **Type:** Team-managed
5. Click **Create project**.

---

### Step 2 — Create Epics

1. In your project, click **Backlog** in the left sidebar.
2. Click **Create Epic** (or use the Epics panel on the right).
3. Create the following two epics:

| Epic Name             | Description                                  |
|-----------------------|----------------------------------------------|
| **Client Management** | All features related to client CRUD          |
| **Meeting Management**| All features related to meeting scheduling   |

---

### Step 3 — Create User Stories

Click **Create** (top menu) and select **Issue Type: Story** for each story below.

#### Epic: Client Management

| Story Key | Summary                                         | Description                                                                                                           |
|-----------|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| CM-1      | Create a new client                             | As Anna, I want to add a new client with name, email, address, and password so that I can track client information.  |
| CM-2      | View all clients                                | As Anna, I want to see a list of all clients so that I can quickly browse client information.                         |
| CM-3      | Update a client's details                       | As Anna, I want to edit client details so that I can keep client information up to date.                              |
| CM-4      | Delete a client                                 | As Anna, I want to remove a client so that inactive clients are no longer listed.                                     |

#### Epic: Meeting Management

| Story Key | Summary                                         | Description                                                                                                            |
|-----------|-------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| CM-5      | Schedule a new client meeting                   | As Anna, I want to add a new meeting schedule with topic, number of people, date/time, and linked client.             |
| CM-6      | View all meeting schedules                      | As Anna, I want to see a list of all upcoming meetings so that I can plan my schedule.                                  |
| CM-7      | Update a meeting schedule                       | As Anna, I want to edit meeting details so that I can accommodate schedule changes.                                     |
| CM-8      | Cancel / delete a meeting                       | As Anna, I want to delete a meeting that is no longer needed.                                                          |

---

### Step 4 — Create and Start a Sprint

1. In **Backlog**, scroll to the **Sprints** section.
2. Click **Create Sprint**.
3. Click the **⋯** (three dots) on the sprint and select **Edit sprint**:
   - **Sprint name:** Sprint 1 — Backend & Database
   - **Start date:** today
   - **End date:** 7 days from today
   - **Goal:** Functional REST API with full CRUD for Clients and Meetings
4. Drag stories CM-1 through CM-4 into the sprint.
5. Click **Start Sprint**.

---

## Git Workflow

```bash
# After cloning:
git status
git add .
git commit -m "Initial project setup"
git push origin main

# Feature branch workflow:
git checkout -b feature/client-crud
# make changes...
git add .
git commit -m "Add client CRUD backend routes"
git push origin feature/client-crud
# Create Pull Request on GitHub
```

---

## Features

- ✅ Create, Read, Update, Delete (CRUD) — Clients
- ✅ Create, Read, Update, Delete (CRUD) — Meeting Schedules
- ✅ Angular SPA with routing and reactive forms
- ✅ Express REST API with MySQL integration
- ✅ Cucumber BDD tests with Gherkin feature files
- ✅ MySQL relational schema with foreign key constraint
- ✅ Postman-ready REST endpoints
