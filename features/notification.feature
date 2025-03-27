Feature: Notification Messages

    Scenario: Verify notification appears
        Given I am on the notification messages page
        When I click the "Click here" link
        Then I should see a notification message