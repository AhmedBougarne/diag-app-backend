import { Request, Response, Router } from "express";
import { asyncRoute } from "..";
import { getChoiceWithPreviousQuestionIsNull } from "../services/choices/choices.service";
import {
  editQuestion,
  findQuestionById,
  getQuestions,
  saveQuestion,
} from "../services/questions/questions.service";

async function getQuestionsRoute(req: Request, res: Response): Promise<void> {
  try {
    const questions = await getQuestions();
    res.json(questions);
  } catch (e) {
    throw e;
  }
}

async function getQuestionByIdRoute(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const question = await findQuestionById(Number(id));
    res.json(question);
  } catch (e) {
    throw e;
  }
}

async function getFirstQuestionRoute(
  req: Request,
  res: Response
): Promise<void> {
  try {
    console.log("test")
    const choice = await getChoiceWithPreviousQuestionIsNull();
    console.log("choice",choice)
    if (choice && choice.questionId) {
      const question = await findQuestionById(choice.questionId);
      res.json(question);
      return
    }
    res.status(500).json({});
  } catch (e:any) {
    console.log("error",e.message)
  }
}
async function saveQuestionRoute(req: Request, res: Response): Promise<void> {
  try {
    const { questionText, questionTitle } = req.body;
    const question = await saveQuestion(questionText, questionTitle);
    if (question) {
      res.json(question);
    }
    res.status(500).json();
  } catch (e) {
    throw e;
  }
}

async function editQuestionRoute(req: Request, res: Response): Promise<void> {
  try {
    const { questionText, questionTitle } = req.body;
    const { id } = req.params;
    const question = await editQuestion(
      Number(id),
      questionText,
      questionTitle
    );
    if (question) {
      res.status(201).json(question);
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
  router.get("/:id", asyncRoute(getQuestionByIdRoute));
  router.post("/save", asyncRoute(saveQuestionRoute));
  router.post("/edit/:id", asyncRoute(editQuestionRoute));

  return router;
}
