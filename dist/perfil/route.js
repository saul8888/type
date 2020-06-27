"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var handler_1 = require("./handler");
var perfil = express_1.Router();
perfil.get("/total", handler_1.getTotalPerfils);
//for user
perfil.post("/register", handler_1.createPerfil);
perfil.post("/login", handler_1.login);
perfil.get("/me", auth_1.auth, handler_1.getPerfil);
perfil.put("", auth_1.auth, handler_1.updatePerfil);
perfil.delete("", auth_1.auth, handler_1.deletePerfil);
exports.default = perfil;
