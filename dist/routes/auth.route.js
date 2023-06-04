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
exports.authRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const user_service_1 = require("../services/user.service");
const auth_utils_1 = require("../utils/auth.utils");
function signinRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userBody = req.body;
            const user = yield (0, user_service_1.findUser)(userBody);
            if (user) {
                const { jwt } = yield (0, auth_utils_1.makeJWTForPayload)({
                    id: user.id,
                    username: user.role === user_service_1.Role.admin ? user.username : user.crmId,
                    scope: user.role,
                });
                res
                    .status(200)
                    .json({ authenticated: true, message: "Login successfully", jwt });
            }
            else {
                res.status(500).json({ message: " Error sign in", authenticated: false });
            }
        }
        catch (e) {
            throw e;
        }
    });
}
function authRouter() {
    const router = (0, express_1.Router)();
    router.post("/signin", (0, __1.asyncRoute)(signinRoute));
    return router;
}
exports.authRouter = authRouter;
