import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    res.status(200).json({ token });
  }
}
