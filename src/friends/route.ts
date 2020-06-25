import { Router } from "express"
import express from 'express';
import { createFriend, getFriends, getFriend, updateFriend, deleteFriend } from "./handler"

const friend = Router();

friend.get("/total", getFriends)
//create a red
friend.post("/register", createFriend)
friend.get("/me", getFriend)
friend.put("", updateFriend)
friend.delete("", deleteFriend)

export const loggerMiddleware = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(`${req.method} ${req.originalUrl}`);
	const start = new Date().getTime();
	resp.on('finish', () => {
		const elapsed = new Date().getTime() - start;
		console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
	});
	next();
};


export default friend