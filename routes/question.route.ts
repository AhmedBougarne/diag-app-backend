import { Request, Response, Router } from "express";
import { asyncRoute } from "..";
import { getChoiceWithPreviousQuestionIsNull } from "../services/choices/choices.service";
import {
  findQuestionById,
  getQuestions,
} from "../services/questions/questions.service";

async function getQuestionsRoute(req: Request, res: Response): Promise<void> {
  try {
    const questions = await getQuestions();
    res.json(questions);
  } catch (e) {
    throw e;
  }
}
async function getFirstQuestionRoute(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const choice = await getChoiceWithPreviousQuestionIsNull();
    if (choice && choice.questionId) {
      const question = await findQuestionById(choice.questionId);
      res.json(question);
    }
    res.status(500).json();
  } catch (e) {
    throw e;
  }
}
export function questionRouter(): Router {
  const router = Router();
  router.get("/", asyncRoute(getQuestionsRoute));
  router.get("/first", asyncRoute(getFirstQuestionRoute));

  return router;
}
