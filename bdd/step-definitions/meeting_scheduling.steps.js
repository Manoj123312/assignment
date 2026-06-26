const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

const BASE_URL = 'http://localhost:3000/api';

let response;
let requestData = {};
let lastError;
let authToken;
let meetingsList = [];

// ───────────────────────────────────────────────
// Background / Setup
// ───────────────────────────────────────────────

Given('I am logged in as {string}', async function (email) {
  const res = await axios.post(`${BASE_URL}/auth/login`, { email, password: 'secure123' }).catch(() => null);
  authToken = res?.data?.token || null;
});

Given('the meetings page is open', function () {
  requestData = {};
});

Given('I am on the meetings page', function () {
  requestData = {};
});

Given('I am logged in', async function () {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email: 'anna@example.com',
    password: 'secure123'
  }).catch(() => null);
  authToken = res?.data?.token || null;
});

// ───────────────────────────────────────────────
// When steps
// ───────────────────────────────────────────────

When('I click the {string} button', function (btnLabel) {
  // Button click simulated by setting a flag
  requestData.action = btnLabel;
});

When('I select client {string}', function (clientName) {
  requestData.client_name = clientName;
});

When('I enter meeting topic {string}', function (topic) {
  requestData.topic = topic;
});

When('I leave the meeting topic empty', function () {
  requestData.topic = '';
});

When('I enter number of people {string}', function (num) {
  requestData.number_of_people = parseInt(num);
});

When('I enter start time {string}', function (time) {
  requestData.start_time = time;
});

When('I enter description {string}', function (desc) {
  requestData.description = desc;
});

When('I change the topic to {string}', function (topic) {
  requestData.topic = topic;
});

When('I change the number of people to {string}', function (num) {
  requestData.number_of_people = parseInt(num);
});

When('I click the Edit button for {string}', async function (topic) {
  const res = await axios.get(`${BASE_URL}/meetings`, {
    headers: { Authorization: 'Bearer ' + authToken }
  }).catch(() => null);
  const meeting = res?.data?.find(m => m.topic === topic);
  requestData.editId = meeting?.id;
  requestData.topic = topic;
});

When('I click the Delete button for {string}', async function (topic) {
  const res = await axios.get(`${BASE_URL}/meetings`, {
    headers: { Authorization: 'Bearer ' + authToken }
  }).catch(() => null);
  const meeting = res?.data?.find(m => m.topic === topic);
  requestData.deleteId = meeting?.id;
});

When('I confirm the deletion', async function () {
  try {
    response = await axios.delete(`${BASE_URL}/meetings/${requestData.deleteId}`, {
      headers: { Authorization: 'Bearer ' + authToken }
    });
    lastError = null;
  } catch (err) {
    lastError = err.response;
    response = null;
  }
});

When('I navigate to the meetings page', async function () {
  try {
    response = await axios.get(`${BASE_URL}/meetings`, {
      headers: { Authorization: 'Bearer ' + authToken }
    });
    meetingsList = response.data;
    lastError = null;
  } catch (err) {
    lastError = err.response;
  }
});

// ───────────────────────────────────────────────
// Then steps
// ───────────────────────────────────────────────

Then('I should see the message {string}', function (expectedMsg) {
  const actualMsg = response?.data?.message || '';
  assert.ok(
    actualMsg.toLowerCase().includes(expectedMsg.toLowerCase()),
    `Expected message to include "${expectedMsg}" but got "${actualMsg}"`
  );
});

Then('the meeting {string} should appear in the meetings list', async function (topic) {
  const res = await axios.get(`${BASE_URL}/meetings`, {
    headers: { Authorization: 'Bearer ' + authToken }
  });
  const found = res.data.find(m => m.topic === topic);
  assert.ok(found, `Meeting "${topic}" not found in the list`);
});

Then('I should see the error {string}', function (expectedError) {
  const errorMsg = lastError?.data?.message || '';
  assert.ok(
    errorMsg.toLowerCase().includes(expectedError.toLowerCase()),
    `Expected error "${expectedError}" but got "${errorMsg}"`
  );
});

Then('I should see all scheduled meetings in a table', function () {
  assert.ok(Array.isArray(meetingsList), 'Meetings response should be an array');
});

Then('each meeting should show client name, topic, number of people, and start time', function () {
  if (meetingsList.length > 0) {
    const m = meetingsList[0];
    assert.ok('topic' in m, 'Meeting should have a topic');
    assert.ok('number_of_people' in m, 'Meeting should have number_of_people');
    assert.ok('start_time' in m, 'Meeting should have start_time');
  }
});

Then('the meeting {string} should not appear in the meetings list', async function (topic) {
  const res = await axios.get(`${BASE_URL}/meetings`, {
    headers: { Authorization: 'Bearer ' + authToken }
  });
  const found = res.data.find(m => m.topic === topic);
  assert.ok(!found, `Meeting "${topic}" should have been deleted but still exists`);
});

Given('there is a meeting {string} in the system', async function (topic) {
  const res = await axios.post(`${BASE_URL}/meetings`, {
    topic,
    number_of_people: 3,
    start_time: '2024-06-01 10:00:00',
    description: 'Test meeting'
  }, {
    headers: { Authorization: 'Bearer ' + authToken }
  }).catch(() => null);
  requestData.meetingId = res?.data?.meetingId;
  requestData.topic = topic;
});

// Inline schedule action (used after all data is set)
Given('I click the {string} button to schedule', async function (label) {
  try {
    response = await axios.post(`${BASE_URL}/meetings`, {
      topic: requestData.topic,
      number_of_people: requestData.number_of_people,
      start_time: requestData.start_time,
      description: requestData.description || ''
    }, {
      headers: { Authorization: 'Bearer ' + authToken }
    });
    lastError = null;
  } catch (err) {
    lastError = err.response;
    response = null;
  }
});
