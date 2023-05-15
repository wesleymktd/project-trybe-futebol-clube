import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import AuthValidate from '../middlewares/AuthValidate';

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => MatchesController.findAllMatchesWithTeams(req, res));

matchesRouter.patch(
  '/:id/finish',
  (req, res, next) => AuthValidate.tokenVerifiq(req, res, next),
  (req, res) => MatchesController.finishMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  (req, res, next) => AuthValidate.tokenVerifiq(req, res, next),
  (req, res) => MatchesController.updateMatch(req, res),
);

matchesRouter.post(
  '/',
  (req, res, next) => AuthValidate.tokenVerifiq(req, res, next),
  (req, res) => MatchesController.createMatch(req, res),
);

export default matchesRouter;
