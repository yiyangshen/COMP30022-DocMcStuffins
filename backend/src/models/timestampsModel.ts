/* Import the required libraries and types */
import { model, Model, Schema } from "mongoose";

/* Define the timestamps interface */
export interface ITimestamps {
    created: Date;
    viewed: Date;
    modified?: Date;
}

/* Define the timestamps schema */
const timestampsSchema: Schema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    viewed: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: undefined
    }
});

/* Export the timestamp schema and model */
export { timestampsSchema }
const Timestamps = model<ITimestamps>("Timestamps", timestampsSchema);
export default Timestamps;
