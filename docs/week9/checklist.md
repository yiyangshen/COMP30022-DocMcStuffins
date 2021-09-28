# Week 9 Checklist

## Process

> Communication tool up to date?

Yes, we are still using [Slack](https://doc-mcstuffins.slack.com/) for all internal team communications and most communications with the client.

> Team documents up to date, including meeting minutes and task assignments?

Yes, we have our minutes of meeting in our [GitHub repository](https://github.com/techn0mancr/COMP30022-DocMcStuffins/tree/main/docs/minutes), while task assignments are both detailed in the aforementioned minutes and our [Trello boards](https://trello.com/nputro/boards).

> Please give a link to your repository.

Sure, here is our [GitHub repository](https://github.com/techn0mancr/COMP30022-DocMcStuffins).

> Are all team members collaborating as equally as feasible? Elaborate as needed.

Yes, we are collaborating relatively equally to the project. The major job divisions in this sprint are:

- backend API endpoints + testing + documentation
  - Dyno
  - Nathanael (mainly establishing standards)
  - Stanley
- frontend components/pages + API integration
  - Joshua
  - Livya
- general project documentation
  - Nathanael  

> Have you done a sprint retrospective?

Not yet. We are planning to do it sometime this week.

## Artefacts

> Have the requirements been updated?

Yes, notable additions to our requirements documents are:
  - [acceptance criteria](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week6/product_backlog.md)

> Have design artefacts been modified?

Yes, notable additions to our design artifacts are:
  - [interactive high-level UI prototype](https://www.figma.com/proto/fKGpzYdLk4bRARublYhPbr/IT-Project)
  - [usability testing results](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/usability_testing.pdf)

> What tasks were completed in the sprint?

During this sprint, we completed the following tasks:
  - backend
    - controllers, routes, and tests for all but one (i.e. contact search) of the core functionality requested by the client
    - [documentation](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/api/index.md) for the available API endpoints and their tests
  - frontend
    - [to be filled by someone from the frontend]

> Do you have coding standards? If so, give link.

We are not following a well-established industry coding standard, but we do have internally established pseudo-standards:
  - general coding: [contactController.ts:createContact()](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/backend/src/controllers/contactController.ts)
  - test writing: [createContact.test.ts](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/backend/tests/controllers/contact/createContact.test.ts)
  - endpoint documentation: [createContact.md](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/api/endpoints/contacts/createContact.md)
  - testing documentation: [createContact.test.md](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week9/api/tests/contacts/createContact.test.md)

> Do you have a testing plan? If so, give link.

We don't currently have a separate document describing our testing plan, but so far we have:
  - written [acceptance criteria](https://github.com/techn0mancr/COMP30022-DocMcStuffins/blob/main/docs/week6/product_backlog.md) for our user stories
  - written [integration tests](https://github.com/techn0mancr/COMP30022-DocMcStuffins/tree/main/backend/tests) for all of the implemented backend API endpoints
  - set up [continuous integration](https://github.com/techn0mancr/COMP30022-DocMcStuffins/actions) to run all tests on a commit/pull request to `main`
  - set up [continuous deployment](https://github.com/techn0mancr/COMP30022-DocMcStuffins/deployments) such that it only deploys our application if all tests are passed

> Do you have a deployment pipeline? If so, elaborate on your tool and status of deployment.

Yes, a deployment pipeline has been set up since week 6. We are using the following tools:
  - [GitHub Actions](https://github.com/techn0mancr/COMP30022-DocMcStuffins/actions) for continuous integration → uses Jest and Node.js to run tests
  - [Heroku](https://dashboard.heroku.com/apps/doc-mcstuffins/deploy/github) for continuous development
