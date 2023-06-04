import { NextFunction, Request, Response } from "express";
import {
  Secret,
  sign,
  SignOptions,
  verify,
  VerifyCallback,
  VerifyErrors,
} from "jsonwebtoken";

export const jwtConfig: any = {
  baseJwtSignOptions: {
    issuer: "EAI authentication",
    expiresIn: (1000 * 60 * 30) / 1000,
    algorithm: "HS256",
  },
  headerJwtKey: "Bearer",
};

export interface JWTCraft {
  jwt: string;
}
export interface AppUser {
  id: number | string;
  scope: string | string[];
  username: string;
}

export interface AppJwt extends AppUser {
  iat: number;
  exp: number;
  aud: string | string[];
  iss: string;
  sub: string;
}

async function makeJWT(
  id: number | string,
  subject: string,
  scope: string | string[]
) {
  const options: SignOptions = {
    ...jwtConfig.baseJwtSignOptions,
    subject,
    audience: scope,
  };
  // User ID and email are included in payload so that the app can check the user identity by
  // just reading the JWT, which is especially useful for APIs that need to know which user
  // is querying. The JWT signature ensures the user identity is correct.
  return {
    jwt: await signJwtAsync({ id }, "nhRNwEQ7VdqvBI3tOxwh", options),
  };
}

export async function makeJWTForPayload(content: AppUser): Promise<JWTCraft> {
  const { id } = content;
  console.log(content)
  return makeJWT(id, (content as AppUser).username, content.scope);
}

export async function verifyJwt(
  jwt: string,
  withSecret?: string
): Promise<AppJwt> {
  const decodedJwt: AppJwt = await verifyJwtAsync(
    jwt,
    withSecret || "nhRNwEQ7VdqvBI3tOxwh"
  );
  if (decodedJwt.iss !== jwtConfig.baseJwtSignOptions.issuer) {
    throw new Error("WRONG ISSUER");
  }

  return decodedJwt;
}

export function getJwtFromRequest(req: Request): string | undefined {
  return getCookiesFromAuthorization(req);
}

function getCookiesFromAuthorization(req: Request): string | undefined {
  if (req && req.originalUrl) {
    return req.headers["authorization"];
  }
}

export function signJwtAsync(
  payload: string | Buffer | object,
  secret: Secret,
  options: SignOptions
): Promise<string> {
  return new Promise<string>((resolve, reject) =>
    sign(payload, secret, options, (err: any, jwt?: string) =>
      err ? reject(err) : jwt ? resolve(jwt) : reject(err)
    )
  );
}

function verifyJwtAsync(jwt: string, secret: string | Buffer): Promise<AppJwt> {
  return new Promise<any>((resolve, reject) =>
    verify(jwt, secret, ((err: VerifyErrors, jwt: AppJwt) =>
      err ? reject(err) : resolve(jwt)) as VerifyCallback)
  );
}

export function addJwtToCookies(res: Response, jwt: string) {
  res.cookie("jwt", jwt, {
    secure: false,
    httpOnly: true,
    sameSite: false,
    maxAge: 1000 * 60 * 30,
  });
}

export function removeJwtFromCookies(res: Response) {
  if (res.req && res.req.originalUrl) {
    res.clearCookie("jwt");
  }
}

export function asyncRoute(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
  
  export class ErrorWithStatus extends Error {
    constructor(message: string, public status: number) {
      super(message);
    }
  }