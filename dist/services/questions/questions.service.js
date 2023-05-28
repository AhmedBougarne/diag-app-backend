"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findQuestionById = exports.getQuestions = void 0;
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
