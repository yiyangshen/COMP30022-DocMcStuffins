# Sprint Review

|              |                           |
| :----------- | :------------------------ |
| Date         | 1 Oct 2021                |
| Participants | Dyno Nanditya Hadi Wibowo |
|              | Joshua Situwali           |
|              | Livya Natasha Riany       |
|              | Nathanael Hananto Putro   |
|              | Stanley Wirian            |
|              | Yiyang Shen               |

## Review

### Product backlog

-   initial sprint goal was to complete all core features of personal CRM
-   completed most core feature implementations

    -   user
        -   authentication
        -   registration
        -   view profile
    -   dashboard
        -   contacts overview
        -   groups overview
        -   memo overview
    -   contact, group, memo
        -   amendment
        -   creation
        -   deletion
        -   detail retrieval
        -   listing all

-   incomplete core features

    -   contact and group search by name
    -   profile edit

### Sprint Performance

#### General

-   what went well
    -   workflow using Git
        -   worked using Git branches for every feature
        -   create a pull request when the feature has been implemented and tested
        -   assign relevant reviewers to review the pull request
        -   CI is also run for every pull request
        -   the branch is merged if and only if the reviewers approve and the CI passed
        -   ensures quality control in the code
    -   work assignment using Trello
        -   every week we would assign at least one task to every member
            -   no one is doing nothing each week
        -   the assignment is well documented in the meeting minutes and the Trello board along with the deadlines
        -   the Trello card is moved accordingly based on the progress of the work
    -   communication
        -   the backend/frontend team work very closely together
        -   asking for help or sharing of knowledge often occurs between the respective team members
            -   an impromptu call is made when there is a lingering issue or to do a pair programming
        -   because of this conflicts among members are seldom
-   obstacles
    -   suboptimal formal communication
        -   we could have utilised the team Slack channel more when communicating instead of direct/informal messages
-   resolution
    -   the frequency of mentions and threads in the team Slack channel improve greatly towards the end of the sprint

#### Backend API

-   what went well
    -   input validation
        -   avoid XSS attacks (improve security)
        -   avoid malformed inputs by throwing appropriate errors with appropriate messages
    -   test Driven Development
        -   postman is used for unit testing of each controller function
        -   integration test suites for each API endpoint are made using Jest.js
            -   all returnable HTTP status codes are checked
            -   for eligible tests the response body is also checked
        -   CI runs these test suites when attempting to merge the branch to main, ensuring the code works properly
        -   made a total of 22 test suites (groups), overall comprising of 122 individual tests
    -   standardised response objects returned by every API endpoint
        -   made classes to standardise the API response
    -   deployment pipeline
        -   CD if and only if CI passed
-   obstacles
    -   CI failing unexpectedly even though the tests run perfectly in the local machine
    -   lack of standardisation at the start
    -   testing not fully comprehensive
-   resolution
    -   researched online for solutions and also do some trials to fix the CI
    -   standardisation of code and documentation format
    -   expand existing test suites

#### Frontend UX

-   what went well
    -   connecting with API using
    -   integrating the backend with the frontend with the help of the documentation
    -   making routes and history that responded well to clicks
    -   implemented hamburger navigation bar
    -   frontend able to take in input and send to the backend, then display changes
    -   taken advantage of local storage to store variables
-   obstacles
    -   underestimation of hours required to implement features
-   resolution
    -   standardise the code
    -   implement the frontend earlier

### Demonstration

-   frontend team
    -   architecture overview
        -   HTML + CSS → design
        -   React → UX
        -   Axios → API interface
    -   website demo
    -   interactive high-level UI prototype walkthrough for whatever has not been fully implemented yet
-   backend team
    -   architecture overview
        -   Node.js + TypeScript → code skeleton
        -   MongoDB → database
        -   Passport.js + Bcrypt → authentication
    -   deployment pipeline
        -   GitHub Actions + Jest → continuous integration
        -   Heroku → continuous deployment
    -   API documentation overview

## Projection

### Product backlog

-   core features
    -   contact search by name
    -   frontend UI beautification
    -   profile amendment
-   optional requested features
    -   upload profile pictures
    -   contact search via dashboard
    -   contact search by other fields
-   additional proposed features
    -   showing recently-accessed groups in dashboard

### Sprint

-   implementing remaining features
    -   core features
    -   optional requested features
    -   edit profile
-   testing
    -   improving API testing
    -   undertaking acceptance testing
-   project handover preparation
    -   standardising documentation
