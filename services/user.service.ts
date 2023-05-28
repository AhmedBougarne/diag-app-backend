import { User } from "../models/User";
import * as bcrypt from "bcrypt-nodejs";

export interface IUser {
  crmId: string;
  username: string;
  password: string;
  role: string;
}
export enum Role {
  admin = "admin",
  agent = "agent",
}
export const findUser = ({ crmId, username, password, role }: IUser) => {
  if (role === Role.admin) {
    return checkUser<User>(
      User.findOne({ where: { username: username }, raw: true }),
      password
    );
  } else {
    return User.findOne({
      where: {
        crmId,
      },
    });
  }
};

function bcryptCompare(
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(
      plainTextPassword,
      hashedPassword,
      (err: Error, res: boolean) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}
export async function checkUser<T extends User>(
  findUserRes: Promise<T | null>,
  password: string
) {
  const dbUser = await findUserRes;
  if (!dbUser) {
    return null;
  }
  const dbHashedPwd = dbUser.password;
  const isCorrectPassword: boolean = await bcryptCompare(password, dbHashedPwd);
  return isCorrectPassword ? dbUser : null;
}
