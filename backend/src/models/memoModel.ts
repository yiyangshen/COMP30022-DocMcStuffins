import { model, Model, Schema, ObjectId } from "mongoose";
import { IUser } from "./userModel";
import { IContact } from "./contactModel";


/* Define the memo interface */
export interface IMemo {
    userID: ObjectId;
    contactID: ObjectId;
    title: string;
    dateEdited: Date;
    notes: string;

}

/* Define the memo schema */
const memoSchema: Schema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    dateEdited: {
        type: Date,
        default: undefined
    },
    notes: {
        type: String,
        default: undefined
    }
});

/* Export the memo schema and model */
export { memoSchema }
//const Memo: Model<IContact> = model("Memo", memoSchema);
const Memo = model("Memo", memoSchema);
export default Memo;
