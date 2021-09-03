/* Import the required libraries and types */
import { JSONResponse } from "../classes/JSONResponse";
import { json, Router } from "express";
import { HTTPError } from "../classes/HTTPError";
import { HTTPErrorHandler } from "../middlewares/HTTPErrorHandler";

/* Set up the router */
const errorHandlingRouter = Router();
errorHandlingRouter.use(json());

errorHandlingRouter.post("/error", (req, res, next) => {
    const { status, statusText, message } = req.body;
    const err = new HTTPError(status, statusText, message);
    next(err);
});

errorHandlingRouter.post("/json", (req, res, next) => {
    const jsonRes = new JSONResponse(req.body);
    res.status(jsonRes.status).json(jsonRes);
});

errorHandlingRouter.use(HTTPErrorHandler);

export default errorHandlingRouter;
