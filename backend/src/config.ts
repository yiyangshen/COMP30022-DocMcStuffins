/* Import required libraries and types */
import timestring from "timestring";
import { MONGODB_DATABASE_NAME } from "./secrets";

/* MongoDB-related constants */
const MONGODB_CONNECTION_OPTIONS = {
    dbName: MONGODB_DATABASE_NAME,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

/* Application-related constants */
const PASSWORD_HASH_ROUNDS = 10;

export {
    MONGODB_CONNECTION_OPTIONS,
    PASSWORD_HASH_ROUNDS
}
