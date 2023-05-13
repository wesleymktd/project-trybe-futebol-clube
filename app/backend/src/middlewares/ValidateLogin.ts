import { NextFunction, Request, Response } from 'express';
import ValidateError401 from '../errors/ValidateError401';
import ValidateError400 from '../errors/ValidateError400';

export default class ValidateLogin {
  public static isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public static valid(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) throw new ValidateError400('All fields must be filled');
    if (!ValidateLogin.isValidEmail(email) || password.length < 6) {
      throw new ValidateError401('Invalid email or password');
    }

    next();
  }
}
