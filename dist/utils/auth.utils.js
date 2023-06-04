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
exports.ErrorWithStatus = exports.asyncRoute = exports.removeJwtFromCookies = exports.addJwtToCookies = exports.signJwtAsync = exports.getJwtFromRequest = exports.verifyJwt = exports.makeJWTForPayload = exports.jwtConfig = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.jwtConfig = {
    baseJwtSignOptions: {
        issuer: "EAI authentication",
        expiresIn: (1000 * 60 * 30) / 1000,
        algorithm: "HS256",
    },
    headerJwtKey: "Bearer",
};
function makeJWT(id, subject, scope) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, exports.jwtConfig.baseJwtSignOptions), { subject, audience: scope });
        // User ID and email are included in payload so that the app can check the user identity by
        // just reading the JWT, which is especially useful for APIs that need to know which user
        // is querying. The JWT signature ensures the user identity is correct.
        return {
            jwt: yield signJwtAsync({ id }, "nhRNwEQ7VdqvBI3tOxwh", options),
        };
    });
}
function makeJWTForPayload(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = content;
        console.log(content);
        return makeJWT(id, content.username, content.scope);
    });
}
exports.makeJWTForPayload = makeJWTForPayload;
function verifyJwt(jwt, withSecret) {
    return __awaiter(this, void 0, void 0, function* () {
        const decodedJwt = yield verifyJwtAsync(jwt, withSecret || "nhRNwEQ7VdqvBI3tOxwh");
        if (decodedJwt.iss !== exports.jwtConfig.baseJwtSignOptions.issuer) {
            throw new Error("WRONG ISSUER");
        }
        return decodedJwt;
    });
}
exports.verifyJwt = verifyJwt;
function getJwtFromRequest(req) {
    return getCookiesFromAuthorization(req);
}
exports.getJwtFromRequest = getJwtFromRequest;
function getCookiesFromAuthorization(req) {
    if (req && req.originalUrl) {
        return req.headers["authorization"];
    }
}
function signJwtAsync(payload, secret, options) {
    return new Promise((resolve, reject) => (0, jsonwebtoken_1.sign)(payload, secret, options, (err, jwt) => err ? reject(err) : jwt ? resolve(jwt) : reject(err)));
}
exports.signJwtAsync = signJwtAsync;
function verifyJwtAsync(jwt, secret) {
    return new Promise((resolve, reject) => (0, jsonwebtoken_1.verify)(jwt, secret, ((err, jwt) => err ? reject(err) : resolve(jwt))));
}
function addJwtToCookies(res, jwt) {
    res.cookie("jwt", jwt, {
        secure: false,
        httpOnly: true,
        sameSite: false,
        maxAge: 1000 * 60 * 30,
    });
}
exports.addJwtToCookies = addJwtToCookies;
function removeJwtFromCookies(res) {
    if (res.req && res.req.originalUrl) {
        res.clearCookie("jwt");
    }
}
exports.removeJwtFromCookies = removeJwtFromCookies;
function asyncRoute(fn) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield fn(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.asyncRoute = asyncRoute;
class ErrorWithStatus extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ErrorWithStatus = ErrorWithStatus;
