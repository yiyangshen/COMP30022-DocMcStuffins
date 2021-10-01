# Week 9 Checklist

## Process

> Communication tool up to date?

Yes, we are still using [Slack](https://doc-mcstuffins.slack.com/) for all internal team communications and most communications with the client. Notably, if someone runs into a problem, help is generally requested in the appropriate channels. On more complicated problems, an impromptu partial team meeting is usually organised to resolve problems as soon as possible.

> Team documents up to date, including meeting minutes and task assignments?

Yes, we have our minutes of meeting in our [GitHub repository](https://github.com/techn0mancr/COMP30022-DocMcStuffins/tree/main/docs/minutes), while task assignments are both detailed in the aforementioned minutes and our [Trello boards](https://trello.com/nputro/boards).

> Please give a link to your repository.

Sure, here is our [GitHub repository](https://github.com/techn0mancr/COMP30022-DocMcStuffins).

> Are all team members collaborating as equally as feasible? Elaborate as needed.

Yes, we are collaborating relatively equally to the project. We have a weekly work assignment team meeting to ensure that everyone always has work to do; this is detailed in the [weekly *team* meeting minutes](https://github.com/techn0mancr/COMP30022-DocMcStuffins/tree/main/docs/minutes). The major job divisions in this sprint are:

- backend API endpoints + testing + documentation
  - Dyno
  - Nathanael (mainly establishing standards)
  - Stanley
- frontend components/pages + API integration
  - Joshua
  - Livya
- general project documentation
  - Nathanael

Specific details of the work undertaken by each person can be found in our [Trello boards](https://trello.com/nputro/boards) (notably the archives) and the aforementioned meeting minutes.

> Have you done a sprint retrospective?

Yes, we did it before meeting the client on Friday, in here [sprint restrospective](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/minutes/week9_client-sprint_retrospective.md). After the meeting we have also created a [sprint review](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/minutes/week9_client-sprint_review.md).

## Artefacts

> Have the requirements been updated?

Yes, notable additions to our requirements documents are:
  - [acceptance criteria](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week6/product_backlog.md)

> Have design artefacts been modified?

Yes, notable additions to our design artifacts are:
  - [design class diagram](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/diagrams/design_class_diagram.pdf)
  - [domain class diagram](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/diagrams/domain_class_diagram.pdf)
  - [interactive high-level UI prototype](https://www.figma.com/proto/fKGpzYdLk4bRARublYhPbr/IT-Project)
  - [usability testing results](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/usability_testing.pdf)

> What tasks were completed in the sprint?

During this sprint, we completed the following tasks:
  - backend
    - controllers, routes, and tests for all but one (i.e. contact search) of the core functionality requested by the client
    - [documentation](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/api/index.md) for the available API endpoints and their tests
  - frontend
    - api and integration with the backend of the core functionality requested by the client has been completed

> Do you have coding standards? If so, give link.

We have internally established pseudo-standards:
  - general coding: [contactController.ts:amendContactDetails()](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/backend/src/controllers/contactController.ts)
  - test writing: [amendContactDetails.test.ts](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/backend/tests/controllers/contact/amendContactDetails.test.ts)
  - endpoint documentation: [amendContactDetails.md](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/api/endpoints/contacts/amendContactDetails.md)
  - testing documentation: [amendContactDetails.test.md](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/api/tests/contacts/amendContactDetails.test.md)

> Do you have a testing plan? If so, give link.

Yes, [here](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/test_plan.md). Here are the breakdown of each part:
  - written [acceptance criteria](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week6/product_backlog.md) for our user stories
  - written [integration tests](https://github.com/techn0mancr/COMP30022-DocMcStuffins/tree/main/backend/tests) for all of the implemented backend API endpoints
  - set up [continuous integration](https://github.com/techn0mancr/COMP30022-DocMcStuffins/actions) to run all tests on a commit/pull request to `main`
  - set up [continuous deployment](https://github.com/techn0mancr/COMP30022-DocMcStuffins/deployments) such that it only deploys our application if all tests are passed

Our CI automatically generates testing reports, an example of which can be seen [here](https://github.com/techn0mancr/COMP30022-DocMcStuffins/commit/b2ae070be6371849540378cb1d4bdc133107a4b1/checks/3743689833/logs).

> Do you have a deployment pipeline? If so, elaborate on your tool and status of deployment.

Yes, a deployment pipeline has been set up since week 6. We are using the following tools:
  - [GitHub Actions](https://github.com/techn0mancr/COMP30022-DocMcStuffins/actions) for continuous integration → uses Jest and Node.js to run tests
  - [Heroku](https://dashboard.heroku.com/apps/doc-mcstuffins/deploy/github) for continuous development
  - [Deployed Website](https://doc-mcstuffins.herokuapp.com/)
