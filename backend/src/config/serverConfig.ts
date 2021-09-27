/* Import the required libraries and types */
import connectMongoDBSession from "connect-mongodb-session"
import cors from "cors";
import express from "express";
import session from "express-session";
import path from "path";
import passport from "passport";
import routes from "../routes";
import timestring from "timestring";

/* Load environment variables in development */
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

/* Connect to the database */
import "./databaseConfig";

/* Set up server app */
const app = express();

/* Set up sessions */
import { SessionMiddleware } from "./sessionConfig";
app.use(SessionMiddleware);

/* Set up passport authentication system */
app.use(passport.initialize());
app.use(passport.session());
import "./passportConfig";

/* Enable CORS */
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:48080", "https://snaccs-in-a-van.herokuapp.com"],
    credentials: true,
    optionsSuccessStatus: 200
}));

/* Register API routes */
app.use("/api", routes);

/* Serve the React app */
app.use(express.static(path.join(__dirname, "../../frontend/build")));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build", 'index.html'));
 });

/* Export the app for testing purposes */
export default app;
