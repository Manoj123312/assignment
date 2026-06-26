Feature: Client Management
  As Anna (architectural firm owner)
  I want to manage my clients
  So that I can keep track of client information

  Background:
    Given the client management API is running

  Scenario: Create a new client successfully
    When I send a POST request to "/api/clients" with:
      | name    | Anna Smith               |
      | email   | anna.smith@example.com   |
      | address | 12 Oak Street            |
      | password| securePass123            |
    Then the response status should be 201
    And the response should contain "Client created successfully"

  Scenario: Get all clients
    When I send a GET request to "/api/clients"
    Then the response status should be 200
    And the response should be a list

  Scenario: Get a client by ID
    Given a client exists with id 1
    When I send a GET request to "/api/clients/1"
    Then the response status should be 200
    And the response should contain field "name"

  Scenario: Update a client
    Given a client exists with id 1
    When I send a PUT request to "/api/clients/1" with:
      | name    | Anna Updated             |
      | email   | anna.updated@example.com |
      | address | 15 Elm Street            |
      | password| newPass456               |
    Then the response status should be 200
    And the response should contain "Client updated successfully"

  Scenario: Delete a client
    Given a client exists with id 1
    When I send a DELETE request to "/api/clients/1"
    Then the response status should be 200
    And the response should contain "Client deleted successfully"

  Scenario: Attempt to create a client with missing fields
    When I send a POST request to "/api/clients" with:
      | name  | Incomplete Client |
    Then the response status should be 400
    And the response should contain "required"
