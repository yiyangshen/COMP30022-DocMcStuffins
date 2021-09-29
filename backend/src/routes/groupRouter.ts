/* Import the required libraries and types */
import { Router, json } from "express";

/* Set up the router */
const groupRouter: Router = Router();
groupRouter.use(json());

/* Import the group controller */
import * as controller from "../controllers/groupController";

/* Handle group routes */
groupRouter.get("/", controller.getGroups);
groupRouter.get("/count", controller.getGroupCount);
groupRouter.post("/delete", controller.deleteGroup);
groupRouter.get("/details/:id", controller.getGroupDetails);
groupRouter.patch("/details/amend", controller.amendGroupDetails);
groupRouter.post("/new", controller.createGroup);

/* Export the router */
export default groupRouter;
