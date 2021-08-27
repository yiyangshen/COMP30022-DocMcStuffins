/* Import the required libraries and types */
import { json, Router } from "express";
import passport from "passport";
import { User } from "../models";

/* Set up the router */
const passportRouter = Router();
passportRouter.use(json());

// TODO : Replace all res to send the response class we wanted

/* Handle passport test routes at /api/passportTest/... */
passportRouter.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("SUCCESS");
});

passportRouter.get("/logout", (req, res) => {
    req.logout();
    res.send("SUCCESS");
});

passportRouter.post("/register", passport.authenticate('local-signup'), (req, res) => {
    res.send('SUCCESS');
})

passportRouter.get("/auth", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("You're authenticated! =)");
    } else {
        res.send("You're not authenticated! =(");
    }
})

passportRouter.get("/session", (req, res) => {
    res.send(req.session);
});

passportRouter.get("/user", (req, res) => {
    res.send(req.user);
});

export default passportRouter;