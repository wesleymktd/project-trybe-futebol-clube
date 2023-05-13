import { Router } from 'express';
import ValidateLogin from '../middlewares/ValidateLogin';
import LoginController from '../controller/LoginController';
import AuthValidate from '../middlewares/AuthValidate';

const loginRouter = Router();

loginRouter.post(
  '/',
  (req, res, next) => ValidateLogin.valid(req, res, next),
  (req, res) => LoginController.login(req, res),
);

loginRouter.get(
  '/role',
  (req, res, next) => AuthValidate.tokenVerifiq(req, res, next),
  (req, res) => LoginController.role(req, res),
);

export default loginRouter;
