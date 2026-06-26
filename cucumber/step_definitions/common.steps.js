const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

const BASE_URL = process.env.API_URL || 'http://localhost:3000';
let response;

// ─── Background ───────────────────────────────────────────────
Given('the client management API is running', async function () {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    expect(res.status).to.equal(200);
  } catch (err) {
    throw new Error(`API is not running at ${BASE_URL}. Start the backend first.\n${err.message}`);
  }
});

// ─── Preconditions ────────────────────────────────────────────
Given('a client exists with id {int}', async function (id) {
  try {
    const res = await axios.get(`${BASE_URL}/api/clients/${id}`);
    expect(res.status).to.equal(200);
  } catch {
    // Seed a client if it doesn't exist
    await axios.post(`${BASE_URL}/api/clients`, {
      name: 'Seed Client', email: `seed${id}@test.com`,
      address: 'Seed Address', password: 'seedPass'
    });
  }
});

Given('a meeting exists with id {int}', async function (id) {
  try {
    const res = await axios.get(`${BASE_URL}/api/meetings/${id}`);
    expect(res.status).to.equal(200);
  } catch {
    // Seed a meeting if it doesn't exist (requires client id 1)
    await axios.post(`${BASE_URL}/api/meetings`, {
      topic: 'Seed Meeting', number_of_people: 2,
      start_time: '2024-01-01T09:00:00', client_id: 1
    });
  }
});

// ─── HTTP Steps ───────────────────────────────────────────────
When('I send a GET request to {string}', async function (path) {
  try {
    response = await axios.get(`${BASE_URL}${path}`);
  } catch (err) {
    response = err.response;
  }
});

When('I send a POST request to {string} with:', async function (path, dataTable) {
  const body = dataTable.rowsHash();
  // Coerce numeric strings
  if (body.number_of_people) body.number_of_people = parseInt(body.number_of_people, 10);
  if (body.client_id)        body.client_id        = parseInt(body.client_id, 10);
  try {
    response = await axios.post(`${BASE_URL}${path}`, body);
  } catch (err) {
    response = err.response;
  }
});

When('I send a PUT request to {string} with:', async function (path, dataTable) {
  const body = dataTable.rowsHash();
  if (body.number_of_people) body.number_of_people = parseInt(body.number_of_people, 10);
  if (body.client_id)        body.client_id        = parseInt(body.client_id, 10);
  try {
    response = await axios.put(`${BASE_URL}${path}`, body);
  } catch (err) {
    response = err.response;
  }
});

When('I send a DELETE request to {string}', async function (path) {
  try {
    response = await axios.delete(`${BASE_URL}${path}`);
  } catch (err) {
    response = err.response;
  }
});

// ─── Assertions ───────────────────────────────────────────────
Then('the response status should be {int}', function (expectedStatus) {
  expect(response.status).to.equal(expectedStatus);
});

Then('the response should contain {string}', function (text) {
  const body = JSON.stringify(response.data);
  expect(body.toLowerCase()).to.include(text.toLowerCase());
});

Then('the response should be a list', function () {
  expect(response.data).to.be.an('array');
});

Then('the response should contain field {string}', function (field) {
  expect(response.data).to.have.property(field);
});
