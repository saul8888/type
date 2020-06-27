"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
exports.createProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newProfile, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newProfile = new model_1.Profile(req.body);
                return [4 /*yield*/, newProfile.save()];
            case 1:
                _a.sent();
                res.status(200).send(newProfile);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, profile, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.profile._id;
                console.log(_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model_1.Profile.findById(_id).populate('posts', 'post -_id').populate('friend', 'name -_id')];
            case 2:
                profile = _a.sent();
                console.log(profile);
                res.json(profile);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(400).send(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, updates, allowed, isValid, profile_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.profile._id;
                updates = Object.keys(req.body);
                allowed = ['name', 'email', 'location'];
                isValid = updates.every(function (update) { return allowed.includes(update); });
                if (!isValid) {
                    return [2 /*return*/, res.status(401).send({ error: 'Invalid updates!' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, model_1.Profile.findById(_id)];
            case 2:
                profile_1 = _a.sent();
                if (!profile_1) {
                    return [2 /*return*/, res.status(404).send({ error: 'dont exict profile!' })];
                }
                updates.forEach(function (update1) { return profile_1[update1] = req.body[update1]; });
                return [4 /*yield*/, profile_1.save()];
            case 3:
                _a.sent();
                res.send(profile_1);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(400).send(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profile = req.profile;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile.remove()];
            case 2:
                _a.sent();
                res.send(profile);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).send(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var profile1, profile, isMatch, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profile1 = new model_1.Profile(req.body);
                if (!req.body.email || !req.body.password) {
                    return [2 /*return*/, res.status(400).json('Please. Send your email and password')];
                }
                return [4 /*yield*/, model_1.Profile.findOne({ email: req.body.email })];
            case 1:
                profile = _a.sent();
                if (!profile) {
                    return [2 /*return*/, res.status(400).json('email invalid')];
                }
                return [4 /*yield*/, profile.comparePassword(req.body.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json('password invalid')];
                }
                return [4 /*yield*/, profile.generateAuthTOken()];
            case 3:
                token = _a.sent();
                return [2 /*return*/, res.status(400).json({ profile: profile, token: token })];
        }
    });
}); };
exports.logoutProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, profile, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.profile._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, model_1.Profile.findById(_id)];
            case 2:
                profile = _a.sent();
                if (!profile) {
                    return [2 /*return*/, res.status(400).json('no exits profile')];
                }
                profile.tokens = profile.tokens.filter(function (element) {
                    return element.token !== req.token;
                });
                return [4 /*yield*/, profile.save()];
            case 3:
                _a.sent();
                res.json(profile);
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                res.status(400).send(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.logoutAllProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, profile, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.profile._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, model_1.Profile.findById(_id)];
            case 2:
                profile = _a.sent();
                if (!profile) {
                    return [2 /*return*/, res.status(400).json('no exits profile')];
                }
                profile.tokens = [];
                return [4 /*yield*/, profile.save()];
            case 3:
                _a.sent();
                res.json(profile);
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                res.status(400).send(error_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
//////////////////////////////////////
exports.getTotalProfiles = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var profiles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model_1.Profile.find().populate('posts', 'post -_id')];
            case 1:
                profiles = _a.sent();
                res.json(profiles);
                return [2 /*return*/];
        }
    });
}); };
