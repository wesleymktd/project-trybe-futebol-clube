import { Request, Response } from 'express';
import LeaderBoardService from '../service/LeaderBoardService';

export default class LeaderBoardController {
  public static async findAllHomeLeaderBoard(req: Request, res: Response) {
    const result = await LeaderBoardService.resultSort('home');
    res.status(200).json(result);
  }

  public static async findAllAwayLeaderBoard(req: Request, res: Response) {
    const result = await LeaderBoardService.resultSort('away');
    res.status(200).json(result);
  }

  public static async findAllGeneralLeaderBoard(req: Request, res: Response) {
    const homeLeader = await LeaderBoardService.resultSort('home');
    const awayLeader = await LeaderBoardService.resultSort('await');
    const result = await LeaderBoardService.findAllGeneral([...homeLeader, ...awayLeader]);
    res.status(200).json(result);
  }
}
