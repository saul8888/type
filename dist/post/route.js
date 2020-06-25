"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var handler_1 = require("./handler");
var post = express_1.Router();
post.get("/total", handler_1.getPosts);
//create a red
post.post("/register", handler_1.createPost);
post.get("/me", handler_1.getPost);
post.put("", handler_1.updatePost);
post.delete("", handler_1.deletePost);
exports.loggerMiddleware = function (req, resp, next) {
    console.info(req.method + " " + req.originalUrl);
    var start = new Date().getTime();
    resp.on('finish', function () {
        var elapsed = new Date().getTime() - start;
        console.info(req.method + " " + req.originalUrl + " " + resp.statusCode + " " + elapsed + "ms");
    });
    next();
};
exports.default = post;
