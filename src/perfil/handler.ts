import { RequestHandler } from 'express';
//import { Request, Response, NextFunction, Router } from 'express';
import { IUser,User } from "./model";

export const createPerfil: RequestHandler = async (req,res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send(newUser)
}

export const getPerfils: RequestHandler = async (req,res, next) => {
    const users = await User.find().populate('posts', 'post -_id');
    res.json(users);
}

export const getPerfil: RequestHandler = async (req,res, next) => {
    const user = await User.findById(req.params.id).populate('posts');
    res.json(user);
}

export const updatePerfil: RequestHandler = async (req,res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.json(user);
}

export const deletePerfil: RequestHandler = async (req,res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    res.json(user);
}

export const login: RequestHandler = async (req,res, next) => {
    const user1 = new User(req.body);
    if (!req.body.email || !req.body.password) {
        return res.status(400).json('Please. Send your email and password');
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json('email invalid');
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
        return res.status(400).json('password invalid')
    }
    const token = await user.generateAuthTOken()
    return res.status(400).json({user,token});
}


