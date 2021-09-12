/* Module augmentation for Express */
import { ObjectId } from "mongoose";

declare module "express" {
    interface User {
        id: ObjectId;
    }
}
