# Client Management Application — Project Writeup

---

## 1. Student Details

| Field         | Value                          |
|---------------|--------------------------------|
| **Name**      | Gona Manoj                     |
| **Course**    | Full Stack Web Development     |
| **Project**   | Client Management Application  |
| **Date**      | June 2026                      |

---

## 2. Project Overview

**Project Name:** Client Management Application

**Real-World Scenario:**
Anna runs an Architectural firm and needs project management software developed by Henna Solutions. She requires a web app to manage her clients and meeting schedules effectively.

**Objective:**
Build a full-stack client management application that supports managing multiple clients, their project tasks, and meeting schedules, with complete CRUD operations.

---

## 3. Technologies Used

| Technology    | Purpose                                               |
|---------------|-------------------------------------------------------|
| **Angular 17**| Frontend SPA framework — components, services, routing|
| **Express.js**| Node.js backend REST API framework                    |
| **MySQL**     | Relational database for clients and meetings          |
| **Node.js**   | JavaScript runtime for the backend                    |
| **Cucumber**  | BDD testing with Gherkin feature files                |
| **Postman**   | API testing and documentation                         |
| **Git/GitHub**| Source code management and version control            |
| **Jira**      | Agile project management (Scrum)                      |
| **HTML/CSS**  | UI markup and styling                                 |

---

## 4. Sprint Planning

### Sprint 1 — Project Setup & Backend (Week 1)

| Story ID | User Story                                          | Priority | Points |
|----------|-----------------------------------------------------|----------|--------|
| CM-1     | Set up GitHub repository and project structure       | High     | 2      |
| CM-2     | Design MySQL schema for clients and meetings         | High     | 3      |
| CM-3     | Create Express server with DB connection (server.js) | High     | 3      |
| CM-4     | Implement CRUD API for Clients                       | High     | 5      |
| CM-5     | Implement CRUD API for Meetings                      | High     | 5      |
| CM-6     | Test all API endpoints using Postman                 | Medium   | 3      |

**Sprint 1 Goal:** Functional REST API with full CRUD for Clients and Meetings.

---

### Sprint 2 — Frontend Development (Week 2)

| Story ID | User Story                                          | Priority | Points |
|----------|-----------------------------------------------------|----------|--------|
| CM-7     | Scaffold Angular 17 project                          | High     | 2      |
| CM-8     | Create Client List page (with delete)                | High     | 3      |
| CM-9     | Create "Add Client" form page                        | High     | 3      |
| CM-10    | Create "Edit Client" form page                       | Medium   | 3      |
| CM-11    | Create Meeting List page (with delete)               | High     | 3      |
| CM-12    | Create "Schedule Meeting" form page                  | High     | 3      |
| CM-13    | Create "Edit Meeting" form page                      | Medium   | 3      |
| CM-14    | Implement Angular Routing between pages              | High     | 2      |
| CM-15    | Connect Angular services to backend REST API         | High     | 3      |

**Sprint 2 Goal:** Fully functional Angular frontend connected to backend API.

---

### Sprint 3 — BDD, Testing & Documentation (Week 3)

| Story ID | User Story                                          | Priority | Points |
|----------|-----------------------------------------------------|----------|--------|
| CM-16    | Write Gherkin feature files for Client scenarios     | High     | 2      |
| CM-17    | Write Gherkin feature files for Meeting scenarios    | High     | 2      |
| CM-18    | Implement Cucumber step definitions                  | High     | 5      |
| CM-19    | Execute BDD tests against the running API            | High     | 3      |
| CM-20    | Write project documentation and writeup              | Medium   | 2      |

**Sprint 3 Goal:** Passing BDD tests and complete project documentation.

---

## 5. Flow Diagrams

### 5.1 Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User (Browser)                          │
└─────────────────────┬───────────────────────────────────────┘
                      │  HTTP (port 4200)
┌─────────────────────▼───────────────────────────────────────┐
│              Angular 17 Frontend (SPA)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Client Pages│  │ Meeting Pages│  │ Navbar Component │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ClientService / MeetingService (HttpClient)         │   │
│  └──────────────────────────┬───────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────┘
                              │  REST API (port 3000)
