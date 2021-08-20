/* Import the required libraries and types */
import { hashSync } from "bcrypt";
import { model, Model, Schema } from "mongoose";
//import { PASSWORD_HASH_ROUNDS } from "../config";

/* Define the user interface */
export interface IUser {
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    password: string;
}

/* Define the user schema */
const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        set: (email: string) => email.toLowerCase()
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        default: undefined
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        //set: (plaintext: string) => hashSync(plaintext, PASSWORD_HASH_ROUNDS)
    }
});

/* Export the user schema and model */
export { userSchema }
//const User: Model<IUser> = model("User", userSchema);
const User = model("User", userSchema);
export default User;