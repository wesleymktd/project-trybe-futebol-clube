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

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = await MatchesService.finishMatch(Number(id));
    res.status(200).json(result);
  }

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await MatchesService
      .updateMatch(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    res.status(200).json(result);
  }

  public static async createMatch(req: Request, res: Response) {
    const matchEdited = await MatchesService.createMatch(req.body);
    res.status(201).json(matchEdited);
  }
}
