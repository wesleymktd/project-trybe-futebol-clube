import { NextFunction, Request, Response } from 'express';
import ValidateError401 from '../errors/ValidateError401';
import authJwt from '../utils/authJwt';

export type EmailAuth = Request & {
  auth: {
    email: string
  }
};

export default class AuthValidate {
  public static tokenVerifiq(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ValidateError401('Token not found');
    }

    try {
      const decodedAuth = authJwt.tokenVerify(authorization);
      (req as EmailAuth).auth = { email: decodedAuth.email };
    } catch (error) {
      throw new ValidateError401('Token must be a valid token');
    }

    next();
  }
}
