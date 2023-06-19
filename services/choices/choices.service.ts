import { Choice, IChoice } from "../../models/Choice";

export const getChoices = async () => {
  return Choice.findAll();
};
export const getChoiceWithPreviousQuestionIsNull = () => {
  console.log("hola")
  return Choice.findOne({
    where: {
      previousQuestion: null,
    },
  });
};

export const saveChoice = (choice: IChoice) => {
  return Choice.create({
    ...choice
  });
};
export const editChoice = (
  id: number,
  choice: IChoice
) => {
  return Choice.upsert({
    ...choice,
    id,
  });
};

export const findChoiceById = (id: number) => {
  return Choice.findOne({
    where: {
      id,
    },
  });
};