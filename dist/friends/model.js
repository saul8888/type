"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var collection = "Friends";
var friendSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        trim: true
    },
    friendId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles'
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles'
    }
}, {
    timestamps: true
});
exports.User = mongoose_1.default.model(collection, friendSchema);
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
