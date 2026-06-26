# Client Management Application

A full-stack web application for managing clients and meeting schedules, built with **Angular**, **Node.js/Express**, and **MySQL**.

---

## Project Structure

```
assignment/
├── backend/                  # Node.js + Express REST API
│   ├── config/
│   │   └── db.js             # MySQL database connection
│   ├── routes/
│   │   ├── auth.js           # Register & Login routes
│   │   ├── clients.js        # Client CRUD routes
│   │   └── meetings.js       # Meeting CRUD routes
│   ├── .env.example          # Environment variables template
│   ├── package.json
│   └── server.js             # Main Express server
│
├── frontend/                 # Angular 17 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── register/ # Registration form
│   │   │   │   ├── login/    # Login form
│   │   │   │   ├── clients/  # Client management
│   │   │   │   └── meetings/ # Meeting scheduling
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── client.service.ts
│   │   │   │   └── meeting.service.ts
│   │   │   ├── app.component.*
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── environments/
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── bdd/                      # Cucumber BDD tests
│   ├── features/
│   │   ├── registration.feature
│   │   ├── login.feature
│   │   └── meeting_scheduling.feature
│   ├── step-definitions/
│   │   ├── registration.steps.js
│   │   ├── login.steps.js
│   │   └── meeting_scheduling.steps.js
│   ├── .cucumber.json
│   └── package.json
│
├── database/
│   └── schema.sql            # MySQL schema and sample data
│
└── docs/
    ├── project-writeup.md    # Full project writeup
    └── jira-guide.md         # Jira setup instructions
```

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later): https://nodejs.org/
- **npm** (comes with Node.js)
- **MySQL** (v8.0 or later): https://dev.mysql.com/downloads/
- **Angular CLI** (v17): `npm install -g @angular/cli`
- **Git**: https://git-scm.com/

---

## Setup and Run Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Manoj123312/assignment.git
cd assignment
```

### Step 2: Set Up the MySQL Database

1. Open MySQL Workbench or MySQL CLI
2. Run the schema file:

```bash
# In MySQL CLI:
mysql -u root -p < database/schema.sql
```

This creates:
- Database: `client_management`
- Tables: `users`, `clients`, `meetings`
- Sample data (2 clients, 2 meetings)

### Step 3: Configure and Start the Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env
```

Edit `.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=client_management
PORT=3000
JWT_SECRET=your_secure_jwt_secret_here
```

Start the backend server:
```bash
npm run dev
```

The backend will run at: **http://localhost:3000**

### Step 4: Start the Angular Frontend

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start the Angular development server
ng serve
```

The frontend will run at: **http://localhost:4200**

---

## Testing with Postman

### Base URL: `http://localhost:3000/api`

#### 1. Register a User
- **POST** `/api/auth/register`
```json
{
  "name": "Anna Smith",
  "email": "anna@example.com",
  "address": "123 Main Street",
  "password": "secure123"
}
```

#### 2. Login
- **POST** `/api/auth/login`
```json
{
  "email": "anna@example.com",
  "password": "secure123"
}
```
> Copy the `token` from the response for authenticated requests.

#### 3. Get All Clients
- **GET** `/api/clients`
- Header: Set Authorization to "Bearer" followed by the token from step 2

#### 4. Create a Client
- **POST** `/api/clients`
```json
{
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "address": "456 Oak Avenue",
  "phone": "555-0102"
}
```

#### 5. Schedule a Meeting
- **POST** `/api/meetings`
```json
{
  "client_id": 1,
  "topic": "Project Kickoff Meeting",
  "number_of_people": 5,
  "start_time": "2024-03-20 09:00:00",
  "description": "Initial project discussion"
}
```

#### 6. Get All Meetings
- **GET** `/api/meetings`
- Header: Set Authorization to "Bearer" followed by the token from step 2

---

## Running BDD Tests (Cucumber)

> The backend must be running before running BDD tests.

```bash
cd bdd
npm install
npm test
```

---

## API Endpoints

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| POST   | /api/auth/register     | Register a new user  |
| POST   | /api/auth/login        | Login, get JWT token |
| GET    | /api/clients           | Get all clients      |
| POST   | /api/clients           | Create a client      |
| PUT    | /api/clients/:id       | Update a client      |
| DELETE | /api/clients/:id       | Delete a client      |
| GET    | /api/meetings          | Get all meetings     |
| POST   | /api/meetings          | Schedule a meeting   |
| PUT    | /api/meetings/:id      | Update a meeting     |
| DELETE | /api/meetings/:id      | Delete a meeting     |

---

## Documentation

- **Project Writeup:** `docs/project-writeup.md`
- **Jira Setup Guide:** `docs/jira-guide.md`
