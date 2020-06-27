import Mongoose from "mongoose";
import { URL } from "../config/config";

let database: Mongoose.Connection;
export const connect = () => {

    if (database) {
        return;
    }

    Mongoose.connect(URL, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};

export const disconnect = () => { 
    if (!database) {
        return;
    } 
    Mongoose.disconnect();
};