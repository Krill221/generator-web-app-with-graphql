
Feature: SignUp
    Background: I open browser
        Given I open browser
        And I on Public page
        When I press SignUp link
        And I wait for navigation
        Then I on SignUp page


    Scenario: I go to SingIn page successful:
        When I press SignIn link
        And I wait for navigation
        Then I on SignIn page

    Scenario Outline: SignUp successful:
        When I type "<username>" into login field
        And I type "<email>" into email field
        And I type "<password>" into password field
        And I type "<confirmPassword>" into confirmPassword field
        And I press SignUp button
        And I wait for navigation
        Then I on Main page
        Examples:
            | username    | email  | password | confirmPassword |
            | test | test@test.com | 123123 | 123123 |

    Scenario Outline: SignUp fail:
        When I type "<username>" into login field
        And I type "<email>" into email field
        And I type "<password>" into password field
        And I type "<confirmPassword>" into confirmPassword field
        And I press SignUp button
        Then I on Public page
        And I see "Username is taken" message
        Examples:
            | username    | email  | password | confirmPassword |
            | test | test@test.com | 123123 | 123123 |