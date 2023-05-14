import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  public static async findAllMatchesWithTeams(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const filterMatches = await MatchesService.filterProgressQuery(inProgress);
      res.status(200).json(filterMatches);
    }
    const allMatches = await MatchesService.findAllMatchesWithTeams();
    res.status(200).json(allMatches);
  }
}
