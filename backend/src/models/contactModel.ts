import { model, Model, Schema, ObjectId } from "mongoose";
import { IUser } from "./userModel";
import { IGroup } from "./groupModel";

enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

enum Pronoun {
    Masculine = "he/him",
    Feminine = "she/her",
    Neutral = "they/them"
}

/* Define the contact interface */
export interface IContact {
    userID: ObjectId;
    groupID: ObjectId;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    pronoun: string;
    dateOfBirth: Date;
    lastMet: Date;
    phoneNumbers: Array<string>;
    emails: Array<string>;
    companyRole: string;
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
    pronoun: {
        type: String,
        default: Pronoun.Neutral
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
        type: [String],
        default: []
    },
    emails: {
        type: [String],
        default: []
    },
    companyRole: {
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
export { contactSchema, Gender, Pronoun }
//const Contact: Model<IContact> = model("Contact", contactSchema);
const Contact = model("Contact", contactSchema);
export default Contact;