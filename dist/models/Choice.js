"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChoiceModel = exports.Choice = void 0;
const sequelize_1 = require("sequelize");
const Question_1 = require("./Question");
class Choice extends sequelize_1.Model {
}
exports.Choice = Choice;
function initChoiceModel(sequelize) {
    Choice.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nextQuestion: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        value: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        previousQuestion: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        questionId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        response: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
    }, {
        sequelize,
        tableName: "choices",
    });
    Choice.belongsTo(Question_1.Question, { foreignKey: "questionId" });
}
exports.initChoiceModel = initChoiceModel;
