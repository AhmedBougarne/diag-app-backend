import { Request, Response, Router } from "express";
import { asyncRoute } from "..";
import { findUser, IUser } from "../services/user.service";

async function signinRoute(req: Request, res: Response): Promise<void> {
  try {
    const userBody: IUser = req.body;
    const user = await findUser(userBody);
    console.log(user)
    if (user) {
      res.status(200).json({ authenticated: true, message: "Success" });
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
