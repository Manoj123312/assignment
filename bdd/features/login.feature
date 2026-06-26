Feature: User Login
  As Anna, I want to log into the client management system
  So that I can access my clients and meeting schedules

  Background:
    Given the login page is open

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter email "anna@example.com"
    And I enter password "secure123"
    And I click the Login button
    Then I should see the message "Login successful"
    And I should be redirected to the clients page

  Scenario: Login with invalid password
    Given I am on the login page
    When I enter email "anna@example.com"
    And I enter password "wrongpassword"
    And I click the Login button
    Then I should see the error "Invalid credentials"

  Scenario: Login with unregistered email
    Given I am on the login page
    When I enter email "unknown@example.com"
    And I enter password "somepassword"
    And I click the Login button
    Then I should see the error "Invalid credentials"

  Scenario: Login with empty fields
    Given I am on the login page
    When I leave the email field empty
    And I leave the password field empty
    And I click the Login button
    Then the Login button should be disabled

  Scenario: User stays logged in with valid token
    Given I am logged in as "anna@example.com"
    When I navigate to the clients page
    Then I should see the list of clients
