/* Import the required libraries and types */
import { json, Router } from "express";
import { HTTPError } from "../classes/HTTPError";
import { HTTPErrorHandler } from "../middlewares/HTTPErrorHandler";

/* Set up the router */
const errorHandlingRouter = Router();
errorHandlingRouter.use(json());

errorHandlingRouter.post("/error", (req, res, next) => {
    const { status, statusText, message } = req.body;

    // Check if any of the error fields are empty
    if (!status || !statusText || !message) {
        const err = new HTTPError(400, "Bad Request", "Expected fields: status (int), statusText (string), message (string)");
        next(err);
        return;
    }

    const err = new HTTPError(status, statusText, message);
    next(err);
});

errorHandlingRouter.post("/json", (req, res, next) => {

    // Check if the body is empty
    if (Object.keys(req.body).length === 0) {
        const err = new HTTPError(400, "Bad Request", "Empty body");
        next(err);
        return;
    }
    
    res.json(req.body);
});

errorHandlingRouter.use(HTTPErrorHandler);

export default errorHandlingRouter;