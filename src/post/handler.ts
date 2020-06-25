import { RequestHandler } from 'express';
//import { Request, Response, NextFunction, Router } from 'express';
import { Post } from "./model";

export const createPost: RequestHandler = async (req,res, next) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).send(newPost)
}

export const getPosts: RequestHandler = async (req,res, next) => {
    const posts = await Post.find();
    res.json(posts);
}

export const getPost: RequestHandler = async (req,res, next) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
}

export const updatePost: RequestHandler = async (req,res, next) => {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {new: true});
    res.json(post);
}

export const deletePost: RequestHandler = async (req,res, next) => {
    const { id } = req.params;
    const post = await Post.findByIdAndRemove(id);
    res.json(post);
}


