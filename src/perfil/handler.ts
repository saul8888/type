import { RequestHandler } from 'express';
//import { Request, Response, NextFunction, Router } from 'express';
import { User } from "./model";

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


