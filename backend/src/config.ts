/* Import required libraries and types */
import { MONGODB_CONNECTION_STRING, MONGODB_DATABASE_NAME, SESSIONS_COLLECTION_NAME } from "./secrets";

/* MongoDB-related constants */
const MONGODB_CONNECTION_OPTIONS = {
    dbName: MONGODB_DATABASE_NAME,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const SESSION_STORE_OPTIONS = {
    uri: MONGODB_CONNECTION_STRING,
    databaseName: MONGODB_DATABASE_NAME,
    collection: SESSIONS_COLLECTION_NAME
};

/* Application-related constants */
const PASSWORD_HASH_ROUNDS = 10;

export {
    MONGODB_CONNECTION_OPTIONS,
    SESSION_STORE_OPTIONS,
    PASSWORD_HASH_ROUNDS
};
