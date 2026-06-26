# Client Management Application

A full-stack client management system for Anna's Architectural Firm, built with Angular + Node.js/Express + MySQL.

## 📁 Project Structure

```
assignment/
├── backend/        # Node.js + Express REST API
├── frontend/       # Angular 17 SPA
├── bdd/            # Cucumber BDD tests
└── docs/           # Writeup and Jira guide
```

---

## 🚀 How to Run the Application on Your Local Machine

### Prerequisites

Install the following on your local machine:
- [Node.js v18+](https://nodejs.org/)
- [MySQL 8.x](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`

---

### Step 1 – Clone the Repository

```bash
git clone https://github.com/Manoj123312/assignment.git
cd assignment
```

---

### Step 2 – Set Up the MySQL Database

1. Open MySQL Workbench or your MySQL terminal.
2. Run the schema file:
   ```sql
   source path/to/assignment/backend/db/schema.sql
   ```
   Or copy-paste the contents of `backend/db/schema.sql` into MySQL Workbench and execute.

This creates the `client_management` database with `users`, `clients`, and `meetings` tables, and inserts sample data.

---

### Step 3 – Configure and Start the Backend

```bash
cd backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
```

Edit `.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=client_management
JWT_SECRET=my_super_secret_key
PORT=3000
```

Start the server:
```bash
npm start
# OR for auto-reload during development:
npm run dev
```

✅ You should see:
```
Server running on http://localhost:3000
MySQL connected successfully
```

---

### Step 4 – Start the Angular Frontend

Open a **new terminal window**:

```bash
cd frontend

# Install dependencies
npm install

# Start the Angular development server
ng serve
```

✅ Open your browser at: **http://localhost:4200**

---

### Step 5 – Use the Application

1. Navigate to **Register** → fill in the form → click Register
2. Navigate to **Login** → enter credentials → you'll be redirected to Clients
3. Add/Edit/Delete clients from the **Clients** page
4. Schedule meetings from the **Meetings** page

---

## 🧪 Testing with Postman

### Import the Collection

Use these manual requests in Postman (base URL: `http://localhost:3000`):

---

#### 1. Health Check
- **Method:** GET
- **URL:** `http://localhost:3000/`
- **Expected Response (200):**
  ```json
  { "message": "Client Management API is running", "version": "1.0.0" }
  ```

---

#### 2. Register a User
- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "Anna Smith",
    "email": "anna@example.com",
    "address": "123 Main Street",
    "password": "Password@123"
  }
  ```
- **Expected Response (201):**
  ```json
  { "message": "User registered successfully", "userId": 1 }
  ```

---

#### 3. Login
- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "anna@example.com",
    "password": "Password@123"
  }
  ```
- **Expected Response (200):**
  ```json
  {
    "message": "Login successful",
    "token": "******",
    "user": { "id": 1, "name": "Anna Smith", "email": "anna@example.com" }
  }
  ```
- **Copy the `token` value** — you'll use it for authenticated requests.

---

#### 4. Get All Clients
- **Method:** GET
- **URL:** `http://localhost:3000/api/clients`
- **Expected Response (200):** Array of client objects

---

#### 5. Create a Client
- **Method:** POST
- **URL:** `http://localhost:3000/api/clients`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "Bob Johnson",
    "email": "bob@company.com",
    "address": "456 Oak Ave",
    "phone": "555-0102",
    "company": "Johnson Designs"
  }
  ```
- **Expected Response (201):**
  ```json
  { "message": "Client created successfully", "clientId": 3 }
  ```

---

#### 6. Update a Client
- **Method:** PUT
- **URL:** `http://localhost:3000/api/clients/1`
- **Body (raw JSON):**
  ```json
  {
    "name": "Anna Updated",
    "email": "anna.updated@example.com",
    "address": "789 Pine Rd",
    "phone": "555-9999",
    "company": "Smith Architecture",
    "status": "active"
  }
  ```

---

#### 7. Delete a Client
- **Method:** DELETE
- **URL:** `http://localhost:3000/api/clients/2`
- **Expected Response (200):**
  ```json
  { "message": "Client deleted successfully" }
  ```

---

#### 8. Schedule a Meeting
- **Method:** POST
- **URL:** `http://localhost:3000/api/meetings`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "meeting_topic": "Design Review",
    "number_of_people": 4,
    "start_time": "2024-12-01 09:00:00",
    "end_time": "2024-12-01 10:00:00",
    "client_id": 1
  }
  ```
- **Expected Response (201):**
  ```json
  { "message": "Meeting scheduled successfully", "meetingId": 3 }
  ```

---

#### 9. Get All Meetings
- **Method:** GET
- **URL:** `http://localhost:3000/api/meetings`
- **Expected Response (200):** Array of meeting objects with client names

---

#### 10. Update Meeting Status
- **Method:** PUT
- **URL:** `http://localhost:3000/api/meetings/1`
- **Body (raw JSON):**
  ```json
  {
    "meeting_topic": "Project Kickoff",
    "number_of_people": 5,
    "start_time": "2024-12-01 09:00:00",
    "status": "completed"
  }
  ```

---

#### 11. Delete a Meeting
- **Method:** DELETE
- **URL:** `http://localhost:3000/api/meetings/2`

---

## 🥒 Running BDD Tests

> **Note:** The backend must be running before executing BDD tests.

```bash
cd bdd
npm install
npm test
```

Run individual feature tests:
```bash
npm run test:registration
npm run test:login
npm run test:meeting
```

---

## 📄 Documentation

- **Project Writeup:** [`docs/writeup.md`](docs/writeup.md) — Name, sprint planning, flow diagrams, technologies
- **Jira Guide:** [`docs/jira-guide.md`](docs/jira-guide.md) — Step-by-step Jira setup instructions

---

## 🛠 Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | Angular 17, TypeScript, CSS   |
| Backend   | Node.js, Express.js           |
| Database  | MySQL 8.x                     |
| Auth      | JWT, bcryptjs                 |
| Testing   | Cucumber.js, Gherkin (BDD)    |
| API Test  | Postman                       |
| SCM       | Git + GitHub                  |
| Planning  | Jira (Agile/Scrum)            |
