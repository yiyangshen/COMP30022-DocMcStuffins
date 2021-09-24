/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

/* Import required models */
import { Memo, IUser } from "../models";

/* Import error and response classes */
import {
    BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError,  
    CreatedSuccess, NoContentSuccess, OKSuccess
} from "../classes";

/* Amends the given memo's details;
 * requires, in the request body:
 *   - id: ObjectId
 *   - title?: string
 *   - notes?: string
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the memo to amend does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function amendMemoDetails(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }

        /* Validate and sanitise the required inputs */
        await body("id").isMongoId().run(req);
        await body("title").isAscii().trim().run(req);

        /* Validate and sanitise the optional inputs */
        if (req.body.notes)
            await body("notes").isAscii().trim().run(req);

        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }

        /* Find the specified memo */
        const memo = await Memo.findById(req.body.id);

        /* Check if the memo exists */
        if (!memo) {
            return next(new NotFoundError("No memos with the given ID exists in the database"));
        }

        /* Check if the memo belongs to the currently authenticated user */
        if (memo.userId.toString() !== (req.user as IUser)._id.toString()) {
            return next(new ForbiddenError("Memo to amend does not belong to the currently-authenticated user"));
        }

        /* Update each field of the memo if there is any amendment */
        memo.title = req.body.title;
        memo.notes = req.body.notes ? req.body.notes : undefined;

        /* Update the modified timestamp */
        memo.timestamps.modified = new Date();
        
        /* Save the amended memo to the database */
        await memo.save();
        res.json(new OKSuccess("Memo successfully amended"));
    } catch (err) {
        return next(new InternalServerError("Something's gone wrong"));
    }
}

/* Creates a new memo with the given details;
 * requires, in the request body:
 *   - title: string
 *   - notes?: string
 * responds with a:
 *   - 201 Created if creation is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createMemo(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }
        
        /* Validate and sanitise the required inputs */
        await body("title").isAscii().trim().run(req);

        /* Validate and sanitise the optional inputs */
        if (req.body.notes)
            await body("notes").isAscii().trim().run(req);
        
        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }
        
        /* Create the new memo document */
        const newMemo = new Memo({
            userId: (req.user as IUser)._id,
            title: req.body.title
        });
        
        /* Assign the optional values appropriately */
        if (req.body.notes)
            newMemo.notes = req.body.notes;

        /* Save the new memo to the database */
        await newMemo.save();
        res.json(new CreatedSuccess("Memo successfully created"));
    }
    catch (err) {
        return next(new InternalServerError("Something's gone wrong"));
    }
}

/* Deletes the given memo;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the memo to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteMemo(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("Requester is not authenticated"));
        }

        /* Validate and sanitise the required inputs */
        await body("id").isMongoId().run(req);

        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body is malformed"));
        }

        /* Find the specified memo */
        const memo = await Memo.findById(req.body.id);

        /* Check if the memo exists */
        if (!memo) {
            return next(new NotFoundError("No memos with the given ID exists in the database"));
        }

        /* Check if the memo belongs to the currently authenticated user */
        if (memo.userId.toString() !== (req.user as IUser)._id.toString()) {
            return next(new ForbiddenError("Memo to delete does not belong to the currently-authenticated user"));
        }

        /* Delete the memo */
        await Memo.findByIdAndDelete(memo._id);
        res.json(new OKSuccess("Memo successfully deleted"));
    } catch (err) {
        return next(new InternalServerError("Something has gone wrong"));
    }
}

/* Returns the given memo's details;
 * requires, in the request params:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if query is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the group to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getMemoDetails(req: Request, res: Response, next: NextFunction) {

}

/* Returns the currently-authenticated user's memos, along with their representative details;
 * responds with a:
 *   - 200 OK if query returns something
 *   - 204 No Content if the query returns nothing
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getMemos(req: Request, res: Response, next: NextFunction) {
    // make sure requester is authenticated
    if (req.isUnauthenticated()) {
        return next(new UnauthorizedError("Requester is not authenticated"));
    }
    try {
        // find all memos belonging to the user
        const memos = await Memo.find({ userId: (req.user as IUser)._id });
        
        // no memos were found
        if (memos.length === 0) {
            return res.status(204).json(new NoContentSuccess());
        }
        
        return res.json(new OKSuccess(memos));
    } catch (error) {
        return next(new InternalServerError("Internal servor error"));
    }
}

/* Returns the currently-authenticated user's n recentmost memos, along with their representative details;
 * requires, in the request params:
 *   - n: number
 * responds with a:
 *   - 200 OK if query is successful
 *   - 204 No Content if the query returns nothing
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getRecentMemos(req: Request, res: Response, next: NextFunction) {
    // make sure requester is authenticated
    if (req.isUnauthenticated()) {
        return next(new UnauthorizedError("Requester is not authenticated"));
    }
    try {
        // parses string n to int and verify that it is a valid request
        const n = parseInt(req.params.n);     
        if (Object.is(NaN, n) || parseInt(req.params.n) <= 0) {
            return next(new BadRequestError("Requester parameter is invalid"));
        }

        // find memos, sort, and limit them to n documents
        const memos = await Memo.find({ userId: (req.user as IUser)._id }).sort({ "timestamps.created": -1  }).limit(n);
        
        // no memos were found
        if (memos.length === 0) {
            return res.status(204).json(new NoContentSuccess());
        }

        return res.json(new OKSuccess(memos));
    } catch (error) {
        return next(new InternalServerError("Internal servor error"));
    }
}

/* Export controller functions */
export {
    amendMemoDetails,
    createMemo,
    deleteMemo,
    getMemoDetails,
    getMemos,
    getRecentMemos
};
