import { Request, Response, Router } from "express";
import { asyncRoute } from "..";
import { findUser, IUser, Role } from "../services/user.service";
import {  makeJWTForPayload } from "../utils/auth.utils";

async function signinRoute(req: Request, res: Response): Promise<void> {
  try {
    const userBody: IUser = req.body;
    const user = await findUser(userBody);
   
    if (user) {
      const { jwt } = await makeJWTForPayload({
        id: user.id,
        username: user.role === Role.admin ? user.username : user.crmId,
        scope: user.role,
      });
      res
        .status(200)
        .json({ authenticated: true, message: "Login successfully", jwt });
    } else {
      res.status(500).json({ message: " Error sign in", authenticated: false });
    }
  } catch (e) {
    throw e;
  }
}
export function authRouter(): Router {
  const router = Router();
  router.post("/signin", asyncRoute(signinRoute));

  return router;
}
