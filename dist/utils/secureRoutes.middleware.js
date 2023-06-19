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
exports.secureRoutesMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_utils_1 = require("../utils/auth.utils");
const constants_1 = require("./constants");
function secureRoutesMiddleware(scope) {
    if (!scope) {
        throw new Error("Scope required.");
    }
    const scopes = Array.isArray(scope) ? scope : [scope];
    return (0, auth_utils_1.asyncRoute)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const jwt = (0, auth_utils_1.getJwtFromRequest)(req);
        if (!jwt) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            return;
        }
        let decoded;
        try {
            decoded = yield (0, auth_utils_1.verifyJwt)(jwt);
        }
        catch (err) {
            if (err && err.name) {
                switch (err.name) {
                    case "JsonWebTokenError":
                    case "SyntaxError":
                    case "TokenExpiredError":
                        err.status = http_status_codes_1.StatusCodes.UNAUTHORIZED;
                        break;
                }
            }
            throw err;
        }
        const jwtScopes = Array.isArray(decoded.aud) ? decoded.aud : [decoded.aud];
        if (!hasScope(scopes, jwtScopes)) {
            throw errWithStatus(constants_1.UNAUTHORIZED_SCOPE, http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        // @ts-ignore
        req.jwt = decoded;
        // TODO : change type of Request to by dynamic
        // @ts-ignore
        req.user = { email: decoded.sub, id: decoded.id, scope: jwtScopes };
        // @ts-ignore
        next();
    }));
}
exports.secureRoutesMiddleware = secureRoutesMiddleware;
function hasScope(routeScopes, jwtScopes) {
    for (const s of jwtScopes) {
        if (routeScopes.indexOf(s) !== -1) {
            return true;
        }
    }
    return false;
}
function errWithStatus(NO_BEARER_TOKEN, UNAUTHORIZED) {
    throw new Error(`${NO_BEARER_TOKEN} - ${UNAUTHORIZED}`);
}
