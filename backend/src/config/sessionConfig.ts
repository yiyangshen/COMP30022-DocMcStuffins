/* Import required libraries and types */
import connectMongoDBSession from "connect-mongodb-session"
import session from "express-session";
import { SessionOptions } from "express-session";
import timestring from "timestring";

/* Import required constants */
import { MONGODB_CONNECTION_STRING, MONGODB_DATABASE_NAME } from "./databaseConfig";

/* Configure the session store */
const SESSION_STORE_COLLECTION_NAME = "sessions";
const SESSION_STORE_OPTIONS = {
    uri: MONGODB_CONNECTION_STRING,
    databaseName: MONGODB_DATABASE_NAME,
    collection: SESSION_STORE_COLLECTION_NAME
};

/* Connect to the session store */
const MongoDBStore = new (connectMongoDBSession(session))(SESSION_STORE_OPTIONS);

/* Handle session store setup events */
MongoDBStore.on("error", console.error.bind(console, "Session store connection error: "));
MongoDBStore.once("open", () => {
    console.log(`Successfully connected to MongoDB ${MONGODB_DATABASE_NAME} session store.`);
});

/* Configure session middleware */
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoDBStore,
    cookie: {
        maxAge: timestring("1d", "ms"),
        secure: false
    }
};
const SessionMiddleware = session(SESSION_OPTIONS);

/* Export constants */
export {
    SessionMiddleware
}
