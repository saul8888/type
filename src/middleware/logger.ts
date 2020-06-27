import express from 'express';


export const loggerMiddleware = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(`${req.method} ${req.originalUrl}`);
	const start = new Date().getTime();
	resp.on('finish', () => {
		const elapsed = new Date().getTime() - start;
		console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
	});
	next();
};