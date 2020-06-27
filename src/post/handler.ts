import { RequestHandler } from 'express';
import { Public } from "./model";

export const createPost: RequestHandler = async (req,res, next) => {
    const profile = (<any>req).profile._id
    const newPost = new Public({
        ...req.body,
        userId: profile
    })
    try { 
        newPost.addPostProfile(profile)
        await newPost.save();
        res.status(200).send(newPost)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

export const getTotalPost: RequestHandler = async (req,res, next) => {
    const profile = (<any>req).profile._id
    try {
        const posts = await Public.find({ userId: profile }).populate('userId', 'name -_id');;
        res.json(posts);
    } catch (error) {
        res.status(400).send(error)
    }
}

export const getPost: RequestHandler = async (req,res, next) => {
    const id = req.params.id
    try {
        const post = await Public.findById(id).populate('userId', 'name -_id');
        res.json(post);
    } catch (error) {
        res.status(400).send(error)
    }
}

export const updatePost: RequestHandler = async (req,res, next) => {
    const id = req.params.id
    const profile = (<any>req).profile._id

    const updates = Object.keys(req.body)
    const allowed = ['post']
    const isValid = updates.every((update) => allowed.includes(update))

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const post = await Public.findOne({ _id: id, userId: profile})

        if (!post) {
            return res.status(404).send()
        }

        post.post = req.body['post']
        await post.save()
        res.send(post)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const deletePost: RequestHandler = async (req,res, next) => {
    const id = req.params.id
    const profile = (<any>req).profile._id
    try {
        const post = await Public.findOneAndDelete({ _id: id, userId: profile })
        res.json(post);
    } catch (error) {
        res.status(400).send(error)
    }
}


