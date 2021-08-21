/* Import the required libraries and types */
import { json, Router } from "express";
import passport from "passport";
import { User } from "../models";

/* Set up the router */
const passportTestRouter = Router();
passportTestRouter.use(json());

/* Handle passport test routes at /api/passportTest/... */
passportTestRouter.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("Logged in!");
});

passportTestRouter.get("/logout", (req, res) => {
    req.logout();
    res.send("Logged Out!");
});

passportTestRouter.post("/register", async (req, res) => {
    const { email, firstName, middleName, lastName, password } = req.body;

    try {
        // Check if the username has existed
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(403).send("Forbidden");
            return;
        }

        const newUser = new User({
            email: email,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            password: password
        });
        await newUser.save();

        res.send(`New User Created! Welcome ${email}!`);
    } catch (err) {
        res.send("Internal Server Error");
    }
});

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