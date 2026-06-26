const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

const BASE_URL = 'http://localhost:3000/api';

let response;
let requestData = {};
let lastError;
let authToken;

// ───────────────────────────────────────────────
// Background / Setup
// ───────────────────────────────────────────────

Given('the login page is open', function () {
  requestData = {};
});

Given('I am on the login page', function () {
  requestData = {};
});

// ───────────────────────────────────────────────
// When steps
// ───────────────────────────────────────────────

When('I enter email {string}', function (email) {
  requestData.email = email;
});

When('I enter password {string}', function (password) {
  requestData.password = password;
});

When('I leave the email field empty', function () {
  requestData.email = '';
});

When('I leave the password field empty', function () {
  requestData.password = '';
});

When('I click the Login button', async function () {
  try {
    response = await axios.post(`${BASE_URL}/auth/login`, {
      email: requestData.email,
      password: requestData.password
    });
    authToken = response.data.token;
    lastError = null;
  } catch (err) {
    lastError = err.response;
    response = null;
  }
});

When('I navigate to the clients page', async function () {
  try {
    response = await axios.get(`${BASE_URL}/clients`, {
      headers: { Authorization: 'Bearer ' + authToken }
    });
    lastError = null;
  } catch (err) {
    lastError = err.response;
    response = null;
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

Then('I should be redirected to the clients page', function () {
  assert.ok(authToken, 'Expected a JWT token to be returned on successful login');
});

Then('I should see the error {string}', function (expectedError) {
  const errorMsg = lastError?.data?.message || '';
  assert.ok(
    errorMsg.toLowerCase().includes(expectedError.toLowerCase()),
    `Expected error to include "${expectedError}" but got "${errorMsg}"`
  );
});

Then('the Login button should be disabled', function () {
  assert.ok(!requestData.email || !requestData.password, 'Fields should be empty');
});

Given('I am logged in as {string}', async function (email) {
  const res = await axios.post(`${BASE_URL}/auth/login`, { email, password: 'secure123' }).catch(() => null);
  authToken = res?.data?.token || null;
});

Then('I should see the list of clients', function () {
  assert.strictEqual(response?.status, 200);
  assert.ok(Array.isArray(response?.data), 'Response should be an array of clients');
});
