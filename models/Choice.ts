import { DataTypes, Model, Sequelize } from "sequelize";
import { Question } from "./Question";

export class Choice extends Model {
  public choiceId!: number; // Note that the `null assertion` `!` is required in strict mode.
  public nextQuestion!: number | null;
  public previousQuestion!: number | null;
  public questionId!: number;
  public value!: string;
  public response!: string | null;
}

export function initChoiceModel(sequelize: Sequelize) {
  Choice.init(
    {
      choiceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nextQuestion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      value: { type: DataTypes.STRING, allowNull: true },
      previousQuestion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      questionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      response: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "choices",
    }
  );
  Choice.belongsTo(Question, { foreignKey: "questionId" });
}
