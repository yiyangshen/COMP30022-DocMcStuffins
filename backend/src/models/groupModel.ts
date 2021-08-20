import { model, Model, Schema, ObjectId } from "mongoose";
import { IUser } from "./userModel";
import { IContact, contactSchema } from "./contactModel";

/* Define the group interface */
export interface IGroup {
    userID: ObjectId;
    name: string;
    members: Array<IContact>
}

/* Define the group schema */
const groupSchema: Schema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: {
        type: [contactSchema],
        default: []
    }
});

/* Export the group schema and model */
export { groupSchema }
//const Group: Model<IGroup> = model("Group", groupSchema);
const Group = model("Group", groupSchema);
export default Group;