"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var handler_1 = require("./handler");
var perfil = express_1.Router();
perfil.get("/total", handler_1.getPerfils);
//create a red
perfil.post("/register", handler_1.createPerfil);
perfil.get("/me", handler_1.getPerfil);
perfil.put("", handler_1.updatePerfil);
perfil.delete("", handler_1.deletePerfil);
exports.loggerMiddleware = function (req, resp, next) {
    console.info(req.method + " " + req.originalUrl);
    var start = new Date().getTime();
    resp.on('finish', function () {
        var elapsed = new Date().getTime() - start;
        console.info(req.method + " " + req.originalUrl + " " + resp.statusCode + " " + elapsed + "ms");
    });
    next();
};
exports.default = perfil;
