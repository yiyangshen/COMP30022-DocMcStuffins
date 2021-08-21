/* Import the required libraries and types */
import { Request, Response, Router } from "express";

/* Import existing routes */
import passportTestRouter from "./passportTestRouter";

/* Set up the unifying router */
const routes: Router = Router();

/* Register the existing routes */
routes.use("/passportTest", passportTestRouter);

/* Define a catch-all route */
routes.all("/*", (req: Request, res: Response) => {
    res.status(404).send("Not Found");
});

/* Export the unifying router */
export default routes;