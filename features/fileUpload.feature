Feature: File Upload
    Scenario: User uploads a file successfully
        Given I am on the File Upload page
        When I upload the file "./sample.txt"
        Then I should see a confirmation message "File Uploaded!"
