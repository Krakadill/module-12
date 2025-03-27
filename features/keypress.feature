Feature: Key Presses

  Scenario: User presses a key and sees the correct message
    Given I am on the Key Presses page
    When I press the key "A"
    Then I should see the message "You entered: A"
