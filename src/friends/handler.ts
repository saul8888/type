import { RequestHandler } from 'express';
import { User } from "./model";

export const createFriend: RequestHandler = async (req,res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send(newUser)
}

export const getFriends: RequestHandler = async (req,res, next) => {
    const users = await User.find().populate('posts', 'title url -_id');
    res.json(users);
}

export const getFriend: RequestHandler = async (req,res, next) => {
    const user = await User.findById(req.params.id).populate('posts');
    res.json(user);
}

export const updateFriend: RequestHandler = async (req,res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.json(user);
}

export const deleteFriend: RequestHandler = async (req,res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    res.json(user);
}


