import app from "../src/server";
import { agent } from "supertest";

export default agent(app);