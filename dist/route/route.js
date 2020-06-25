"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var handler_1 = require("./handler");
var router = express_1.Router();
router.post("/register", handler_1.createPerfil);
exports.loggerMiddleware = function (req, resp, next) {
    console.info(req.method + " " + req.originalUrl);
    var start = new Date().getTime();
    resp.on('finish', function () {
        var elapsed = new Date().getTime() - start;
        console.info(req.method + " " + req.originalUrl + " " + resp.statusCode + " " + elapsed + "ms");
    });
    next();
};
exports.default = router;
