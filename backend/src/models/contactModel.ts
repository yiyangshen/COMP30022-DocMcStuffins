import { model, Model, Schema, ObjectId } from "mongoose";
import { IName, nameSchema } from "./nameModel";
import { ITimestamps, timestampsSchema } from "./timestampsModel";

enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

/* Define the contact interface */
export interface IContact {
    userId: ObjectId;
    groupId?: ObjectId;
    name: IName;
    gender: string;
    dateOfBirth?: Date;
    lastMet?: Date;
    phoneNumber?: string;
    email?: string;
    photo?: string;
    relationship?: string;
    additionalNotes?: string;
    timestamps: ITimestamps;
}

/* Define the contact schema */
const contactSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        default: undefined
    },
    name: {
        type: nameSchema,
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
    phoneNumber: {
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
    },
    timestamps: {
        type: timestampsSchema,
        default: {}
    }
});

/* Export the contact schema and model */
export { contactSchema, Gender }
const Contact = model<IContact>("Contact", contactSchema);
export default Contact;
