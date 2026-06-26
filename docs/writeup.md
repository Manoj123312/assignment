# Client Management Application – Project Writeup

---

## 1. Name

**Project:** Client Management Application
**Developer:** Manoj
**Institution/Company:** Henna Solutions
**Client:** Anna's Architectural Firm

---

## 2. Project Overview

Anna runs an Architectural firm and needs software to manage client records, meetings, and project schedules. This web application — **Client Management App** — provides a full-stack solution with:

- **User registration and login** (authentication with JWT)
- **Client creation and management** (CRUD operations)
- **Meeting scheduling** (create, view, update, delete meetings)
- **RESTful API backend** (Node.js + Express + MySQL)
- **Responsive Angular frontend**
- **BDD test scenarios** (Cucumber/Gherkin)

---

## 3. Sprint Planning

### Project: ClientManagement (CM)
**Methodology:** Agile Scrum
**Tool:** Jira Software

---

### Epics

| Epic ID | Epic Name        | Description                                                        |
|---------|------------------|--------------------------------------------------------------------|
| EP-1    | Client Module    | All features related to client registration and management         |
| EP-2    | Meeting Module   | All features related to scheduling and managing client meetings    |
| EP-3    | Authentication   | User registration, login, and JWT-based session management         |

---

### Sprint 1 – Setup & Authentication (2 weeks)

**Goal:** Set up the project infrastructure and implement user authentication.

| Story ID | User Story                                                                      | Story Points | Status |
|----------|---------------------------------------------------------------------------------|-------------|--------|
| CM-1     | As a user, I want to register with my name, email, address, and password        | 3           | Done   |
| CM-2     | As a user, I want to log in securely with email and password                    | 3           | Done   |
| CM-3     | As a developer, I want to set up the MySQL database with users/clients/meetings | 2           | Done   |
| CM-4     | As a developer, I want to create an Express REST API server                     | 3           | Done   |
| CM-5     | As a developer, I want to scaffold the Angular project with routing             | 2           | Done   |

**Sprint 1 Velocity:** 13 Story Points

---

### Sprint 2 – Client Management (2 weeks)

**Goal:** Implement full client management features.

| Story ID | User Story                                                                    | Story Points | Status |
|----------|-------------------------------------------------------------------------------|-------------|--------|
| CM-6     | As Anna, I want to create a new client with name, email, address, and company | 5           | Done   |
| CM-7     | As Anna, I want to view a list of all my clients                              | 3           | Done   |
| CM-8     | As Anna, I want to update an existing client's details                        | 3           | Done   |
| CM-9     | As Anna, I want to delete a client who is no longer active                    | 2           | Done   |
| CM-10    | As Anna, I want to see client status (active/inactive) at a glance            | 2           | Done   |

**Sprint 2 Velocity:** 15 Story Points

---

### Sprint 3 – Meeting Scheduling (2 weeks)

**Goal:** Implement meeting scheduling with client association.

| Story ID | User Story                                                                                        | Story Points | Status |
|----------|---------------------------------------------------------------------------------------------------|-------------|--------|
| CM-11    | As Anna, I want to add a new meeting schedule with the client in my software                      | 5           | Done   |
| CM-12    | As a user, I want to add a meeting with topic, number of people, date, and time                   | 3           | Done   |
| CM-13    | As Anna, I want to view all scheduled meetings in one list                                        | 3           | Done   |
| CM-14    | As Anna, I want to update a meeting's details (reschedule)                                        | 3           | Done   |
| CM-15    | As Anna, I want to mark a meeting as completed or cancelled                                       | 2           | Done   |

**Sprint 3 Velocity:** 16 Story Points

---

### Sprint 4 – Testing & BDD (1 week)

**Goal:** Write and execute BDD tests for all modules.

| Story ID | User Story                                                              | Story Points | Status |
|----------|-------------------------------------------------------------------------|-------------|--------|
| CM-16    | As a QA engineer, I want Gherkin scenarios for the registration module  | 3           | Done   |
| CM-17    | As a QA engineer, I want Gherkin scenarios for the login module         | 3           | Done   |
| CM-18    | As a QA engineer, I want Gherkin scenarios for the meeting module       | 3           | Done   |
| CM-19    | As a developer, I want step definitions wired to the API                | 5           | Done   |

**Sprint 4 Velocity:** 14 Story Points

---

## 4. Flow Diagrams

### 4.1 User Registration Flow

```
[User] → fills registration form (name, email, address, password)
       → Angular sends POST /api/auth/register
       → Express validates required fields
       → Checks for duplicate email in MySQL
       → Hashes password with bcrypt
       → Inserts user into `users` table
       → Returns 201 Created with userId
       → Angular redirects to /login
```

### 4.2 User Login Flow

```
[User] → fills login form (email, password)
       → Angular sends POST /api/auth/login
       → Express fetches user by email from MySQL
       → bcrypt.compare(inputPassword, storedHash)
       → Signs JWT token (expires in 24h)
       → Returns 200 OK with token + user info
       → Angular stores token in localStorage
       → Redirects to /clients dashboard
```

