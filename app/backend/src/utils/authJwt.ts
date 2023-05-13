import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

type AppPayload = {
  email: string,
  password: string
};

const generateToken = (payload: AppPayload) => {
  const token = jwt.sign(payload, secretKey);
  return token;
};

const tokenVerify = (token: string): AppPayload => {
  const tokenDecoded = jwt.verify(token, secretKey);
  return tokenDecoded as AppPayload;
};

export default {
  generateToken,
  tokenVerify,
};
