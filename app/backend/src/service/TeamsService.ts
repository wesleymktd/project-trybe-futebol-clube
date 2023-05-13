import ValidateError from '../errors/ValidateError400';
import TeamsModel, { teamAtributes } from '../database/models/TeamsModel';

export default class TeamsService {
  public static async getAll(): Promise<teamAtributes[]> {
    const teams = await TeamsModel.findAll();
    return teams.map((team) => team.toJSON());
  }

  public static async getById(id: number): Promise<teamAtributes | null> {
    const findTeam = await TeamsModel.findOne({ where: { id } });
    if (!findTeam) throw new ValidateError('Team não encontrado');
    return findTeam.toJSON();
  }
}
