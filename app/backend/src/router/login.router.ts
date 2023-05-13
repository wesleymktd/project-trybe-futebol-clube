import { Router } from 'express';
import ValidateLogin from '../middlewares/ValidateLogin';
import LoginController from '../controller/LoginController';

const loginRouter = Router();

loginRouter.post(
  '/',
  (req, res, next) => ValidateLogin.valid(req, res, next),
  (req, res) => LoginController.login(req, res),
);

export default loginRouter;
