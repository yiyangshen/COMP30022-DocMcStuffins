/* Import the required libraries and types */
import {
    OKSuccess,
    JSONResponse,
    HTTPError
} from "../classes";
import { json, Router } from "express";

/* Set up the router */
const errorHandlingRouter = Router();
errorHandlingRouter.use(json());

errorHandlingRouter.post("/error", (req, res, next) => {
    const { status, statusText, body } = req.body;
    next(new HTTPError(status, statusText, body));
});

errorHandlingRouter.post("/json", (req, res, next) => {
    res.json(new OKSuccess(req.body));
});

export default errorHandlingRouter;
