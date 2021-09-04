/* Import the required libraries and types */
import { Request, Response, Router } from "express";

/* Import existing routes */
import passportRouter from "./passportRouter";
import errorHandlingRouter from "./errorHandlingRouter";
import { HTTPErrorHandler } from "../middlewares/HTTPErrorHandler";

/* Set up the unifying router */
const routes: Router = Router();

/* Register the existing routes */
routes.use("/passport", passportRouter);
routes.use("/errorHandling", errorHandlingRouter);
routes.use(HTTPErrorHandler);

/* Define a catch-all route */
routes.all("/*", (req: Request, res: Response) => {
    res.status(404).send("Not Found");
});

/* Export the unifying router */
export default routes;