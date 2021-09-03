/* Import the required libraries and types */
import { json, Router } from "express";
import passport from "passport";
import { User } from "../models";

// import controller
import * as controller from "../controllers/passportController"

/* Set up the router */
const passportRouter = Router();
passportRouter.use(json());

// TODO : Replace all res to send the response class we wanted
/* Handle passport test routes at /api/passportTest/... */
passportRouter.post("/login", controller.handleLogin);

passportRouter.get("/logout", controller.handleLogout);

passportRouter.post("/register", controller.handleRegister);

passportRouter.get("/auth", controller.isAuthenticated);

passportRouter.get("/session", (req, res) => {
    res.send(req.session);
});

passportRouter.get("/user", (req, res) => {
    res.send(req.user);
});

export default passportRouter;