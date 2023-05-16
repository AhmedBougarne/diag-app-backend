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
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const questions_service_1 = require("../services/questions/questions.service");
function test(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = yield (0, questions_service_1.getQuestions)();
        res.json(questions);
    });
}
function questionRouter() {
    const router = (0, express_1.Router)();
    router.get("/", (0, __1.asyncRoute)(test));
    return router;
}
exports.questionRouter = questionRouter;
