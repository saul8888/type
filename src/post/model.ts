import { Schema, model, Document } from "mongoose";
import { Profile } from "../profile/model";

const collection = "Posts"

export interface IPublic extends Document {
    post: string;
    userId: Schema.Types.ObjectId;
    addPostProfile: (id: string) => Promise<void>;
};

const postSchema = new Schema({
    post: {
        type: String,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles'
    }
},{
    timestamps: true
})

postSchema.methods.addPostProfile = async function(id: string): Promise<void> {
    const newpost = this._id
    const profile = await Profile.findById(id)
    if (!profile) {
        throw new Error('there arent profile')
    }
    profile.posts = profile.posts.concat(newpost)
    await profile.save()
};

export const Public = model<IPublic>(collection, postSchema)

/*
postSchema.pre<IPublic>("save", async function(next) {
    const user = this;
    next();
});
*/