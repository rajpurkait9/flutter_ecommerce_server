"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// application
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// middlewares
app.use(express_1.default.json());
// routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const mongoConnect_1 = __importDefault(require("./DBs/mongoConnect"));
app.use("/api/user", user_routes_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, mongoConnect_1.default)(process.env.MONGO_URI);
            app.listen(port, () => {
                console.log(`server is running ${port}`);
            });
        }
        catch (error) {
            const message = error.message || "Internal server error";
            const statusCode = error.statusCode || 500;
            console.log(`Error: ${message} - Status code: ${statusCode}`);
            process.exit(1);
        }
    });
}
// run application
main();
