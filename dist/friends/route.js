"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var handler_1 = require("./handler");
var friend = express_1.Router();
friend.get("/total", handler_1.getFriends);
//create a red
friend.post("/register", handler_1.createFriend);
friend.get("/me", handler_1.getFriend);
friend.put("", handler_1.updateFriend);
friend.delete("", handler_1.deleteFriend);
exports.loggerMiddleware = function (req, resp, next) {
    console.info(req.method + " " + req.originalUrl);
    var start = new Date().getTime();
    resp.on('finish', function () {
        var elapsed = new Date().getTime() - start;
        console.info(req.method + " " + req.originalUrl + " " + resp.statusCode + " " + elapsed + "ms");
    });
    next();
};
exports.default = friend;
