import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import { Profile } from '../profile/model';
//const {User} = require('../models/users')

export interface Idecoded extends Document {
    _id: string;
    iat: number
}

export interface IRequest extends Request {
    token: string;
}

export const auth: RequestHandler = async (req,res, next) => {
        
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            throw new Error("there not header")
        }
        const token = authHeader.split(' ')[1];
        const decoded = <Idecoded>jwt.verify(token ,"secret")
        const profile = await Profile.findOne({_id: decoded._id})
        if(!profile){
            throw new Error("not exit profile")
        }

        (<any>req).token = token;
        (<any>req).profile = profile; 
         next();
    } catch (error) {
        res.status(401).send({error: "there not token"})
    }
}
