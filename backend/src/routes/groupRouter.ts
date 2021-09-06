/* Import the required libraries and types */
import { Router } from "express";

/* Set up the router */
const groupRouter: Router = Router();

/* Import the group controller */
import * as controller from "../controllers/groupController";

/* Handle group routes */
groupRouter.get("/", controller.getGroups);
groupRouter.get("/count", controller.getGroupCount);
groupRouter.post("/create", controller.createGroup);
groupRouter.delete("/delete", controller.deleteGroup);
groupRouter.get("/details/:id", controller.getGroupDetails);
groupRouter.patch("/details/amend", controller.amendGroupDetails);

/* Export the router */
export default groupRouter;
