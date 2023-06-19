import { Sequelize } from "sequelize";
import * as mariadb from "mariadb";
import { initChoiceModel } from "./models/Choice";
import { initQuestionModel } from "./models/Question";
import { initSessionModel } from "./models/Session";
import { initUserModel, User } from "./models/User";
let seqPromise: Promise<Sequelize>;

export function getDb(): Promise<Sequelize> {
  if (!seqPromise) {
    const dbName = "diagDb";
    seqPromise = mariadb
      .createConnection({
        user: "root",
        password: "nimbleways",
        host: "localhost",
        port: 3304,
      })
      .then(() => {
        // Safe to use sequelize now
        const seq = new Sequelize(
          dbName,
          "root",
          "nimbleways" || (null as any),
          {
            host: "localhost",
            port: 3304,
            dialect: "mariadb",
            define: {
              timestamps: false,
            },
            logging: false,
            dialectOptions: {
              useUTC: false, // for reading from database
            },
          }
        );
        return seq.authenticate().then(() => seq);
      })
      .then(async (sequelize) => {
        initQuestionModel(sequelize);
        initChoiceModel(sequelize);
        initUserModel(sequelize);
        initSessionModel(sequelize);
        await User.create({ crmId: "CA0000", role: "agent" });
        await User.create({
          username: "test@gmail.com",
          password:"Test123@",
          role: "admin",
        });

        console.log("Connected to MariaDB.");
        return sequelize.sync().then(() => sequelize);
      })
      .catch((err: any) => {
        console.error("Unable to connect to the database:", err);
        throw err;
      });
  }
  console.log("gfg")
  return seqPromise;
}
