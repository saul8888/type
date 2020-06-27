"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var handler_1 = require("./handler");
var friend = express_1.Router();
//create a red
friend.post("/newfriend/:id", auth_1.auth, handler_1.createFriend);
friend.get("/me/:id", auth_1.auth, handler_1.getFriend);
friend.get("/total", auth_1.auth, handler_1.getTotalFriend);
friend.put("/me/:id", auth_1.auth, handler_1.updateFriend);
friend.delete("/me/:id", auth_1.auth, handler_1.deleteFriend);
exports.default = friend;
