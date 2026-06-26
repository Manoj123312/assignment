Feature: User Registration
  As a new user of the Client Management Application
  I want to register an account
  So that I can log in and manage clients and meetings

  Background:
    Given the API server is running at "http://localhost:3000"

  Scenario: Successful user registration
    Given I have valid registration details
      | name     | email                  | address        | password    |
      | John Doe | john.doe@example.com   | 123 Oak Street | Secret@123  |
    When I send a POST request to "/api/auth/register" with the registration details
    Then the response status should be 201
    And the response should contain "User registered successfully"

  Scenario: Registration with duplicate email
    Given a user with email "duplicate@example.com" already exists
    When I send a POST request to "/api/auth/register" with email "duplicate@example.com"
    Then the response status should be 409
    And the response should contain "Email already registered"

  Scenario: Registration with missing required fields
    When I send a POST request to "/api/auth/register" with missing name field
    Then the response status should be 400
    And the response should contain "Name, email, and password are required"

  Scenario: Registration with missing password
    When I send a POST request to "/api/auth/register" without a password
    Then the response status should be 400
    And the response should contain "Name, email, and password are required"
