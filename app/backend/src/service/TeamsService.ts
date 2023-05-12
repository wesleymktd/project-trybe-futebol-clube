import TeamsModel, { teamAtributes } from '../database/models/TeamsModel';

export default class TeamsService {
  public static async getAll(): Promise<teamAtributes[]> {
    const teams = TeamsModel.findAll();
    return teams;
  }

  public static async getById(id: number): Promise<teamAtributes | null> {
    const findTeam = TeamsModel.findOne({ where: { id } });
    return findTeam;
  }
}
