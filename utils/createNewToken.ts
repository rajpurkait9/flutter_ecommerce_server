import jwt, { Secret } from "jsonwebtoken";

const CreateJWTToken = (data: tokenData) => {
  const secretKey: Secret | undefined = process.env.SECRET_KEY;
  const expire = process.env.EXP_TOKEN;
  if (secretKey == undefined) return { message: `secret key is undifiend` };
  const { userId, username, email, mobile } = data;
  const token = jwt.sign({ userId, username, email, mobile }, secretKey, {
    expiresIn: expire,
  });

  return token;
};

export { CreateJWTToken };

export interface tokenData {
  userId?: string;
  username: string;
  email: string;
  mobile: number;
  password?: string;
}
