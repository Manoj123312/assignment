# Client Management Application — Project Writeup

---

## 1. Name

**Student / Developer:** Manoj  
**Project Name:** Client Management Application  
**Organization:** Henna Solutions (simulated)  
**Client:** Anna's Architectural Firm

---

## 2. Project Overview

### Problem Statement
Anna runs an Architectural firm. To manage her client meetings and projects, she needs project management software. Henna Solutions is developing a web application that allows Anna to:

- Register and log in to the system
- Create and manage client profiles
- Schedule, view, update, and delete client meetings
- Track meeting topics, number of attendees, and start times

### Objectives
- Build a full-stack client management application
- Create a RESTful backend API using Node.js and Express
- Design a relational database using MySQL
- Develop a responsive frontend using Angular
- Implement BDD tests using Cucumber and Gherkin
- Manage source code with Git and GitHub

---

## 3. Technologies Used

| Technology       | Purpose                                           |
|------------------|---------------------------------------------------|
| **Angular 17**   | Frontend SPA framework for UI components         |
| **TypeScript**   | Strongly-typed language for Angular              |
| **Node.js**      | JavaScript runtime for the backend server        |
| **Express.js**   | Web framework for building REST APIs             |
| **MySQL**        | Relational database for storing clients/meetings |
| **mysql2**       | Node.js MySQL client library                     |
| **bcryptjs**     | Password hashing for secure authentication      |
| **jsonwebtoken** | JWT-based authentication tokens                  |
| **Axios**        | HTTP client for BDD step definitions             |
| **Cucumber.js**  | BDD test framework                               |
| **Gherkin**      | BDD feature definition language                  |
| **Git**          | Source code version control                      |
| **GitHub**       | Remote repository hosting                        |
| **Postman**      | API testing and documentation                    |
| **Jira**         | Agile project management and sprint planning     |
| **HTML/CSS**     | Frontend markup and styling                      |

---

## 4. Sprint Planning

### Project: ClientManagement (CM) — Scrum Board

---

### Epic 1: Client Management
**Description:** All user stories related to managing client data in the system.

#### User Stories:

| Story ID | Title                       | Points | Status   |
|----------|-----------------------------|--------|----------|
| CM-1     | User Registration           | 3      | Done     |
| CM-2     | User Login                  | 3      | Done     |
| CM-3     | View All Clients             | 2      | Done     |
| CM-4     | Create a Client             | 3      | Done     |
| CM-5     | Update Client Details       | 2      | Done     |
| CM-6     | Delete a Client             | 2      | Done     |

---

### Epic 2: Client Meetings
**Description:** All user stories related to scheduling and managing client meetings.

#### User Stories:

| Story ID | Title                            | Points | Status   |
|----------|----------------------------------|--------|----------|
| CM-7     | Schedule a Meeting               | 5      | Done     |
| CM-8     | View All Meetings                | 2      | Done     |
| CM-9     | Edit a Meeting                   | 3      | Done     |
| CM-10    | Delete a Meeting                 | 2      | Done     |
| CM-11    | Associate Meeting with Client    | 3      | Done     |

---

### Sprint 1 — Setup & Registration (Week 1)
**Goal:** Set up project infrastructure and implement user registration/login.

| Task                         | Assignee | Status |
|------------------------------|----------|--------|
| Create GitHub repository     | Dev      | Done   |
| Set up MySQL database schema | Dev      | Done   |
| Build Express.js server      | Dev      | Done   |
| Implement registration API   | Dev      | Done   |
| Implement login API (JWT)    | Dev      | Done   |
| Create Angular project       | Dev      | Done   |
| Build Register component     | Dev      | Done   |
| Build Login component        | Dev      | Done   |

---

### Sprint 2 — Client & Meeting Management (Week 2)
**Goal:** Implement full CRUD for clients and meetings.

| Task                              | Assignee | Status |
|-----------------------------------|----------|--------|
| Build Clients API (CRUD)          | Dev      | Done   |
| Build Meetings API (CRUD)         | Dev      | Done   |
| Build Clients Angular component   | Dev      | Done   |
| Build Meetings Angular component  | Dev      | Done   |
| Add routing and navigation        | Dev      | Done   |
| Write BDD feature files           | Dev      | Done   |
| Write Cucumber step definitions   | Dev      | Done   |
| Test all APIs via Postman         | Dev      | Done   |

---

## 5. Flow Diagrams

### 5.1 Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                         │
│              Angular 17 SPA (port 4200)                     │
│   ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐   │
│   │ Register │  │  Login   │  │ Clients │  │Meetings  │   │
│   │Component │  │Component │  │Component│  │Component │   │
│   └────┬─────┘  └────┬─────┘  └────┬────┘  └────┬─────┘   │
│        └─────────────┴──────────────┴────────────┘         │
│                       HTTP (axios/HttpClient)               │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API calls
┌──────────────────────────────▼──────────────────────────────┐
│                 BACKEND (Node.js + Express)                  │
│                      server.js (port 3000)                  │
│                                                             │
│   /api/auth       /api/clients       /api/meetings          │
│   ┌──────────┐    ┌───────────┐      ┌───────────┐          │
│   │ register │    │   GET all │      │   GET all │          │
│   │  login   │    │  GET :id  │      │  GET :id  │          │
│   └──────────┘    │   POST    │      │   POST    │          │
│                   │  PUT :id  │      │  PUT :id  │          │
│                   │DELETE :id │      │DELETE :id │          │
│                   └─────┬─────┘      └─────┬─────┘          │
└─────────────────────────┼──────────────────┼────────────────┘
                          │  MySQL queries   │
