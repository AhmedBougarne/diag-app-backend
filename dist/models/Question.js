"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initQuestionModel = exports.Question = void 0;
const sequelize_1 = require("sequelize");
class Question extends sequelize_1.Model {
}
exports.Question = Question;
function initQuestionModel(sequelize) {
    Question.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        questionText: {
            type: sequelize_1.DataTypes.STRING(128),
            allowNull: true,
        },
        questionTitle: {
            type: sequelize_1.DataTypes.STRING(128),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "questions",
    });
}
exports.initQuestionModel = initQuestionModel;
