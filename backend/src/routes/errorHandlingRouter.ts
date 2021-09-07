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
    const err = new HTTPError(status, statusText, body);
    next(err);
});

errorHandlingRouter.post("/json", (req, res, next) => {
    const jsonRes = new JSONResponse(new OKSuccess(req.body)); // this is a bandaid fix, and shouldn't be kept like this
    res.status(jsonRes.status).json(jsonRes);
});

export default errorHandlingRouter;
