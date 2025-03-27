Feature: Dropdown Selection
    Scenario: User selects Option 1
        Given I am on the Dropdown page
        When I select "Option 1" from the dropdown
        Then I should see "Option 1" is selected
