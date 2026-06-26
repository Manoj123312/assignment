Feature: Meeting Schedule Management
  As Anna
  I want to manage my meeting schedules with clients
  So that I can keep track of all upcoming meetings

  Background:
    Given the client management API is running

  Scenario: Create a new meeting schedule
    When I send a POST request to "/api/meetings" with:
      | topic           | Architecture Review     |
      | number_of_people| 5                       |
      | start_time      | 2024-04-10T10:00:00     |
      | client_id       | 1                       |
    Then the response status should be 201
    And the response should contain "Meeting created successfully"

  Scenario: Get all meeting schedules
    When I send a GET request to "/api/meetings"
    Then the response status should be 200
    And the response should be a list

  Scenario: Get a meeting by ID
    Given a meeting exists with id 1
    When I send a GET request to "/api/meetings/1"
    Then the response status should be 200
    And the response should contain field "topic"

  Scenario: Update a meeting schedule
    Given a meeting exists with id 1
    When I send a PUT request to "/api/meetings/1" with:
      | topic           | Updated Review Meeting  |
      | number_of_people| 7                       |
      | start_time      | 2024-04-15T14:00:00     |
      | client_id       | 1                       |
    Then the response status should be 200
    And the response should contain "Meeting updated successfully"

  Scenario: Delete a meeting schedule
    Given a meeting exists with id 1
    When I send a DELETE request to "/api/meetings/1"
    Then the response status should be 200
    And the response should contain "Meeting deleted successfully"

  Scenario: Attempt to create a meeting with missing fields
    When I send a POST request to "/api/meetings" with:
      | topic | Incomplete Meeting |
    Then the response status should be 400
    And the response should contain "required"