┌─────────────────────────────▼───────────────────────────────┐
│              Express.js Backend (server.js)                 │
│  ┌────────────────────┐  ┌────────────────────────────────┐ │
│  │  /api/clients      │  │  /api/meetings                 │ │
│  │  GET / POST        │  │  GET / POST                    │ │
│  │  GET /:id          │  │  GET /:id                      │ │
│  │  PUT /:id          │  │  PUT /:id                      │ │
│  │  DELETE /:id       │  │  DELETE /:id                   │ │
│  └─────────┬──────────┘  └────────────┬───────────────────┘ │
└────────────┼────────────────────────  ┼────────────────────-┘
             │  mysql2 (port 3306)       │
┌────────────▼───────────────────────── ▼────────────────────┐
│                MySQL Database                               │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │   clients table      │  │   meetings table             │ │
│  │  id, name, email,    │  │  id, topic, people,          │ │
│  │  address, password,  │  │  start_time, client_id(FK),  │ │
│  │  created_at          │  │  created_at                  │ │
│  └──────────────────────┘  └──────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

---

### 5.2 Client CRUD Flow

```
User Action          Angular Component       Service           Backend API          Database
─────────────────────────────────────────────────────────────────────────────────────────────
Open /clients   →   ClientListComponent  →  getAll()     →  GET /api/clients   →  SELECT *
Click "Add"     →   ClientCreateComponent → create()     →  POST /api/clients  →  INSERT
Click "Edit"    →   ClientEditComponent  →  update()     →  PUT /api/clients/:id→ UPDATE
Click "Delete"  →   ClientListComponent  →  delete()     →  DELETE /api/clients/:id→DELETE
```

---

### 5.3 BDD Test Flow (Cucumber)

```
Feature File (.feature)
    │  Gherkin scenarios
    ▼
Step Definitions (common.steps.js)
    │  axios HTTP calls to API
    ▼
Running Backend (server.js)
    │  SQL queries
    ▼
MySQL Database
    │  Result rows
    ▼
Chai Assertions → Pass / Fail
```

---

### 5.4 Database ER Diagram

```
┌─────────────────────┐         ┌──────────────────────────┐
│       clients       │         │         meetings          │
├─────────────────────┤         ├──────────────────────────┤
│ id (PK)             │◄────────│ client_id (FK)            │
│ name                │   1:N   │ id (PK)                   │
│ email (UNIQUE)      │         │ topic                     │
│ address             │         │ number_of_people          │
│ password            │         │ start_time                │
│ created_at          │         │ created_at                │
│ updated_at          │         │ updated_at                │
└─────────────────────┘         └──────────────────────────┘
```

---

## 6. Agile / Jira Summary

- **Methodology:** Scrum (Agile)
- **Tool:** Jira Software (learnaide.atlassian.net)
- **Project Key:** CM
- **Epics:**
  - **EP-1:** Client Management — all stories related to client CRUD
  - **EP-2:** Meeting Management — all stories related to meeting scheduling
- **Sprint Duration:** 1 week per sprint (3 sprints total)
- **Velocity:** ~18 story points per sprint

---

## 7. Postman Collection Highlights

### Base URL: `http://localhost:3000`

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/clients          | Fetch all clients        |
| POST   | /api/clients          | Create a new client      |
| GET    | /api/clients/:id      | Get client by ID         |
| PUT    | /api/clients/:id      | Update client by ID      |
| DELETE | /api/clients/:id      | Delete client by ID      |
| GET    | /api/meetings         | Fetch all meetings       |
| POST   | /api/meetings         | Schedule a new meeting   |
| GET    | /api/meetings/:id     | Get meeting by ID        |
| PUT    | /api/meetings/:id     | Update meeting by ID     |
| DELETE | /api/meetings/:id     | Delete meeting by ID     |

---

## 8. GitHub Repository

**Repository:** `https://github.com/Manoj123312/assignment`

**Branch Strategy:**
- `main` — production-ready code
- Feature branches for each sprint story (e.g., `feature/client-crud`)

---

*End of Writeup*