┌─────────────────────────▼──────────────────▼────────────────┐
│                   DATABASE (MySQL)                          │
│              Database: client_management                    │
│                                                             │
│   ┌──────────────┐   ┌──────────────┐   ┌───────────────┐  │
│   │    users     │   │   clients    │   │   meetings    │  │
│   │─────────────│   │─────────────│   │──────────────│  │
│   │ id (PK)      │   │ id (PK)      │   │ id (PK)       │  │
│   │ name         │   │ name         │   │ client_id(FK) │  │
│   │ email        │   │ email        │   │ topic         │  │
│   │ address      │   │ address      │   │ num_people    │  │
│   │ password     │   │ phone        │   │ start_time    │  │
│   │ created_at   │   │ created_at   │   │ description   │  │
│   └──────────────┘   └──────────────┘   │ created_at    │  │
│                                         └───────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 User Registration Flow

```
User visits /register
       │
       ▼
Fills in Name, Email, Address, Password, Repeat Password
       │
       ▼
Form Validation (Angular Reactive Forms)
  ├── Invalid ──► Show inline error messages
  └── Valid ──► POST /api/auth/register
                    │
                    ▼
              Check if email exists
              ├── Exists ──► 409 "Email already registered"
              └── New ──► Hash password (bcrypt)
                              │
                              ▼
                       INSERT into users
                              │
                              ▼
                    201 "Registration successful"
                              │
                              ▼
                     Redirect to /login
```

### 5.3 Login Flow

```
User visits /login
       │
       ▼
Enters Email & Password
       │
       ▼
POST /api/auth/login
       │
       ▼
Query users table by email
  ├── Not found ──► 401 "Invalid credentials"
  └── Found ──► bcrypt.compare(password, hash)
                    ├── No match ──► 401 "Invalid credentials"
                    └── Match ──► Generate JWT token
                                      │
                                      ▼
                               200 { token, user }
                                      │
                                      ▼
                          Store token in localStorage
                                      │
                                      ▼
                            Redirect to /clients
```

### 5.4 Meeting Scheduling Flow

```
Authenticated user visits /meetings
       │
       ▼
Clicks "+ Schedule New Meeting"
       │
       ▼
Fills form: Client, Topic, # People, Start Time, Description
       │
       ▼
POST /api/meetings (with JWT in Authorization header)
       │
       ▼
Validate required fields
  ├── Missing ──► 400 Bad Request
  └── Valid ──► INSERT into meetings table
                    │
                    ▼
              201 "Meeting scheduled successfully"
                    │
                    ▼
           Reload meetings list (GET /api/meetings)
```

---

## 6. Database Design

### Entity Relationship Diagram (ERD)

```
USERS                        CLIENTS
─────────────────            ─────────────────
id (PK)                      id (PK)
name                         name
email (UNIQUE)               email (UNIQUE)
address                      address
password                     phone
created_at                   created_at
                                    │
                                    │ 1
                                    │
                             MEETINGS
                             ─────────────────
                             id (PK)
                             client_id (FK) ──┘
                             topic
                             number_of_people
                             start_time
                             description
                             created_at
```

---

## 7. API Endpoints

### Authentication
| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| POST   | /api/auth/register   | Register a new user |
| POST   | /api/auth/login      | Login user, get JWT |

### Clients
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | /api/clients       | Get all clients     |
| GET    | /api/clients/:id   | Get client by ID    |
| POST   | /api/clients       | Create new client   |
| PUT    | /api/clients/:id   | Update client       |
| DELETE | /api/clients/:id   | Delete client       |

### Meetings
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | /api/meetings       | Get all meetings     |
| GET    | /api/meetings/:id   | Get meeting by ID    |
| POST   | /api/meetings       | Schedule meeting     |
| PUT    | /api/meetings/:id   | Update meeting       |
| DELETE | /api/meetings/:id   | Delete meeting       |

---

## 8. BDD Scenarios Summary

| Module              | Scenario                          | Result |
|---------------------|-----------------------------------|--------|
| Registration        | Successful registration           | Pass   |
| Registration        | Duplicate email                   | Pass   |
| Registration        | Mismatched passwords              | Pass   |
| Registration        | Missing required fields           | Pass   |
| Login               | Successful login                  | Pass   |
| Login               | Invalid password                  | Pass   |
| Login               | Unregistered email                | Pass   |
| Login               | Empty fields                      | Pass   |
| Meeting Scheduling  | Schedule new meeting              | Pass   |
| Meeting Scheduling  | Schedule without topic            | Pass   |
| Meeting Scheduling  | Edit existing meeting             | Pass   |
| Meeting Scheduling  | Delete meeting                    | Pass   |
| Meeting Scheduling  | View all meetings                 | Pass   |

---

*Document prepared for Client Management Application assignment.*
