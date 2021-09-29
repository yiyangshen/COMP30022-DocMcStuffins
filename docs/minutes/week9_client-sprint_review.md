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

- initial sprint goal was to complete *all* core features of personal CRM
- completed most core feature implementations
  - user
    - authentication
    - registration
  - dashboard
    - contacts overview
    - groups overview
  - contact
    - amendment
    - creation
    - deletion
    - detail retrieval
    - listing
  - group (backend only)
    - amendment
    - creation
    - deletion
    - detail retrieval
    - listing
  - memo
    - amendment
    - creation
    - deletion
    - detail retrieval
    - listing

> Note: feel free to combine the above to make it shorter

- incomplete core features
  - contact search by name

### Sprint

#### General

- what went well
- obstacles
  - suboptimal interteam communication
- resolution

#### Backend API

- what went well
  - input validation → avoid XSS attacks
  - testing coverage → integration test suites for each API endpoint
  - deployment pipeline → CD iff CI passed
- obstacles
  - lack of standardisation
  - non-comprehensive testing
- resolution
  - standardisation of code and documentation format
  - expand existing test suites

#### Frontend UX

- what went well
- obstacles
  - underestimation of hours required to implement features
- resolution
  - [insert text here]

### Demonstration

- frontend team
  - architecture overview
    - HTML + CSS → design
    - React → UX
    - Axios → API interface
  - website demo
  - interactive high-level UI prototype walkthrough for whatever has not been fully implemented yet
- backend team
  - architecture overview
    - Node.js + TypeScript → code skeleton
    - MongoDB → database
    - Passport.js + Bcrypt → authentication
  - deployment pipeline
    - GitHub Actions + Jest → continuous integration
    - Heroku → continuous deployment
  - API documentation overview

## Projection

### Product backlog

- core features
  - contact search by name
  - frontend UI beautification
- optional requested features
  - upload profile pictures
  - contact search via dashboard
  - contact search by other fields
- additional proposed features
  - showing recently-accessed groups in dashboard

### Sprint
- implementing remaining core features
- implementing optional requested features
- project handover preparation
