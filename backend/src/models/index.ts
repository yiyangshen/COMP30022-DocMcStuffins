/* Import the required libraries and types */
import { connect, connection } from "mongoose";

/* Import the required constants */
import { MONGODB_CONNECTION_STRING } from "../secrets";
import { MONGODB_CONNECTION_OPTIONS } from "../config";

/* Connect to the database */
connect(MONGODB_CONNECTION_STRING, MONGODB_CONNECTION_OPTIONS);
const db = connection;

/* Handle server connection events */
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
    console.log("Successfully connected to MongoDB database.");
});

/* Re-export primary interfaces, schemas, and models */

/* Re-export helper interfaces, schemas, and models */

/* Re-export helper enums */
