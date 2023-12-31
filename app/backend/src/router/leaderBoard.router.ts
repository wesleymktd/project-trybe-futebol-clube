import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  (req, res) => LeaderBoardController.findAllHomeLeaderBoard(req, res),
);

leaderBoardRouter.get(
  '/away',
  (req, res) => LeaderBoardController.findAllAwayLeaderBoard(req, res),
);

leaderBoardRouter.get(
  '/',
  (req, res) => LeaderBoardController.findAllGeneralLeaderBoard(req, res),
);

export default leaderBoardRouter;
