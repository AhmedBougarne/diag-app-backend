import { Request, Response, Router } from "express";
import { asyncRoute } from "..";
import { getChoices } from "../services/choices/choices.service";

async function getChoicesRoute(req: Request, res: Response): Promise<void> {
  try {
    const choices = await getChoices();
    res.json(choices);
  } catch (e) {
    throw `Error : ${e}`;
  }
}
export function choicesRouter(): Router {
  const router = Router();
  router.get("/", asyncRoute(getChoicesRoute));
  return router;
}
