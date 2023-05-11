import { Request, Response } from 'express';
import TeamsService from '../service/TeamsService';

export default class TeamsController {
  public static async getAll(req: Request, res: Response) {
    const allTeams = await TeamsService.getAll();
    res.status(200).json(allTeams);
  }
}
