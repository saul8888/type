"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.PORT = process.env.PORT;
exports.USERDB = process.env.USERDB;
exports.PASSWORD = process.env.PASSWORD;
exports.DATABASE = process.env.DATABASE;
exports.URL = "mongodb+srv://" + exports.USERDB + ":" + exports.PASSWORD + "@cluster0-ooeaq.mongodb.net/" + exports.DATABASE + "?retryWrites=true&w=majority";
/*
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });
*/ 
