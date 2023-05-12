import { Request, Response } from 'express';
import TeamsService from '../service/TeamsService';

export default class TeamsController {
  public static async getAll(req: Request, res: Response) {
    const allTeams = await TeamsService.getAll();
    res.status(200).json(allTeams);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getById(Number(id));
    res.status(200).json(team);
  }
}
