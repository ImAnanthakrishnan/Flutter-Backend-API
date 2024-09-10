import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types/modelTypes";

const hashing = async (password: string): Promise<string> => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const generateToken = (user: IUser) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
};

export { hashing, generateToken };
