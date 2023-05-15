import TeamsModel, { teamAtributes } from '../database/models/TeamsModel';

export default class TeamsService {
  public static async getAll(): Promise<teamAtributes[]> {
    const teams = await TeamsModel.findAll();
    return teams;
  }

  public static async getById(id: number): Promise<teamAtributes | null | string> {
    const findTeam = await TeamsModel.findOne({ where: { id } });
    if (!findTeam) return 'Team não encontrado';
    return findTeam;
  }
}
