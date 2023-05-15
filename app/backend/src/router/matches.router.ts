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

export default matchesRouter;
