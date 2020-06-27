import { Schema, model, Document } from "mongoose";
import { Profile } from "../profile/model";

const collection = "Friends"

export interface IFriend extends Document {
    description: string;
    friendId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    addFriendProfile: (id: string,friendId: string) => Promise<void>;
};

const friendSchema = new Schema({
    description: {
        type: String,
        trim: true
    },
    friendId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles'
    }
},{
    timestamps: true
})

friendSchema.methods.addFriendProfile = async function(id: string,friendId: string): Promise<void> {
    const profile = await Profile.findById(id)
    const friend = await Profile.findById(friendId)
    if (!profile || !friend) {
        throw new Error('there arent profile')
    }
    profile.friend = profile.friend.concat(<any>friendId)
    await profile.save()
};

export const Friend = model<IFriend>(collection, friendSchema)
