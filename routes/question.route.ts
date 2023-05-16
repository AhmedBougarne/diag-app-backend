import { Request, Response, Router } from "express";
import { asyncRoute } from "..";
import { getQuestions } from "../services/questions/questions.service";

async function test(req: Request, res: Response): Promise<void> {
  const questions = await getQuestions();
  res.json(questions);
}
export function questionRouter(): Router {
  const router = Router();
  router.get("/", asyncRoute(test));
  return router;
}
