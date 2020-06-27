import { model,Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { Public } from "../post/model";
import { Friend } from "../friends/model";

const collection = "Profiles"

export interface IProfile extends Document {
    name: string;
    email: string;
    password: string;
    location: string;
    posts: Schema.Types.ObjectId[];
    friend: Schema.Types.ObjectId[];
    tokens: string[];
    generateAuthTOken: () => Promise<string>;
    comparePassword: (password: string) => Promise<Boolean>;
    //findByCredentials: (email: string,password:string) => Promise<IProfile>;
}

const profileSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        /*
        validate(value:string){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
        */
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    location:{
        type: String,
        trim: true,
        lowercase: true
    },
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }],
    friend:[{
        type: Schema.Types.ObjectId,
        ref: 'Profiles'
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

profileSchema.methods.toJSON = function () {
    const profile = this
    const profileObject = profile.toObject()

    delete profileObject.password
    delete profileObject.tokens
    return profileObject
}

profileSchema.pre<IProfile>("save", async function(next) {
    const profile = this;
    
    if (!profile.isModified("password")) return next();
  
    const hash = await bcrypt.hash(profile.password, 8);
    profile.password = hash;
    next();
});

profileSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
};

profileSchema.methods.generateAuthTOken = async function (): Promise<string>{
    const profile =this
    const token = jwt.sign({_id: profile._id.toString()}, "secret")

    profile.tokens = profile.tokens.concat({ token })
    await profile.save()

    return token
}

profileSchema.pre('remove', async function (next) {
    const profile = this
    await Public.deleteMany({ userId: profile._id })
    await Friend.deleteMany({ userId: profile._id })
    
    next()
})

export const Profile = model<IProfile>(collection, profileSchema)


/*
profileSchema.methods.findByCredentials = async (email: string,password:string):Promise<Iprofile>=>{
    const profile = await profile.findOne({email})
    if (!profile) {
        throw new Error('email invalid')
    }

    const isMatch = await bcrypt.compare(password, profile.password)
    if (!isMatch) {
        throw new Error('password invalid')
    }

    return profile
}
*/