const MONGODB_USERNAME = "api";
const MONGODB_PASSWORD = "NXrgK5CvPgbP0LbM";
const MONGODB_CONNECTION_STRING = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@snaccs-in-a-van.4ciyf.mongodb.net/snaccsInAVan?retryWrites=true&w=majority`;
const MONGODB_DATABASE_NAME = "snaccsInAVan";
const SESSIONS_COLLECTION_NAME = "sessions";
const SESSIONS_SECRET = "supersecretsession"

export {
    MONGODB_CONNECTION_STRING,
    MONGODB_DATABASE_NAME,
    SESSIONS_COLLECTION_NAME,
    SESSIONS_SECRET
};