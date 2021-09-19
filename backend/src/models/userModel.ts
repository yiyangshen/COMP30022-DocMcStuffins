/* Import the required libraries and types */
import { hashSync } from "bcrypt";
import { model, Model, ObjectId, Schema } from "mongoose";
import { PASSWORD_HASH_ROUNDS } from "../config";
import { IName, nameSchema } from "./nameModel";

/* Define the user interface */
export interface IUser {
    id: ObjectId
    email: string;
    name: IName;
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
    name: {
        type: nameSchema,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        set: (plaintext: string) => hashSync(plaintext, PASSWORD_HASH_ROUNDS)
    }
});

/* Export the user schema and model */
export { userSchema }
const User = model<IUser>("User", userSchema);
export default User;
