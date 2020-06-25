import Mongoose, { Schema } from "mongoose";

const collection = "Posts"

const postSchema = new Mongoose.Schema({
    post: {
        type: String,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

export const Post = Mongoose.model(collection, postSchema)