### 4.3 Client Management Flow

```
[User] → navigates to /clients
       → Angular GET /api/clients → displays client list
       → clicks "+ Add Client"
       → fills form (name, email, address, phone, company)
       → Angular POST /api/clients → MySQL INSERT
       → table refreshes with new client

[Edit] → click Edit → form pre-filled
       → Angular PUT /api/clients/:id → MySQL UPDATE

[Delete] → click Delete → confirm dialog
         → Angular DELETE /api/clients/:id → MySQL DELETE
```

### 4.4 Meeting Scheduling Flow

```
[User] → navigates to /meetings
       → Angular GET /api/meetings (with JOIN to clients)
       → displays meeting list

[Create] → clicks "+ Schedule Meeting"
         → fills meeting topic, number of people, start time, client
         → Angular POST /api/meetings → MySQL INSERT
         → list refreshes

[Update] → click Edit → form pre-filled
         → Angular PUT /api/meetings/:id → MySQL UPDATE
         → status can be changed to completed/cancelled
```

### 4.5 Database Entity Relationship

```
users (id, name, email, address, password, created_at)
    |
    | 1:N (created_by)
    ↓
meetings (id, meeting_topic, number_of_people, start_time,
          end_time, client_id, created_by, status, ...)
    ↑
    | N:1 (client_id)
clients (id, name, email, address, phone, company, status, ...)
```

---

## 5. Technologies Used

| Layer            | Technology              | Purpose                                                   |
|------------------|-------------------------|-----------------------------------------------------------|
| **Frontend**     | Angular 17              | Single-Page Application framework                         |
| **Frontend**     | TypeScript              | Type-safe JavaScript for Angular components               |
| **Frontend**     | HTML5 / CSS3            | UI markup and responsive styling                          |
| **Backend**      | Node.js v22             | JavaScript runtime for server-side code                   |
| **Backend**      | Express.js 4.x          | REST API framework                                        |
| **Database**     | MySQL 8.x               | Relational database for clients, meetings, and users      |
| **ORM/Driver**   | mysql2                  | MySQL driver with Promise support for Node.js             |
| **Auth**         | JWT (jsonwebtoken)      | Stateless authentication tokens                           |
| **Auth**         | bcryptjs                | Secure password hashing                                   |
| **Testing**      | Cucumber.js 10.x        | BDD testing framework                                     |
| **Testing**      | Gherkin                 | Human-readable BDD scenario language                      |
| **API Testing**  | Postman                 | Manual API testing and collection management              |
| **SCM**          | Git                     | Local version control                                     |
| **SCM**          | GitHub                  | Remote repository and collaboration                       |
| **Planning**     | Jira Software           | Agile sprint planning, epics, and user stories            |
| **Dev Tool**     | nodemon                 | Auto-restart backend during development                   |
| **Middleware**   | CORS                    | Cross-Origin Resource Sharing for Angular ↔ Express       |

---

## 6. Project Structure

```
assignment/
├── backend/                    # Node.js + Express API
│   ├── config/
│   │   └── db.js               # MySQL connection pool
│   ├── db/
│   │   └── schema.sql          # Database schema + seed data
│   ├── routes/
│   │   ├── auth.js             # POST /register, POST /login
│   │   ├── clients.js          # CRUD /api/clients
│   │   └── meetings.js         # CRUD /api/meetings
│   ├── .env.example            # Environment variable template
│   ├── package.json
│   └── server.js               # Express entry point
│
├── frontend/                   # Angular 17 SPA
│   └── src/app/
│       ├── components/
│       │   ├── registration/   # Register page
│       │   ├── login/          # Login page
│       │   ├── client/         # Client management page
│       │   └── meeting/        # Meeting scheduling page
│       ├── services/
│       │   ├── auth.service.ts
│       │   ├── client.service.ts
│       │   └── meeting.service.ts
│       ├── app.routes.ts       # Angular routing
│       └── app.config.ts
│
├── bdd/                        # Cucumber BDD tests
│   ├── features/
│   │   ├── registration.feature
│   │   ├── login.feature
│   │   └── meeting.feature
│   ├── step_definitions/
│   │   └── steps.js
│   ├── cucumber.js
│   └── package.json
│
└── docs/
    ├── writeup.md              # This document
    └── jira-guide.md           # Step-by-step Jira guide
```

---

## 7. API Endpoints Summary

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/auth/register     | Register a new user            |
| POST   | /api/auth/login        | Login and receive JWT token    |
| GET    | /api/clients           | Get all clients                |
| GET    | /api/clients/:id       | Get a single client            |
| POST   | /api/clients           | Create a new client            |
| PUT    | /api/clients/:id       | Update a client                |
| DELETE | /api/clients/:id       | Delete a client                |
| GET    | /api/meetings          | Get all meetings               |
| GET    | /api/meetings/:id      | Get a single meeting           |
| POST   | /api/meetings          | Schedule a new meeting         |
| PUT    | /api/meetings/:id      | Update a meeting               |
| DELETE | /api/meetings/:id      | Delete a meeting               |
