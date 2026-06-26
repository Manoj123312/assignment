Feature: User Login
  As a registered user of the Client Management Application
  I want to log in with my credentials
  So that I can access the client and meeting management features

  Background:
    Given the API server is running at "http://localhost:3000"

  Scenario: Successful login with valid credentials
    Given a registered user with email "login.test@example.com" and password "Password@123"
    When I send a POST request to "/api/auth/login" with valid credentials
    Then the response status should be 200
    And the response should contain a JWT token
    And the response should contain the user's name

  Scenario: Login with incorrect password
    Given a registered user with email "wrongpass@example.com" and password "CorrectPass@1"
    When I send a POST request to "/api/auth/login" with an incorrect password
    Then the response status should be 401
    And the response should contain "Invalid credentials"

  Scenario: Login with non-existent email
    When I send a POST request to "/api/auth/login" with email "notexist@example.com"
    Then the response status should be 401
    And the response should contain "Invalid credentials"

  Scenario: Login with missing email field
    When I send a POST request to "/api/auth/login" without an email
    Then the response status should be 400
    And the response should contain "Email and password are required"
