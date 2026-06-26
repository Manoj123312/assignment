# Jira Project Setup Guide – Client Management Application

## Step-by-Step Instructions

---

## 1. Create a Project in Jira

1. Go to [https://www.atlassian.com/software/jira](https://www.atlassian.com/software/jira) and sign in (or create a free account).
2. Click **"Create project"** from the Projects menu.
3. Select **"Scrum"** as the project template (for sprint-based development).
4. Choose **"Team-managed"** project type.
5. Enter project details:
   - **Name:** `ClientManagement`
   - **Key:** `CM`
6. Click **"Create project"**.

---

## 2. Create Epics

1. In your project, click **"Backlog"** in the left sidebar.
2. Click **"Create"** (top navigation bar).
3. Set **Issue Type** to **"Epic"**.
4. Create the following epics one by one:

   | Epic Name             | Description                                           |
   |-----------------------|-------------------------------------------------------|
   | **Client Module**     | All features related to client registration/management|
   | **Meeting Module**    | All features for scheduling/managing meetings         |
   | **Authentication**    | User registration and login functionality             |

5. Click **"Create"** after filling in each epic's details.

---

## 3. Create User Stories in the Epics

1. Click **"Create"** again (top navigation bar).
2. Set **Issue Type** to **"Story"**.
3. Fill in the **Summary** (user story title).
4. In the **"Epic Link"** or **"Parent"** field, select the relevant epic.
5. Add a **Description** in this format:
   ```
   As [role], I want to [action] so that [benefit].
   
   Acceptance Criteria:
   - Given [condition], When [action], Then [result]
   ```
6. Create the following stories:

   **Authentication Epic:**
   - `CM-1` – As a user, I want to register with my name, email, address, and password
   - `CM-2` – As a user, I want to log in with my email and password and receive a session token

   **Client Module Epic:**
   - `CM-6` – As Anna, I want to create a new client with basic details
   - `CM-7` – As Anna, I want to view all my clients in a list
   - `CM-8` – As Anna, I want to update a client's information
   - `CM-9` – As Anna, I want to delete a client who is no longer active

   **Meeting Module Epic:**
   - `CM-11` – As Anna, I want to add a new meeting schedule with the client in my software
   - `CM-12` – As a user, I want to add a meeting with basic details like meeting topic, how many people will be involved, the date and the time to start the meeting
   - `CM-13` – As Anna, I want to view all scheduled meetings
   - `CM-14` – As Anna, I want to update or reschedule a meeting

---

## 4. Create and Start a Sprint

1. In **Backlog**, scroll to the top and click **"Create Sprint"**.
2. You'll see "Sprint 1" created with an empty sprint backlog.
3. Drag stories from the Backlog into **Sprint 1**:
   - Select CM-1, CM-2, CM-3, CM-4, CM-5 for Sprint 1.
4. Click **"Start Sprint"**.
5. Fill in:
   - **Sprint name:** `Sprint 1 – Setup & Auth`
   - **Duration:** 2 weeks
   - **Start date:** Today's date
   - **End date:** 2 weeks from today
   - **Sprint goal:** Set up the project and implement user authentication
6. Click **"Start"**.
7. Repeat for Sprint 2, 3, and 4 as stories are completed.

---

## 5. Managing the Board

- Go to **"Board"** in the left sidebar to see the Kanban/Scrum board.
- Move issues across columns: **To Do → In Progress → Done**
- Use the **"Roadmap"** view to see epics and their timelines.
- Use **"Reports"** to view Burndown Charts and velocity.

---

## 6. Linking GitHub Repository to Jira

1. In Jira, go to **Project Settings → Apps → GitHub**.
2. Connect your GitHub account.
3. Select the `assignment` repository.
4. Now commits/PRs that include story IDs (e.g., `CM-1`) will automatically link to Jira issues.

> **Tip:** In commit messages, include the Jira story ID, e.g.:
> `git commit -m "CM-1: Add user registration endpoint"`

---

## 7. Sample Jira User Story Format

**Summary:** As Anna, I want to add a new meeting schedule with the client in my software

**Issue Type:** Story
**Epic Link:** Meeting Module
**Story Points:** 5
**Priority:** High

**Description:**
```
As Anna, I want to add a new meeting schedule with the client in my software.
As a user, I want to be able to add a new meeting schedule with basic details
like meeting topic, how many people will be involved, what's the date and
what's the time to start the meeting.

Acceptance Criteria:
- Given I am logged in, When I navigate to meetings, Then I see the meeting list
- Given I click Schedule Meeting, When I fill the form and submit, Then a new meeting is created
- Given I submit with missing topic, When the API validates, Then I get a 400 error
```
