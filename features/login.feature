Feature: Login

    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I login with "tomsmith" and "SuperSecretPassword!"
        Then I should log in succesfully