/* Import the required libraries and types */
import { Router } from "express";

/* Set up the router */
const contactRouter: Router = Router();

/* Import the contact controller */
import * as controller from "../controllers/contactController";

/* Handle contact routes */
contactRouter.get("/", controller.getContacts);
contactRouter.get("/count", controller.getContactCount);
contactRouter.delete("/delete", controller.deleteContact);
contactRouter.get("/details/:id", getContactDetails);
contactRouter.patch("/details/amend", controller.amendContactDetails);
contactRouter.post("/new", controller.createContact);
contactRouter.get("/search/name/:name", controller.searchContactName);

/* Export the router */
export default contactRouter;
