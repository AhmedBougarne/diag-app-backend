import { Question } from "../../models/Question";

export const getQuestions = () => {
  return Question.findAll();
};
