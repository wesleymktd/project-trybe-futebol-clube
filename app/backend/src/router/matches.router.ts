import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => MatchesController.findAllMatchesWithTeams(req, res));

export default matchesRouter;
