/* Load environment variables */
require("dotenv").config();

/* Load the configuration scripts */
import "./databaseConfig";
import "./passportConfig";

/* Re-export constants */
export { PASSWORD_HASH_ROUNDS } from "./bcryptConfig";
export { SessionMiddleware } from "./sessionConfig";
