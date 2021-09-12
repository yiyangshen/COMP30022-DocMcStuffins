/* Import the required libraries and types */
import { Router, json } from "express";

/* Set up the router */
const contactRouter: Router = Router();
contactRouter.use(json());

/* Import the contact controller */
import * as controller from "../controllers/contactController";

/* Handle contact routes */
contactRouter.get("/", controller.getContacts);
contactRouter.get("/count", controller.getContactCount);
contactRouter.delete("/delete", controller.deleteContact);
contactRouter.get("/details/:id", controller.getContactDetails);
contactRouter.patch("/details/amend", controller.amendContactDetails);
contactRouter.post("/new", controller.createContact);
contactRouter.get("/search/name/:name", controller.searchContactName);

/* Export the router */
export default contactRouter;
