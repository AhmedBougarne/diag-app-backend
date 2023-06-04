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
const choices_service_1 = require("../services/choices/choices.service");
const questions_service_1 = require("../services/questions/questions.service");
function getQuestionsRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questions = yield (0, questions_service_1.getQuestions)();
            res.json(questions);
        }
        catch (e) {
            throw e;
        }
    });
}
function getQuestionByIdRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const question = yield (0, questions_service_1.findQuestionById)(Number(id));
            res.json(question);
        }
        catch (e) {
            throw e;
        }
    });
}
function getFirstQuestionRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const choice = yield (0, choices_service_1.getChoiceWithPreviousQuestionIsNull)();
            if (choice && choice.questionId) {
                const question = yield (0, questions_service_1.findQuestionById)(choice.questionId);
                res.json(question);
            }
            res.status(500).json();
        }
        catch (e) {
            throw e;
        }
    });
}
function saveQuestionRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { questionText, questionTitle } = req.body;
            const question = yield (0, questions_service_1.saveQuestion)(questionText, questionTitle);
            if (question) {
                res.json(question);
            }
            res.status(500).json();
        }
        catch (e) {
            throw e;
        }
    });
}
function editQuestionRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { questionText, questionTitle } = req.body;
            const { id } = req.params;
            const question = yield (0, questions_service_1.editQuestion)(Number(id), questionText, questionTitle);
            if (question) {
                res.status(201).json(question);
            }
            res.status(500).json();
        }
        catch (e) {
            throw e;
        }
    });
}
function questionRouter() {
    const router = (0, express_1.Router)();
    router.get("/", (0, __1.asyncRoute)(getQuestionsRoute));
    router.get("/:id", (0, __1.asyncRoute)(getQuestionByIdRoute));
    router.post("/save", (0, __1.asyncRoute)(saveQuestionRoute));
    router.post("/edit/:id", (0, __1.asyncRoute)(editQuestionRoute));
    router.get("/first", (0, __1.asyncRoute)(getFirstQuestionRoute));
    return router;
}
exports.questionRouter = questionRouter;
