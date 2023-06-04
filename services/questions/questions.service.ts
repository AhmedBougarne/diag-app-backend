import { Question } from "../../models/Question";

export const getQuestions = () => {
  return Question.findAll();
};

export const findQuestionById = (id: number) => {
  return Question.findOne({
    where: {
      id,
    },
  });
};

export const saveQuestion = (questionText: string, questionTitle: string) => {
  return Question.create({
    questionText,
    questionTitle,
  });
};
export const editQuestion = (
  id: number,
  questionText: string,
  questionTitle: string
) => {
  return Question.upsert({
    questionText,
    questionTitle,
    id,
  });
};
