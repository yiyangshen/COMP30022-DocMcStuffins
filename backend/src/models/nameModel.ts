/* Import the required libraries and types */
import { model, Model, Schema } from "mongoose";

/* Define the name interface */
export interface IName {
    first: string;
    middle?: string;
    last: string;
}

/* Define the name schema */
const nameSchema: Schema = new Schema({
    first: {
        type: String,
        required: true
    },
    middle: {
        type: String,
        default: undefined
    },
    last: {
        type: String,
        required: true
    }
});

/* Export the name schema and model */
export { nameSchema }
const Name = model<IName>("Name", nameSchema);
export default Name;
