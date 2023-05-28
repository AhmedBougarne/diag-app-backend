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
