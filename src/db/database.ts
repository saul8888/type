import Mongoose from "mongoose";


let database: Mongoose.Connection;
export const connect = () => {
    const db= "type"
    const url = `mongodb+srv://saul:1234@cluster0-ooeaq.mongodb.net/${db}?retryWrites=true&w=majority`;
    if (database) {
        return;
    }

    Mongoose.connect(url, {
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