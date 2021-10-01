# Test Plan

## Overview
Our main testing workflow is divided into 4 major stages: unit testing through Postman, integration testing through Jest, CI, and CD. Each stage of the testing plan is dependent on the previous stages — for example, it is not possible to complete CI without having successfully completed integration testing throughout Jest before-hand. Furthermore, we also did end-to-end testing to supplement all the previous 4 stages.


## Unit testing using Postman
Unit testing is the stage where individual controller functions are being tested. This testing stage would usually be done right after implementation, so we can gauge if the implementation works using limited test cases. In the case of backend, all functions were to be tested using Postman manually. By using Postman, we can create API calls to the server and see if we end up with the results as expected from our acceptance criteria. 

## Integration testing using Jest
Integration testing is the stage where we test the API routes used. All of the integration tests were done automatically using Jest. Before creating a Jest file, we have to first write a testing documentation that states all of the test cases that would be investigated and all their expected results. All of these test cases were developed by following the acceptance criteria. Once documentation is done, we proceeded with implementing the Jest file. Using Jest allows us to have a suite of test cases that effortlessly checks whether our API functions works as intended — and as such, modifications made to our implementation can be automatically tested seamlessly.

## CI
We used GitHub Actions for our CI testing. CI test will run whenever a pull request was made, or whenever an alternate branch has been merged into the main branch. CI is important because it tests if our repository would be able to get compiled and built. Whenever a CI test fails, we often have to go back through the previous stages to resolve the issue. Once the issue was solved, we pushed the *hotfix* commit and wait again for a new CI test result.

## CD
GitHub Actions were used for our CD. The job of the CD is to automatically deploy our current repository to Heroku. The deployment would only run if CI was also successful in its test. This was done so that we could prevent deployments of commits that would fail to be built. 

## *end-to-end* testing
We did end-to-end testing to see how the backend and frontend components interact with each other. In the early stages, end-to-end testing were done using Node.js and local browser. This allows us to test the UI pages and API calls without committing to a full deployment to Heroku. However, this does not mean that we did not test our deployed app on Heroku. After the CD stage, we also did end-to-end testing in Heroku to make sure that the experience is the same as the development stage and everything fulfills the acceptance criteria.