import { model,Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
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
    comparePassword: (password: string) => Promise<Boolean>;
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

userSchema.pre<IUser>("save", async function(next) {
    const user = this;
    
    if (!user.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});
  
userSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>(collection, userSchema)