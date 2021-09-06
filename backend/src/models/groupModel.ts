import { model, Model, Schema, ObjectId } from "mongoose";
import { IContact, contactSchema } from "./contactModel";

/* Define the group interface */
export interface IGroup {
    userId: ObjectId;
    name: string;
    members: Array<IContact>
}

/* Define the group schema */
const groupSchema: Schema = new Schema({
    userId: {
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
const Group = model("Group", groupSchema);
export default Group;
