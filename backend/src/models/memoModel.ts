import { model, Model, Schema, ObjectId } from "mongoose";
import { ITimestamps, timestampsSchema } from "./timestampsModel";

/* Define the memo interface */
export interface IMemo {
    userId: ObjectId;
    title: string;
    notes?: string;
    timestamps: ITimestamps;
}

/* Define the memo schema */
const memoSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: undefined
    },
    timestamps: {
        type: timestampsSchema,
        default: {}
    }
});

/* Export the memo schema and model */
export { memoSchema }
const Memo = model("Memo", memoSchema);
export default Memo;
