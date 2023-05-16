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
exports.asyncRoute = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_init_1 = require("./db-init");
const question_route_1 = require("./routes/question.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 4001;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_init_1.getDb)();
    app.use(express_1.default.json());
    app.use("/questions", (0, question_route_1.questionRouter)());
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}));
function asyncRoute(fn) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield fn(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.asyncRoute = asyncRoute;
