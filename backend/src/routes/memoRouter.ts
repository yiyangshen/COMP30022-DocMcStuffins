/* Import the required libraries and types */
import { Router, json } from "express";

/* Set up the router */
const memoRouter: Router = Router();
memoRouter.use(json());

/* Import the memo controller */
import * as controller from "../controllers/memoController";

/* Handle memo routes */
memoRouter.get("/", controller.getMemos);
memoRouter.post("/delete", controller.deleteMemo);
memoRouter.get("/details/:id", controller.getMemoDetails);
memoRouter.patch("/details/amend", controller.amendMemoDetails);
memoRouter.post("/new", controller.createMemo);
memoRouter.get("/recent/:n", controller.getRecentMemos);

/* Export the router */
export default memoRouter;
