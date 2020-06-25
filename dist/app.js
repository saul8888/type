"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var database_1 = require("./db/database");
var route_1 = __importDefault(require("./perfil/route"));
var route_2 = __importDefault(require("./post/route"));
var route_3 = __importDefault(require("./friends/route"));
var route_4 = require("./perfil/route");
var app = express_1.default();
app.use(body_parser_1.json());
database_1.connect();
app.use(route_4.loggerMiddleware);
app.use('/api', route_1.default);
app.use('/api', route_2.default);
app.use('/api', route_3.default);
app.listen(3000);