import { model, Model, Schema, ObjectId } from "mongoose";
import { IUser } from "./userModel";
import { IGroup } from "./groupModel";

enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

/* Define the contact interface */
export interface IContact {
    userID: ObjectId;
    groupID: ObjectId;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    lastMet: Date;
    phoneNumber: string;
    email: string;
    photo: string;
    relationship: string;
    additionalNotes: string;
}

/* Define the contact schema */
const contactSchema: Schema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    groupID: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        default: undefined
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
    gender: {
        type: String,
        default: Gender.Other
    },
    dateOfBirth: {
        type: Date,
        default: undefined
    },
    lastMet: {
        type: Date,
        default: undefined
    },
    phoneNumbers: {
        type: String,
        default: undefined
    },
    email: {
        type: String,
        default: undefined
    },
    photo: {
        type: String,
        default: undefined
    },
    relationship: {
        type: String,
        default: undefined
    },
    additionalNotes: {
        type: String,
        default: undefined
    }
});

/* Export the contact schema and model */
export { contactSchema, Gender }
//const Contact: Model<IContact> = model("Contact", contactSchema);
const Contact = model("Contact", contactSchema);
export default Contact;