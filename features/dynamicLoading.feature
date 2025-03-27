Feature: Dynamic Loading
    Scenario: User sees hidden text after clicking start
        Given I am on the Dynamic Loading page
        When I click the start button
        Then I should see the text "Hello World!"
