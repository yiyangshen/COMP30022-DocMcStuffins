/* Import the required libraries and types */
import { Router } from "express";

/* Set up the router */
const userRouter: Router = Router();

/* Import the user controller */
import * as controller from "../controllers/userController";

/* Handle user routes */
userRouter.patch("/login", controller.loginUser);
userRouter.patch("/logout", controller.logoutUser);
userRouter.get("/profile", controller.getUserProfile);
userRouter.post("/register", controller.registerUser);

/* Export the router */
export default userRouter;
