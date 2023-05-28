"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSessionModel = exports.Session = void 0;
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
class Session extends sequelize_1.Model {
}
exports.Session = Session;
function initSessionModel(sequelize) {
    Session.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        choices: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        user: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "sessions",
    });
    Session.belongsTo(User_1.User, { foreignKey: "user" });
}
exports.initSessionModel = initSessionModel;
