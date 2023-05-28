"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = void 0;
const sequelize_1 = require("sequelize");
const mariadb = __importStar(require("mariadb"));
const Choice_1 = require("./models/Choice");
const Question_1 = require("./models/Question");
const Session_1 = require("./models/Session");
const User_1 = require("./models/User");
const bcrypt = __importStar(require("bcrypt-nodejs"));
let seqPromise;
function getDb() {
    if (!seqPromise) {
        const dbName = "diagDb";
        seqPromise = mariadb
            .createConnection({
            user: "root",
            password: "nimbleways",
            host: "localhost",
            port: 3304,
        })
            .then(() => {
            // Safe to use sequelize now
            const seq = new sequelize_1.Sequelize(dbName, "root", "nimbleways" || null, {
                host: "localhost",
                port: 3304,
                dialect: "mariadb",
                define: {
                    timestamps: false,
                },
                logging: false,
                dialectOptions: {
                    useUTC: false, // for reading from database
                },
            });
            return seq.authenticate().then(() => seq);
        })
            .then((sequelize) => {
            (0, Question_1.initQuestionModel)(sequelize);
            (0, Choice_1.initChoiceModel)(sequelize);
            (0, User_1.initUserModel)(sequelize);
            (0, Session_1.initSessionModel)(sequelize);
            User_1.User.create({ crmId: "CA0000", role: "agent" });
            User_1.User.create({
                username: "test@gmail.com",
                password: bcrypt.hashSync("Test123@"),
                role: "admin",
            });
            console.log("Connected to MariaDB.");
            return sequelize.sync().then(() => sequelize);
        })
            .catch((err) => {
            console.error("Unable to connect to the database:", err);
            throw err;
        });
    }
    return seqPromise;
}
exports.getDb = getDb;
