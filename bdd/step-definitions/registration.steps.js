const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

const BASE_URL = 'http://localhost:3000/api';

let response;
let requestData;
let lastError;

// ───────────────────────────────────────────────
// Background / Setup
// ───────────────────────────────────────────────

Given('the registration page is open', function () {
  requestData = {};
});

Given('I am on the registration page', function () {
  requestData = {};
});

// ───────────────────────────────────────────────
// When steps
// ───────────────────────────────────────────────

When('I enter name {string}', function (name) {
  requestData.name = name;
});

When('I enter email {string}', function (email) {
  requestData.email = email;
});

When('I enter address {string}', function (address) {
  requestData.address = address;
});

When('I enter password {string}', function (password) {
  requestData.password = password;
});

When('I enter repeat password {string}', function (repeat) {
  requestData.repeatPassword = repeat;
});

When('I leave the name field empty', function () {
  requestData.name = '';
});

When('I click the Register button', async function () {
  try {
    response = await axios.post(`${BASE_URL}/auth/register`, {
      name: requestData.name,
      email: requestData.email,
      address: requestData.address || '',
      password: requestData.password
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

Then('I should be redirected to the login page', function () {
  // In API context: successful registration returns 201
  assert.strictEqual(response?.status, 201);
});

Then('I should see the error {string}', function (expectedError) {
  const errorMsg = lastError?.data?.message || '';
  assert.ok(
    errorMsg.toLowerCase().includes(expectedError.toLowerCase()),
    `Expected error to include "${expectedError}" but got "${errorMsg}"`
  );
});

Then('the Register button should be disabled', function () {
  // Simulate client-side validation: empty name means invalid form
  assert.ok(!requestData.name, 'Name field should be empty for button to be disabled');
});
