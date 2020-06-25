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
var collection = "Perfils";
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    location: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    posts: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Posts'
    },
    friend: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Friends'
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});
exports.User = mongoose_1.default.model(collection, userSchema);
