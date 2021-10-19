**The University of Melbourne**  
**COMP30022 — IT Project (2021s2)**

# Futaba's Friday

Futaba's Friday is a personal CRM that was created as part of our capstone project. You can try it out [here](https://doc-mcstuffins.herokuapp.com/).

## Table of Contents

- [Team members](#team-members)
- [Technologies](#technologies)
- [Workflows](#workflows)

---

# Team Members

| Name            | Role(s)                  |
| :-------------- | :----------------------- |
| Dyno Wibowo     | Backend Developer        |
|                 | Sprint 2 Scrum Co-master |
| Livya Riany     | Lead Frontend Engineer   |
|                 | Sprint 1 Scrum Co-master |
| Joshua Situwali | Frontend Developer       |
|                 | Sprint 2 Scrum Co-master |
| Nathanael Putro | Lead Backend Engineer    |
|                 | Project Manager          |
|                 | Scrum Product Owner      |
| Stanley Wirian  | Backend Developer        |
|                 | Sprint 1 Scrum Co-master |
| Yiyang Shen     | Client                   |

---

# Technologies

## Design

### Modelling
- draw.io
- Motivational Model Editor

### UI/UX
- Canva
- Figma
- Miro

## Application

### Frontend
- Axios
- Bootstrap
- HTML
- React.js
- TypeScript

### Backend
- Jest + supertest
- Mongoose ODM + MongoDB Atlas
- Node.js + Express
- Passport.js + bcrypt
- Typescript
- validator.js via express-validator

## Deployment Pipeline

### Continuous Integration
- Jest + supertest
- GitHub Actions

### Continuous Deployment
- Heroku + GitHub integration

---

# Workflows

## Development

1. `git clone https://github.com/techn0mancr/COMP30022-DocMcStuffins.git`
2. Create a `.env` file in `backend/` with the following fields:
  
  ```
  MONGODB_USERNAME
  MONGODB_PASSWORD
  NODE_ENV=development
  SESSION_SECRET
  ```

3. Change `MONGODB_DATABASE_STRING` in `backend/src/config/databaseConfig.ts`
4. `npm install && npm run start-dev` in the project's root
