/* Import the required libraries and types */
import { connect, connection } from "mongoose";
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();
const MONGODB_DATABASE_NAME = process.env.NODE_ENV;
const MONGODB_CONNECTION_STRING = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@doc-mcstuffins.muze4.mongodb.net/${MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

/* Configure the connection */
const MONGODB_CONNECTION_OPTIONS = {
    dbName: MONGODB_DATABASE_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

/* Connect to the database */
connect(MONGODB_CONNECTION_STRING, MONGODB_CONNECTION_OPTIONS);
const db = connection;

/* Handle server connection events */
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", async () => {
    console.log(`Successfully connected to MongoDB ${MONGODB_DATABASE_NAME} database.`);
    
    /* Wipe the session store before running CI tests */
    if (process.env.NODE_ENV === "testing") {
        const SESSIONS = await connection.db.collection("sessions");
        await SESSIONS.deleteMany({});
    }
});

/* Export constants */
export {
    MONGODB_CONNECTION_STRING,
    MONGODB_DATABASE_NAME
}
