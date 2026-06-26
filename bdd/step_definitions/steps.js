const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const assert = require('assert');
const axios = require('axios');

let baseUrl = '';
let response = null;
let registeredEmail = null;

// ─── Background ──────────────────────────────────────────────────────────────
Given('the API server is running at {string}', (url) => {
  baseUrl = url;
});

// ─── Registration steps ───────────────────────────────────────────────────────
Given('I have valid registration details', async (dataTable) => {
  const row = dataTable.hashes()[0];
  this.registrationPayload = {
    name: row.name,
    email: row.email,
    address: row.address,
    password: row.password
  };
});

When('I send a POST request to {string} with the registration details', async (path) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, this.registrationPayload);
  } catch (err) {
    response = err.response;
  }
});

Given('a user with email {string} already exists', async (email) => {
  registeredEmail = email;
  try {
    await axios.post(`${baseUrl}/api/auth/register`, {
      name: 'Existing User',
      email,
      password: 'Password@123'
    });
  } catch (_) { /* ignore if already exists */ }
});

When('I send a POST request to {string} with email {string}', async (path, email) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, {
      name: 'Test User',
      email,
      password: 'Password@123'
    });
  } catch (err) {
    response = err.response;
  }
});

When('I send a POST request to {string} with missing name field', async (path) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, {
      email: 'noname@example.com',
      password: 'Password@123'
    });
  } catch (err) {
    response = err.response;
  }
});

When('I send a POST request to {string} without a password', async (path) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, {
      name: 'No Password',
      email: 'nopassword@example.com'
    });
  } catch (err) {
    response = err.response;
  }
});

// ─── Login steps ──────────────────────────────────────────────────────────────
Given('a registered user with email {string} and password {string}', async (email, password) => {
  this.loginEmail = email;
  this.loginPassword = password;
  try {
    await axios.post(`${baseUrl}/api/auth/register`, {
      name: 'Login Test User',
      email,
      password
    });
  } catch (_) { /* already registered */ }
});

When('I send a POST request to {string} with valid credentials', async (path) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, {
      email: this.loginEmail,
      password: this.loginPassword
    });
  } catch (err) {
    response = err.response;
  }
});

When('I send a POST request to {string} with an incorrect password', async (path) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, {
      email: this.loginEmail,
      password: 'WrongPassword999'
    });
  } catch (err) {
    response = err.response;
  }
});

When('I send a POST request to {string} with email {string}', async (path, email) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, {
      email,
      password: 'SomePassword@1'
    });
  } catch (err) {
    response = err.response;
  }
});

When('I send a POST request to {string} without an email', async (path) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, { password: 'Password@123' });
  } catch (err) {
    response = err.response;
  }
});

// ─── Meeting steps ────────────────────────────────────────────────────────────
Given('I have valid meeting details', async (dataTable) => {
  const row = dataTable.hashes()[0];
  this.meetingPayload = {
    meeting_topic: row.meeting_topic,
    number_of_people: parseInt(row.number_of_people),
    start_time: row.start_time
  };
});

When('I send a POST request to {string} with the meeting details', async (path) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, this.meetingPayload);
  } catch (err) {
    response = err.response;
  }
});

Given('a client exists with ID {int}', (_id) => { /* assume seeded */ });

When('I schedule a meeting with topic {string} for client ID {int}', async (topic, clientId) => {
  try {
    response = await axios.post(`${baseUrl}/api/meetings`, {
      meeting_topic: topic,
      number_of_people: 3,
      start_time: '2024-12-05T14:00',
      client_id: clientId
    });
  } catch (err) {
    response = err.response;
  }
});

When('I send a GET request to {string}', async (path) => {
  try {
    response = await axios.get(`${baseUrl}${path}`);
  } catch (err) {
    response = err.response;
  }
});

When('I send a POST request to {string} without a meeting topic', async (path) => {
  try {
    response = await axios.post(`${baseUrl}${path}`, {
      number_of_people: 3,
      start_time: '2024-12-01T09:00'
    });
  } catch (err) {
    response = err.response;
  }
});

Given('a meeting exists with ID {int}', (_id) => { /* assume seeded */ });

When('I send a DELETE request to {string}', async (path) => {
  try {
    response = await axios.delete(`${baseUrl}${path}`);
  } catch (err) {
    response = err.response;
  }
});

When('I send a PUT request to {string} with status {string}', async (path, status) => {
  try {
    response = await axios.put(`${baseUrl}${path}`, {
      meeting_topic: 'Updated Topic',
      number_of_people: 4,
      start_time: '2024-12-02T10:00',
      status
    });
  } catch (err) {
    response = err.response;
  }
});

// ─── Assertions ───────────────────────────────────────────────────────────────
Then('the response status should be {int}', (expectedStatus) => {
  assert.strictEqual(response.status, expectedStatus,
    `Expected status ${expectedStatus} but got ${response.status}`);
});

Then('the response should contain {string}', (expectedText) => {
  const body = JSON.stringify(response.data);
  assert.ok(body.includes(expectedText),
    `Expected response to contain "${expectedText}" but got: ${body}`);
});

Then('the response should contain a JWT token', () => {
  assert.ok(response.data.token, 'Expected a JWT token in the response');
});

Then("the response should contain the user's name", () => {
  assert.ok(response.data.user && response.data.user.name, 'Expected user name in response');
});

Then('the response should contain a meeting ID', () => {
  assert.ok(response.data.meetingId, 'Expected meetingId in response');
});

Then('the response should be a list of meetings', () => {
  assert.ok(Array.isArray(response.data), 'Expected an array of meetings');
});
