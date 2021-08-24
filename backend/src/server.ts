/* Import the required libraries and types */
import connectMongoDBSession from "connect-mongodb-session"
// import cors from "cors";
import express from "express";
import session from "express-session";
// import path from "path";
import passport from "passport";
import routes from "./routes";
import timestring from "timestring";

/* Import the required constants */

/* Load environment variables */
require("dotenv").config();

/* Connect to the database */
import "./config/databaseConfig";

/* Set up server app */
const app = express();
const port: number = +(process.env.PORT || 48080);

/* Set up sessions */
import { SessionMiddleware } from "./config/sessionConfig";
app.use(SessionMiddleware);

/* Set up passport authentication system */
app.use(passport.initialize());
app.use(passport.session());
import "./config/passportConfig";

/* Enable CORS */
/*
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:48080", "https://snaccs-in-a-van.herokuapp.com"],
    credentials: true,
    optionsSuccessStatus: 200
}));
*/

/* Register API routes */
app.use("/api", routes);

/* Serve the React app */
/*
app.use(express.static(path.join(__dirname, "../../frontend/build")));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build", 'index.html'));
 });
 */

/* Listen for incoming connections */
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});

/* Export the app for testing purposes */
export default app;
