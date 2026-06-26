Feature: Meeting Scheduling
  As Anna, the architectural firm owner
  I want to schedule meetings with my clients
  So that I can keep track of all project discussions and reviews

  Background:
    Given the API server is running at "http://localhost:3000"

  Scenario: Successfully schedule a new meeting
    Given I have valid meeting details
      | meeting_topic     | number_of_people | start_time           |
      | Project Kickoff   | 5                | 2024-12-01T09:00     |
    When I send a POST request to "/api/meetings" with the meeting details
    Then the response status should be 201
    And the response should contain "Meeting scheduled successfully"
    And the response should contain a meeting ID

  Scenario: Schedule a meeting with a specific client
    Given a client exists with ID 1
    When I schedule a meeting with topic "Design Review" for client ID 1
    Then the response status should be 201
    And the response should contain "Meeting scheduled successfully"

  Scenario: Retrieve all scheduled meetings
    When I send a GET request to "/api/meetings"
    Then the response status should be 200
    And the response should be a list of meetings

  Scenario: Schedule a meeting with missing required topic
    When I send a POST request to "/api/meetings" without a meeting topic
    Then the response status should be 400
    And the response should contain "meeting_topic, number_of_people, and start_time are required"

  Scenario: Delete a meeting
    Given a meeting exists with ID 1
    When I send a DELETE request to "/api/meetings/1"
    Then the response status should be 200
    And the response should contain "Meeting deleted successfully"

  Scenario: Update a meeting status to completed
    Given a meeting exists with ID 2
    When I send a PUT request to "/api/meetings/2" with status "completed"
    Then the response status should be 200
    And the response should contain "Meeting updated successfully"
