import { Router } from "express"
import express from 'express';
import { createPost, getPosts, getPost, updatePost, deletePost } from "./handler"

const post = Router();

post.get("/total", getPosts)
//create a red
post.post("/register", createPost)
post.get("/me", getPost)
post.put("", updatePost)
post.delete("", deletePost)


export const loggerMiddleware = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(`${req.method} ${req.originalUrl}`);
	const start = new Date().getTime();
	resp.on('finish', () => {
		const elapsed = new Date().getTime() - start;
		console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
	});
	next();
};


export default post