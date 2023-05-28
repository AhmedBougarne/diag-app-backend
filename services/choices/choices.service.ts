import { Choice } from "../../models/Choice";

export const getChoices = async () => {
  return Choice.findAll();
};
export const getChoiceWithPreviousQuestionIsNull = () => {
  return Choice.findOne({
    where: {
      previousQuestion: null,
    },
  });
};
