/* Import the required libraries and types */
import { json, Router } from "express";
import { OKSuccess } from "../classes";

// import controller
import * as controller from "../controllers/passportController"

/* Set up the router */
const passportRouter = Router();
passportRouter.use(json());

/* Handle passport test routes at /api/passport/... */
passportRouter.post("/login", controller.handleLogin);

passportRouter.get("/logout", controller.handleLogout);

passportRouter.post("/register", controller.handleRegister);

passportRouter.get("/auth", controller.isAuthenticated);


passportRouter.get("/session", (req, res) => {
    res.json(new OKSuccess(req.session));
});

passportRouter.get("/user", (req: any, res) => {
    res.json(new OKSuccess(req.user));
});


export default passportRouter;
