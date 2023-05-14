import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  public static async findAllMatchesWithTeams(req: Request, res: Response) {
    const allMatches = await MatchesService.findAllMatchesWithTeams();
    res.status(200).json(allMatches);
  }
}
