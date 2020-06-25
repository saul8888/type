import { Router } from "express"
import express from 'express';
import { createPerfil, getPerfils, getPerfil, updatePerfil, deletePerfil, login } from "./handler"

const perfil = Router();

perfil.get("/total", getPerfils)
//create a red
perfil.post("/register", createPerfil)
perfil.post("/login", login)
perfil.get("/me", getPerfil)
perfil.put("", updatePerfil)
perfil.delete("", deletePerfil)


export const loggerMiddleware = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(`${req.method} ${req.originalUrl}`);
	const start = new Date().getTime();
	resp.on('finish', () => {
		const elapsed = new Date().getTime() - start;
		console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
	});
	next();
};


export default perfil