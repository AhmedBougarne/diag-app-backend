

import { DataTypes, Model, Sequelize } from "sequelize";
import { Choice } from "./Choice";

export class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public crmId!: string;
  public username!: string;
  public password!: string;
  public role!: string;
}

export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
        id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      crmId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
    }
    
  );
  
}
