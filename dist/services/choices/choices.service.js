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
exports.findChoiceById = exports.editChoice = exports.saveChoice = exports.getChoiceWithPreviousQuestionIsNull = exports.getChoices = void 0;
const Choice_1 = require("../../models/Choice");
const getChoices = () => __awaiter(void 0, void 0, void 0, function* () {
    return Choice_1.Choice.findAll();
});
exports.getChoices = getChoices;
const getChoiceWithPreviousQuestionIsNull = () => {
    return Choice_1.Choice.findOne({
        where: {
            previousQuestion: null,
        },
    });
};
exports.getChoiceWithPreviousQuestionIsNull = getChoiceWithPreviousQuestionIsNull;
const saveChoice = (choice) => {
    return Choice_1.Choice.create(Object.assign({}, choice));
};
exports.saveChoice = saveChoice;
const editChoice = (id, choice) => {
    return Choice_1.Choice.upsert(Object.assign(Object.assign({}, choice), { id }));
};
exports.editChoice = editChoice;
const findChoiceById = (id) => {
    return Choice_1.Choice.findOne({
        where: {
            id,
        },
    });
};
exports.findChoiceById = findChoiceById;
