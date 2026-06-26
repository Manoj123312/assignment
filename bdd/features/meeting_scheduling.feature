Feature: Meeting Scheduling
  As Anna, I want to add a new meeting schedule with clients in the system
  So that I can manage my meeting agenda and client interactions efficiently

  Background:
    Given I am logged in as "anna@example.com"
    And the meetings page is open

  Scenario: Successfully schedule a new meeting
    Given I am on the meetings page
    When I click the "Schedule New Meeting" button
    And I select client "Anna Smith"
    And I enter meeting topic "Project Kickoff Discussion"
    And I enter number of people "5"
    And I enter start time "2024-03-20T09:00"
    And I enter description "Initial discussion about the architectural project"
    And I click the "Schedule Meeting" button
    Then I should see the message "Meeting scheduled"
    And the meeting "Project Kickoff Discussion" should appear in the meetings list

  Scenario: Schedule a meeting without a topic
    Given I am on the meetings page
    When I click the "Schedule New Meeting" button
    And I leave the meeting topic empty
    And I enter number of people "3"
    And I enter start time "2024-03-21T10:00"
    And I click the "Schedule Meeting" button
    Then I should see the error "Topic is required"

  Scenario: Edit an existing meeting
    Given there is a meeting "Design Review" in the system
    When I click the Edit button for "Design Review"
    And I change the topic to "Updated Design Review"
    And I change the number of people to "4"
    And I click the "Update" button
    Then I should see the message "Meeting updated"
    And the meeting "Updated Design Review" should appear in the meetings list

  Scenario: Delete a meeting
    Given there is a meeting "Old Meeting" in the system
    When I click the Delete button for "Old Meeting"
    And I confirm the deletion
    Then I should see the message "Meeting deleted"
    And the meeting "Old Meeting" should not appear in the meetings list

  Scenario: View all scheduled meetings
    Given I am logged in
    When I navigate to the meetings page
    Then I should see all scheduled meetings in a table
    And each meeting should show client name, topic, number of people, and start time
