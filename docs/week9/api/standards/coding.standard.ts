/* TypeScript programming style for COMP30022 IT Project
 * Adapted by Nathanael Hananto Putro (nputro@student.unimelb.edu.au) 01/10/2021
 * from Aidan Nagorcka-Smith's (aidann@student.unimelb.edu.au) 13/03/2011 C Programming Style for Engineering Computation
 *
 */

/* Constant definitions and imports
 * 
 * Global constant definitions are in UPPER_CASE
 * Imports go before constant definitions
 * Import specific modules wherever possible;
 * wildcard imports should be avoided
 */

/* Code spacing
 *
 * Space between includes, definitions, and functions.
 * Tabs must be set to 4-spaces.
 * End every code statement with a semi-colon (although TypeScript does not require it).
 * Longer lines should be broken over multiple lines whenever possible.
 */

/* GOOD:
 */
import { NextFunction, Response, Request } from "express";
import {
    BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError,  
    CreatedSuccess, NoContentSuccess, OKSuccess
} from "../classes";

const DEFAULT_EXPIRY_LENGTH = 60;

function someFunc() {
    // ...
}

/* BAD
 */

/* Definitions and includes are mixed up */
import { body, param, validationResult } from "express-validator";
const SOME_SECRET = "much wow, such secret.";
/* Global constant definitions are given names like variables */
const other_secret = "very amaze, another secret.";
/* No spacing between includes, definitions, and functions */
function anotherFunc() {
    // ...
}

/* Variables
 *
 * Give them useful camelCase names, and
 * initialise them to something that makes sense where necessary.
 * Wherever possible, enforce the type of a variable, and
 * avoid using the type `any` like the plague*.
 */

/* GOOD:
 */

function yetAnotherFunc() {
    var contactCount: number = 0;
    var queryResponse = await Model(...);
}

/* BAD:
 */

function badFunc() {
    /* Variables in ALL_CAPS - this may be confused with a global constant. */
    var NOT_A_CONSTANT: string = "this is not a global constant";

    /* Overly abbreviated variable names make things hard. */
    const qRes = await Model(...);
}

/* Spacing
 *
 * Space intelligently, vertically to group blocks of code that are doing a specific operation,
 * or to separate variable declarations from other code.
 * One tab (4-spaces) of indentation within either a function or a loop.
 * Spaces after commas.
 * Space between ) and {.
 * Closing brace goes on its own line.
 */

/* GOOD
 */

function goodFunc() {
    var counter: number = 0;
    
    for (let i = 100; i >= 0; i--) {
        console.log(`{i} bottles of beer, take one down and pass it around,
                     {i - 1} bottles of beer and pass it around.`);
    }
}

/* BAD
 */

function anotherBadFunc() {
    var counter: number = 0;
    /* No space between variable declarations and the rest of the function.
     * No spaces around the boolean operators. */
    for (let i=100;i>=0;i--) {
    /* No indentation
     * Line can be broken down to two shorter lines. */
    console.log(`{i} bottles of beer, take one down and pass it around, {i - 1} bottles of beer and pass it around.`);
    
    /* Spacing for no good reason.
     * Closing brace not on its own line */
    } }

/* Braces
 *
 * Opening braces go on the same line as the loop or function name.
 * Closing braces go on their own line.
 * Closing braces go at the same indentation lever as the thing they are closing.
 */

/* GOOD
 */

function runningOutOfGoodNamesFunc() {
    
    ...
    
    for(...) {
        ...
    }
}

/* BAD
 */

function runningOutOfBadNamesFunc() {
    
    ...
    
    /* Opening brace on a different line to the for loop open. */
    for(...)
    {
        ...
        /* Closing brace at a different indentation to the thing it is closing.
         * Closing brace not on its own line. */
        } }

/* Commenting
 *
 * Any interesting code should have a comment of explain itself.
 * Do not comment overly obvious things - it is better to write code that documents itself.
 */

/* GOOD:
 */

/* Function to calculate the factorial of a number */
function factorial(x: number): number {
    /* Invalid value in case input doesn't make sense */
    var product: number = -1;
    
    /* Factorials are only defined for positive integers */
    if (x > 0) {
        /* Change to a valid value so the multiplication loop works */
        number = 1;
        
        for (let i = 2; i <= x; i++) {
            product *= i;
        }
    }
    
    return product;
}

/* BAD
 */

/* No explanation on what the function is doing */
function unknownFunc(x: number) {
  /* Commenting obvious things */
  /* Return the value of x multiplied by itself */  
  return x*x;
}


/* Code structure
 *
 * Fail fast - input checks should happen first, then do the computation.
 * Structure the code so that all error handling happens in an easy to read location.
 */

/* GOOD:
 */
if(input_is_bad) {
    throw BadRequestError("Input was malformed");
}

/* Do computations here */
...
                              
/* BAD
 */
if (input_is_good) {
    /* Lots of computation here, pushing the else part off the screen. */
}
else {
    throw BadRequestError("Input was malformed");
}
