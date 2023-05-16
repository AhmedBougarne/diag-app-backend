import { DataTypes, Model, Sequelize } from "sequelize";

export class Question extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public questionText!: string;
  public questionTitle!: string;
}

export function initQuestionModel(sequelize: Sequelize) {
  Question.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      questionText: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      questionTitle: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "questions",
    }
  );
}
