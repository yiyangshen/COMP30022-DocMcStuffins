/* Import the required libraries and types */
import {
    JSONResponse,
    OKSuccess
} from "../classes";
import { json, Router } from "express";

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
    res.json(new JSONResponse(new OKSuccess(JSON.stringify(req.session)))); // this has to be updated
});

passportRouter.get("/user", (req: any, res) => {
    res.json(new JSONResponse(new OKSuccess(req.user)));  // so does this
});

export default passportRouter;
