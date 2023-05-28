import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./User";

export class Session extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public choices!: string;
  public user!: number;
}
export function initSessionModel(sequelize: Sequelize) {
  Session.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      choices: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      user: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "sessions",
    }
  );
  Session.belongsTo(User, { foreignKey: "user" });
}
