
Feature: SignIn
    Background: I open browser
        Given I open browser

    Scenario Outline: I'm already authorised
        Given I on Public page
        When I type "<login>" into login field
        And I type "<password>" into password field
        And I press SignIn
        And I wait for navigation
        And I on Main page
        When I goto Public page
        Then I on Main page
        Examples:
            | login    | password |
            | krill221 | 123123   |

    Scenario Outline: SignIn and SignOut
        Given I on Public page
        When I type "<login>" into login field
        And I type "<password>" into password field
        And I press SignIn
        And I wait for navigation
        And I on Main page
        When I press SignOut
        Given I on Public page
        Examples:
            | login    | password |
            | krill221 | 123123   |

    Scenario Outline: SignIn validation good
        Given I on Public page
        When I type "<login>" into login field
        And I type "<password>" into password field
        And I press SignIn
        And I wait for navigation
        Then I on Main page
        Examples:
            | login    | password |
            | krill221 | 123123   |

    Scenario Outline: SignIn with wrong username
        Given I on Public page
        When I type "<login>" into login field
        And I type "<password>" into password field
        And I press SignIn
        Then I on Public page
        And I see "User not found" message
        Examples:
            | login    | password  |
            | vasa     | 123123    |

    Scenario Outline: SignIn with wrong password
        Given I on Public page
        When I type "<login>" into login field
        And I type "<password>" into password field
        And I press SignIn
        Then I on Public page
        And I see "Wrong crendetials" message
        Examples:
            | login    | password  |
            | krill221 | wrongpass |