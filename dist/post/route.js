"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var handler_1 = require("./handler");
var post = express_1.Router();
//create a red
post.post("/newpost", auth_1.auth, handler_1.createPost);
post.get("/me/:id", auth_1.auth, handler_1.getPost);
post.get("/total", auth_1.auth, handler_1.getTotalPost);
post.put("/me/:id", auth_1.auth, handler_1.updatePost);
post.delete("/me/:id", auth_1.auth, handler_1.deletePost);
exports.default = post;
