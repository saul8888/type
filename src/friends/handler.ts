import { RequestHandler } from 'express';
import { Friend } from "./model";

export const createFriend: RequestHandler = async (req,res, next) => {
    const profile = (<any>req).profile._id
    const friend = req.params.id
    const newFriend = new Friend({
        ...req.body,
        userId: profile,
        friendId: friend
    })
    try {
        newFriend.addFriendProfile(profile,friend)
        await newFriend.save();
        res.status(200).send(newFriend)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const getTotalFriend: RequestHandler = async (req,res, next) => {
    const user = (<any>req).profile._id
    try {
        const friends = await Friend.find({ userId: user }).populate('userId', 'name').populate('friendId', 'name');
        res.json(friends);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

export const getFriend: RequestHandler = async (req,res, next) => {
    const id = <any>req.params.id
    const user = (<any>req).profile._id
    try {
        const friend = await Friend.findOne({userId: user, friendId: id}).populate('userId', 'name').populate('friendId', 'name');
        res.json(friend);
    } catch (error) {
        res.status(400).send(error)
    }
}

export const updateFriend: RequestHandler = async (req,res, next) => {
    const id = <any>req.params.id
    const user = (<any>req).profile._id

    const updates = Object.keys(req.body)
    const allowed = ['description']
    const isValid = updates.every((update) => allowed.includes(update))

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const friend = await Friend.findOne({ userId: user, friendId: id })

        if (!friend) {
            return res.status(404).send({ error: 'dont exict friend!' })
        }

        friend.description = req.body['description']
        await friend.save()
        res.send(friend)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const deleteFriend: RequestHandler = async (req,res, next) => {
    const id = req.params.id
    const user = (<any>req).profile._id
    try {
        const friend = await Friend.findOneAndDelete({ _id: id, userId: user })
        res.json(friend);
    } catch (error) {
        res.status(400).send(error)
    }
}


