import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { getDb } from "./db-init";
import { questionRouter } from "./routes/question.route";
import { choicesRouter } from "./routes/choices.route";
import { authRouter } from "./routes/auth.route";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = 4001;

app.listen(port, async () => {
  await getDb();
  app.use(express.json());
  app.use(cors())

  app.use("/questions", questionRouter());
  app.use("/choices", choicesRouter());
  app.use("/auth", authRouter())
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

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
