"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var database_1 = require("./db/database");
var route_1 = __importDefault(require("./profile/route"));
var route_2 = __importDefault(require("./post/route"));
var route_3 = __importDefault(require("./friends/route"));
var logger_1 = require("./middleware/logger");
var config_1 = require("./config/config");
var app = express_1.default();
app.use(body_parser_1.json());
database_1.connect();
app.use(logger_1.loggerMiddleware);
app.use('/profile', route_1.default);
app.use('/post', route_2.default);
app.use('/friend', route_3.default);
app.listen(config_1.PORT);
