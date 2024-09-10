import bcrypt from "bcrypt";

export const hashing = async (password: string): Promise<string> => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
