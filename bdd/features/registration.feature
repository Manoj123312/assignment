Feature: User Registration
  As Anna, I want to register a new account in the client management system
  So that I can manage my clients and meetings securely

  Background:
    Given the registration page is open

  Scenario: Successful user registration
    Given I am on the registration page
    When I enter name "Anna Smith"
    And I enter email "anna@example.com"
    And I enter address "123 Main Street"
    And I enter password "secure123"
    And I enter repeat password "secure123"
    And I click the Register button
    Then I should see the message "Registration successful"
    And I should be redirected to the login page

  Scenario: Registration with duplicate email
    Given I am on the registration page
    When I enter name "Bob Jones"
    And I enter email "anna@example.com"
    And I enter password "password123"
    And I enter repeat password "password123"
    And I click the Register button
    Then I should see the error "Email already registered"

  Scenario: Registration with mismatched passwords
    Given I am on the registration page
    When I enter name "Carol White"
    And I enter email "carol@example.com"
    And I enter password "mypassword"
    And I enter repeat password "different123"
    And I click the Register button
    Then I should see the error "Passwords do not match"

  Scenario: Registration with missing required fields
    Given I am on the registration page
    When I leave the name field empty
    And I enter email "test@example.com"
    And I enter password "pass123"
    And I click the Register button
    Then the Register button should be disabled
