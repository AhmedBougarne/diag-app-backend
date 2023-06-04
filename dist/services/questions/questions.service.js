"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editQuestion = exports.saveQuestion = exports.findQuestionById = exports.getQuestions = void 0;
const Question_1 = require("../../models/Question");
const getQuestions = () => {
    return Question_1.Question.findAll();
};
exports.getQuestions = getQuestions;
const findQuestionById = (id) => {
    return Question_1.Question.findOne({
        where: {
            id,
        },
    });
};
exports.findQuestionById = findQuestionById;
const saveQuestion = (questionText, questionTitle) => {
    return Question_1.Question.create({
        questionText,
        questionTitle,
    });
};
exports.saveQuestion = saveQuestion;
const editQuestion = (id, questionText, questionTitle) => {
    return Question_1.Question.upsert({
        questionText,
        questionTitle,
        id,
    });
};
exports.editQuestion = editQuestion;
