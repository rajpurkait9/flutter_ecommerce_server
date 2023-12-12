"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ConnectDB = (uri) => {
    try {
        if (!uri) {
            throw new Error("URI is undefined");
        }
        mongoose_1.default.connect(uri);
        console.log("DB is connected");
    }
    catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
exports.default = ConnectDB;
