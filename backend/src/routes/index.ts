/* Import the required libraries and types */
import { Request, Response, Router } from "express";

/* Import existing middlewares */
import { HTTPErrorHandler } from "../middlewares/HTTPErrorHandler";

/* Import existing routes */
import contactRouter from "./contactRouter";
import errorHandlingRouter from "./errorHandlingRouter";
import groupRouter from "./groupRouter";
import memoRouter from "./memoRouter";
import passportRouter from "./passportRouter";
import userRouter from "./userRouter";

/* Set up the unifying router */
const routes: Router = Router();

/* Bind the existing middlewares */
routes.use(HTTPErrorHandler);

/* Register the existing routes */
routes.use("/contacts", contactRouter);
routes.use("/errorHandling", errorHandlingRouter);
routes.use("/groups", groupRouter);
routes.use("/memos", memoRouter);
routes.use("/passport", passportRouter);
routes.use("/user", userRouter);

/* Define a catch-all route */
routes.all("/*", (req: Request, res: Response) => {
    res.status(404).send("Not Found");
});

/* Export the unifying router */
export default routes;
