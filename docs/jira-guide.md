# Jira Setup Guide — Client Management Project

## Step 1: Create a Jira Account

1. Go to [https://www.atlassian.com/software/jira](https://www.atlassian.com/software/jira)
2. Click **"Get it free"**
3. Sign up with your email or Google account
4. Choose **"Jira Software"** as your product
5. Create your site (e.g., `yourname.atlassian.net`)

---

## Step 2: Create a New Project

1. Once logged in, click **"Create project"** from the Projects menu
2. Select **"Scrum"** as the project template (sprint toward project goals with a board, backlog, and roadmap)
3. Select type: **"Team-managed"**
4. Fill in project details:
   - **Name:** `ClientManagement`
   - **Key:** `CM`
5. Click **"Create project"**

---

## Step 3: Create Epics

Epics are large bodies of work that can be broken down into smaller stories.

### Create Epic 1: Client Management

1. In the left sidebar, click **"Backlog"**
2. Click **"Create Epic"** (or use the Roadmap view)
3. Enter:
   - **Summary:** `Client Management`
   - **Description:** `Manage all client-related operations including registration, profile management, and client data`
4. Click **"Create"**

### Create Epic 2: Client Meetings

1. Create another Epic:
   - **Summary:** `Client Meetings`
   - **Description:** `Manage meeting schedules, topics, attendees, and meeting times for clients`
2. Click **"Create"**

---

## Step 4: Create User Stories

User stories describe functionality from the end-user perspective.

### How to Create a User Story

1. Click **"Create"** in the top navigation bar
2. Set:
   - **Project:** ClientManagement (CM)
   - **Issue Type:** Story
3. Fill in the details below for each story

---

### Epic: Client Management — User Stories

#### Story CM-1: User Registration
- **Summary:** User Registration
- **Description:**
  ```
  As Anna, I want to register a new account in the client management software
  So that I can securely access the system

  Acceptance Criteria:
  - User can fill in Name, Email, Address, Password, Repeat Password
  - System validates all required fields
  - Passwords must match
  - Email must be unique
  - Successful registration redirects to login page
  ```
- **Story Points:** 3

#### Story CM-2: User Login
- **Summary:** User Login
- **Description:**
  ```
  As Anna, I want to log into the system
  So that I can access my client and meeting data

  Acceptance Criteria:
  - User can log in with email and password
  - Invalid credentials show an error message
  - Successful login returns JWT token and redirects to clients page
  ```
- **Story Points:** 3

#### Story CM-3: View All Clients
- **Summary:** View All Clients
- **Description:**
  ```
  As Anna, I want to see a list of all my clients
  So that I can manage them easily

  Acceptance Criteria:
  - Clients are shown in a table with Name, Email, Address, Phone
  - Table is sorted by most recently added
  ```
- **Story Points:** 2

#### Story CM-4: Create a Client
- **Summary:** Create a Client
- **Description:**
  ```
  As Anna, I want to add a new client to my system
  So that I can track their information and schedule meetings with them

  Acceptance Criteria:
  - Form accepts Name, Email, Address, Phone
  - Name and Email are required
  - Duplicate email shows an error
  - New client appears in the list after creation
  ```
- **Story Points:** 3

#### Story CM-5: Edit a Client
- **Summary:** Edit Client Details
- **Description:**
  ```
  As Anna, I want to edit an existing client's details
  So that the information stays up to date

  Acceptance Criteria:
  - Edit form is pre-filled with existing data
  - Changes are saved successfully
  ```
- **Story Points:** 2

#### Story CM-6: Delete a Client
- **Summary:** Delete a Client
- **Description:**
  ```
  As Anna, I want to remove a client from the system
  So that my client list stays relevant

  Acceptance Criteria:
  - Confirmation prompt before deletion
  - Client is removed from the list after deletion
  ```
- **Story Points:** 2

---

### Epic: Client Meetings — User Stories

#### Story CM-7: Schedule a Meeting
- **Summary:** ClientMeeting — Schedule a Meeting
- **Description:**
  ```
  As Anna, I want to add a new meeting schedule with a client in my software
  As a user, I want to be able to add a new meeting schedule with basic details
  like meeting topic, how many people will be involved, what's the date and what's
  the time to start the meeting.

  Acceptance Criteria:
  - Form accepts Meeting Topic, Number of People, Start Time (date + time), Description
  - Client can be selected from a dropdown
  - Topic, Number of People, and Start Time are required
  - New meeting appears in the meetings list after scheduling
  ```
- **Story Points:** 5

#### Story CM-8: View All Meetings
- **Summary:** View All Scheduled Meetings
- **Description:**
  ```
  As Anna, I want to see all my scheduled meetings
  So that I can plan my workday effectively

  Acceptance Criteria:
  - Meetings displayed in a table showing: Client, Topic, People, Start Time
  - Sorted by most recent start time
  ```
- **Story Points:** 2

#### Story CM-9: Edit a Meeting
- **Summary:** Edit Meeting Details
- **Description:**
  ```
  As Anna, I want to update meeting details
  So that I can reflect any changes in schedule or attendees

  Acceptance Criteria:
  - Edit form is pre-filled with current meeting data
  - All fields are editable
  - Changes persist after saving
  ```
- **Story Points:** 3

#### Story CM-10: Delete a Meeting
- **Summary:** Delete a Meeting
- **Description:**
  ```
  As Anna, I want to cancel (delete) a meeting
  So that I can remove meetings that are no longer needed

  Acceptance Criteria:
  - Confirmation before deletion
  - Meeting is removed from the list
  ```
- **Story Points:** 2

#### Story CM-11: Associate Meeting with Client
- **Summary:** Link Meeting to Client
- **Description:**
  ```
  As Anna, I want meetings to be linked to specific clients
  So that I can track which meetings belong to which client

  Acceptance Criteria:
  - Meeting form has a client dropdown
  - Client name is shown in the meetings table
  ```
- **Story Points:** 3

---

## Step 5: Create and Start a Sprint

### Create a Sprint

1. Go to **Backlog** in the left sidebar
2. Click **"Create Sprint"** button at the top of the backlog
3. This creates **Sprint 1**

### Add Stories to Sprint

1. Drag user stories from the backlog into the sprint, OR
2. Right-click a story and select **"Move to Sprint"**
3. Add these stories to Sprint 1:
   - CM-1: User Registration
   - CM-2: User Login
   - CM-3: View All Clients
   - CM-4: Create a Client
   - CM-7: Schedule a Meeting
   - CM-8: View All Meetings

### Start the Sprint

1. Click **"Start Sprint"** on Sprint 1
2. Set sprint details:
   - **Sprint Name:** Sprint 1 — Core Features
   - **Duration:** 2 weeks
   - **Start Date:** Today
   - **End Date:** 2 weeks from today
   - **Sprint Goal:** Implement user registration, login, and core client/meeting management
3. Click **"Start"**

### Work with the Board

1. Go to **Board** in the left sidebar
2. Move stories across columns:
   - **To Do** → **In Progress** → **Done**
3. Update story status as you complete tasks

---

## Tips

- Use the **Roadmap** view to see all epics and their stories
- Add **sub-tasks** to stories for granular task tracking
- Use **Labels** to categorize stories (e.g., `backend`, `frontend`, `bdd`)
- Use **Story Points** to estimate effort (1, 2, 3, 5, 8, 13...)
- Close the sprint after the 2-week period and review in a **Sprint Retrospective**
