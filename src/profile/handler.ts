import { RequestHandler } from 'express';
import { Profile } from "./model";

export const createProfile: RequestHandler = async (req,res, next) => {
    try {
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.status(200).send(newProfile)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const getProfile: RequestHandler = async (req,res, next) => {
    const _id = (<any>req).profile._id
    console.log(_id)
    
    try {
        const profile = await Profile.findById(_id).populate('posts', 'post -_id').populate('friend', 'name -_id');
        console.log(profile)
        res.json(profile);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
}

export const updateProfile: RequestHandler = async (req,res, next) => {
    const _id = (<any>req).profile._id
    const updates = Object.keys(req.body)
    const allowed = ['name','email','location']
    const isValid = updates.every((update) => allowed.includes(update))

    if (!isValid) {
        return res.status(401).send({ error: 'Invalid updates!' })
    }

    try {
        const profile = await Profile.findById(_id);
        if (!profile) {
            return res.status(404).send({ error: 'dont exict profile!' })
        }

        updates.forEach((update1) => (<any>profile)[update1] = req.body[update1])
        await profile.save()
        res.send(profile)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

export const deleteProfile: RequestHandler = async (req,res, next) => {
    const profile = (<any>req).profile
    try {
        await profile.remove()
        res.send(profile)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const login: RequestHandler = async (req,res, next) => {
    const profile1 = new Profile(req.body);
    if (!req.body.email || !req.body.password) {
        return res.status(400).json('Please. Send your email and password');
    }
    const profile = await Profile.findOne({ email: req.body.email });
    if (!profile) {
      return res.status(400).json('email invalid');
    }
    const isMatch = await profile.comparePassword(req.body.password);
    if (!isMatch) {
        return res.status(400).json('password invalid')
    }
    const token = await profile.generateAuthTOken()
    return res.status(400).json({profile,token});
}

export const logoutProfile: RequestHandler = async (req,res, next) => {
    const _id = (<any>req).profile._id
    try {
        const profile = await Profile.findById(_id);
        if (!profile) {
            return res.status(400).json('no exits profile');
        }
        profile.tokens = profile.tokens.filter(element => {
            return (<any>element).token !== (<any>req).token
        });
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(400).send(error)
    }
}

export const logoutAllProfile: RequestHandler = async (req,res, next) => {
    const _id = (<any>req).profile._id
    try {
        const profile = await Profile.findById(_id);
        if (!profile) {
            return res.status(400).json('no exits profile');
        }
        profile.tokens = []
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(400).send(error)
    }
}

//////////////////////////////////////
export const getTotalProfiles: RequestHandler = async (req,res, next) => {
    const profiles = await Profile.find().populate('posts', 'post -_id');
    res.json(profiles);
}


