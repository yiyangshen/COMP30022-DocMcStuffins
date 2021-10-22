# Week 12 Checklist

## Process

> Communication tool up to date?

Yes, we are still using [Slack](https://doc-mcstuffins.slack.com/) for all internal team communications and most communications with the client. As usual, an impromptu partial team meeting is organised to help team members resolve problems as soon as possible.

> Team documents up to date, including meeting minutes, task assignments?

Yes, we have our minutes of meeting in our [GitHub repository](https://github.com/techn0mancr/COMP30022-DocMcStuffins/tree/main/docs/minutes), while task assignments are both detailed in the aforementioned minutes and our [Trello boards](https://trello.com/nputro/boards).

> Please give a link to the repository.

Sure, here is our [GitHub repository](https://github.com/techn0mancr/COMP30022-DocMcStuffins).

> Are all team members contributing as equally as feasible? Elaborate as needed.

Yes, we are collaborating relatively equally to the project. We still hold weekly work assignment team meetings to ensure that everyone always has work to do; this is once again detailed in the [weekly *team* meeting minutes](https://github.com/techn0mancr/COMP30022-DocMcStuffins/tree/main/docs/minutes). The major job divisions in this sprint are:

- backend API endpoints + testing + documentation
  - Dyno
  - Stanley
- frontend components/pages + API integration
  - Joshua
  - Livya
- general project documentation + presentation
  - Nathanael

Specific details of the work undertaken by each person can be found in our [Trello boards](https://trello.com/nputro/boards) (notably the archives) and the aforementioned meeting minutes. For convenience, weekly snapshots of our boards can be found [here](https://github.com/techn0mancr/COMP30022-DocMcStuffins/tree/main/docs/trello).

> Have you done a sprint retrospective?

Yes, we undertook a sprint retrospective before we did our sprint review. The documents that detail both ceremonies can be found in our meeting minutes folder. For convenience, the retrospective is linked [here](../minutes/week12_team-sprint_retrospective.md), while the review is linked [here](../minutes/week12_client-sprint_review.md).

## Artefacts

> What requirements have been completed?

There has been updates to our requirements artefacts since the last sprint. Notably, they are:
- [product backlog](../week6/product_backlog.md) updated with new requirements and acceptance criteria (3.4.x.x)
- [motivational model](../week6/diagrams/motivational_model.png) resynced with the updated product backlog

Finally, across the two sprints we have completed the following functionalities:
- core
  - CRU operations on users
  - CRUD operations on contacts, groups, and memos
  - responsive name-based search on contacts and groups via their respective listing pages
  - user dashboard to display a general overview
- optional
  - name-based contact and group search via the dashboard
  - uploading contact pictures

These constitute all of the requirements that the client requested during the initial requirements elicitation process.

> Have design artefacts changed since sprint 1?

No, there has been no design artefact changes since sprint 1.

> What tasks were completed in the sprint?

During this sprint, we completed the following tasks:
- backend
  - controller + tests + documentation for:
    - groupless contacts listing
    - user profile amendment
  - existing tests
    - standardisation of testing code
- frontend
  - beautification of existing CSS
  - picture upload field in contact creation and amendment pages
  - responsive name-based search on:
    - contacts and groups via the dashboard
    - contacts and groups via their respective listing pages

> Is coding ⌜   ⌟ up-to-date?

Yes, our coding:
  - documentation (endpoint + testing) has been updated with the latest information
  - progress is in line with our sprint plan(s)
  - standards has been incorporated throughout the API codebase

> Do you have test results? If so, give link.

There is no change in the testing workflow as detailed in the [test plan](../week9/test_plan.md) from the first sprint. There has been some improvements from the first sprint's [test result](../week9/test_report.pdf), the most noticeable one being we encountered much less problems.

The improvements include:
- additional [Jest integration test files](../week9/api/tests/index.md), summing up to 132 tests in 24 test suites
- conducted [acceptance testing](./acceptance-testing.md) where only one acceptance criteria is not passed, which is optional and hence of low priority

Here are our latest [CI output](./ci-output.txt) and our latest (deployment) [build log](./build-log.txt).

> What is the deployment status?

To reiterate, our deployment pipeline makes use of:

- [GitHub Actions](https://github.com/techn0mancr/COMP30022-DocMcStuffins/actions) for continuous integration
- [Heroku](https://dashboard.heroku.com/apps/doc-mcstuffins/deploy/github) for continuous deployment

The web application has successfully been deployed by our pipeline, which can be found [here](https://doc-mcstuffins.herokuapp.com/).

> Do you have a handover date?

Yes, the project has been handed over to the client on 22 October 2021. We handed over a:

- [GitHub repository](https://github.com/techn0mancr/COMP30022-DocMcStuffins) containing the project's documentation and codebase
- [Heroku application](https://dashboard.heroku.com/apps/doc-mcstuffins) for managing the application's deployment
- [MongoDB Atlas project](https://cloud.mongodb.com/v2/612340a98f783a3d1564edf4) containing the project's database instance
