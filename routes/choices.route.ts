import { Request, Response, Router } from "express";
import { asyncRoute } from "..";
import {
  editChoice,
  findChoiceById,
  getChoices,
  saveChoice,
} from "../services/choices/choices.service";

async function getChoicesRoute(req: Request, res: Response): Promise<void> {
  try {
    const choices = await getChoices();
    res.json(choices);
  } catch (e) {
    throw `Error : ${e}`;
  }
}

async function getChoiceByIdRoute(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const question = await findChoiceById(Number(id));
    res.json(question);
  } catch (e) {
    throw e;
  }
}

async function saveChoiceRoute(req: Request, res: Response): Promise<void> {
  try {
    const choice = req.body;
    const question = await saveChoice(choice);
    if (question) {
      res.json(question);
    }
    res.status(500).json();
  } catch (e) {
    throw e;
  }
}

async function editChoiceRoute(req: Request, res: Response): Promise<void> {
  try {
    const choice = req.body;
    const { id } = req.params;

    const question = await editChoice(Number(id), choice);

    if (question) {
      res.status(201).json(question);
    }
    res.status(500).json();
  } catch (e: any) {
    console.log(e.message);
    throw e;
  }
}
export function choicesRouter(): Router {
  const router = Router();
  router.get("/", asyncRoute(getChoicesRoute));
  router.get("/:id", asyncRoute(getChoiceByIdRoute));
  router.post("/save", asyncRoute(saveChoiceRoute));
  router.post("/edit/:id", asyncRoute(editChoiceRoute));
  return router;
}
