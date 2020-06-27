import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const USERDB = process.env.USERDB;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
export const URL = `mongodb+srv://${USERDB}:${PASSWORD}@cluster0-ooeaq.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
