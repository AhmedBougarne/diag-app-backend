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
exports.choicesRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const choices_service_1 = require("../services/choices/choices.service");
function getChoicesRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const choices = yield (0, choices_service_1.getChoices)();
            res.json(choices);
        }
        catch (e) {
            throw `Error : ${e}`;
        }
    });
}
function getChoiceByIdRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const question = yield (0, choices_service_1.findChoiceById)(Number(id));
            res.json(question);
        }
        catch (e) {
            throw e;
        }
    });
}
function saveChoiceRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const choice = req.body;
            const question = yield (0, choices_service_1.saveChoice)(choice);
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
function editChoiceRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const choice = req.body;
            const { id } = req.params;
            console.log("d;smf;ds");
            console.log("id", id);
            console.log("choice", choice);
            const question = yield (0, choices_service_1.editChoice)(Number(id), choice);
            console.log("hola");
            if (question) {
                res.status(201).json(question);
            }
            res.status(500).json();
        }
        catch (e) {
            console.log(e.message);
            throw e;
        }
    });
}
function choicesRouter() {
    const router = (0, express_1.Router)();
    router.get("/", (0, __1.asyncRoute)(getChoicesRoute));
    router.get("/:id", (0, __1.asyncRoute)(getChoiceByIdRoute));
    router.post("/save", (0, __1.asyncRoute)(saveChoiceRoute));
    router.post("/edit/:id", (0, __1.asyncRoute)(editChoiceRoute));
    return router;
}
exports.choicesRouter = choicesRouter;
