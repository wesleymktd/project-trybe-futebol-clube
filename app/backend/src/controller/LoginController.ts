import { Request, Response } from 'express';
import { EmailAuth } from '../middlewares/AuthValidate';
import LoginService from '../service/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    res.status(200).json({ token });
  }

  public static async role(req: Request, res: Response) {
    const { email } = (req as EmailAuth).auth;
    const role = await LoginService.role(email);
    res.status(200).json(role);
  }
}
