import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  AppJwt,
  asyncRoute,
  getJwtFromRequest,
  verifyJwt,
} from "../utils/auth.utils";
import { NO_BEARER_TOKEN, UNAUTHORIZED_SCOPE } from "./constants";

export function secureRoutesMiddleware(scope: string | string[]) {
  if (!scope) {
    throw new Error("Scope required.");
  }
  const scopes = Array.isArray(scope) ? scope : [scope];
  return asyncRoute(async (req: Request, res: Response, next: NextFunction) => {
    const jwt = getJwtFromRequest(req);
    console.log(jwt)
    if (!jwt) {
     res.status(StatusCodes.UNAUTHORIZED)
     return;
    }
    let decoded: AppJwt;
    try {
      decoded = await verifyJwt(jwt);
    } catch (err: any) {
      if (err && err.name) {
        switch (err.name) {
          case "JsonWebTokenError":
          case "SyntaxError":
          case "TokenExpiredError":
            err.status = StatusCodes.UNAUTHORIZED;
            break;
        }
      }
      throw err;
    }
    const jwtScopes = Array.isArray(decoded.aud) ? decoded.aud : [decoded.aud];
    if (!hasScope(scopes, jwtScopes)) {
      throw errWithStatus(UNAUTHORIZED_SCOPE, StatusCodes.FORBIDDEN);
    }
    // @ts-ignore
    req.jwt = decoded;
    console.log("decoded",decoded)

    // TODO : change type of Request to by dynamic
    // @ts-ignore
    req.user = { email: decoded.sub, id: decoded.id, scope: jwtScopes };
    // @ts-ignore
    console.log("req.user", req.user)
    next();
  });
}

function hasScope(routeScopes: string[], jwtScopes: string[]): boolean {
  for (const s of jwtScopes) {
    if (routeScopes.indexOf(s) !== -1) {
      return true;
    }
  }
  return false;
}
function errWithStatus(NO_BEARER_TOKEN: string, UNAUTHORIZED: StatusCodes) {
  throw new Error(`${NO_BEARER_TOKEN} - ${UNAUTHORIZED}`);
}
