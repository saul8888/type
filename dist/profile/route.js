"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var handler_1 = require("./handler");
var profile = express_1.Router();
profile.get("/total", handler_1.getTotalProfiles);
//for profile
profile.post("/register", handler_1.createProfile);
profile.post("/login", handler_1.login);
profile.get("/me", auth_1.auth, handler_1.getProfile);
profile.put("", auth_1.auth, handler_1.updateProfile);
profile.delete("", auth_1.auth, handler_1.deleteProfile);
profile.delete("/logout", auth_1.auth, handler_1.logoutProfile);
profile.delete("/logoutAll", auth_1.auth, handler_1.logoutAllProfile);
exports.default = profile;
