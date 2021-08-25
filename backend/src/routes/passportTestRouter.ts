/* Import the required libraries and types */
import { json, Router } from "express";
import passport from "passport";
import { User } from "../models";

/* Set up the router */
const passportTestRouter = Router();
passportTestRouter.use(json());

// TODO : Replace all res to send the response class we wanted

/* Handle passport test routes at /api/passportTest/... */
passportTestRouter.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("Logged in!");
});

passportTestRouter.get("/logout", (req, res) => {
    req.logout();
    res.send("Logged Out!");
});

passportTestRouter.post("/register", passport.authenticate('local-signup'), (req, res) => {
    res.send('Registered');
})

passportTestRouter.get("/auth", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("You're authenticated! =)");
    } else {
        res.send("You're not authenticated! =(");
    }
})

passportTestRouter.get("/session", (req, res) => {
    res.send(req.session);
});

passportTestRouter.get("/user", (req, res) => {
    res.send(req.user);
});

export default passportTestRouter;