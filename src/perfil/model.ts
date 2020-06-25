import { model,Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const collection = "Perfils"

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    location: string;
    posts: Schema.Types.ObjectId;
    friend: Schema.Types.ObjectId;
    tokens: string[];
    generateAuthTOken: () => Promise<string>;
    comparePassword: (password: string) => Promise<Boolean>;
    //findByCredentials: (email: string,password:string) => Promise<IUser>;
}

const userSchema = new Schema({
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
    posts:{
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    },
    friend:{
        type: Schema.Types.ObjectId,
        ref: 'Friends'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.pre<IUser>("save", async function(next) {
    const user = this;
    
    if (!user.isModified("password")) return next();
  
    const hash = await bcrypt.hash(user.password, 8);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthTOken = async function (): Promise<string>{
    const user =this
    const token = jwt.sign({_id: user._id.toString()}, "secret")

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

export const User = model<IUser>(collection, userSchema)


/*
userSchema.methods.findByCredentials = async (email: string,password:string):Promise<IUser>=>{
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('email invalid')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('password invalid')
    }

    return user
}
*/