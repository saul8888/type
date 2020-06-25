import Mongoose, { Schema } from "mongoose";

const collection = "Friends"

const friendSchema = new Mongoose.Schema({
    description: {
        type: String,
        trim: true
    },
    friendId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles'
    }
},{
    timestamps: true
})

export const User = Mongoose.model(collection, friendSchema)


/*
class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ status: 200, newUser });
    }

    create: RequestHandler = async (req,res, next) => {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ status: 200, newUser });
    }

    routes() {
        this.router.post('/', this.createUser);
        this.router.post('/', this.create);
    }

}
const userRouter = new UserRouter();
export default userRouter.router;
*/