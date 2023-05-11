import TeamsModel, { teamAtributes } from '../database/models/TeamsModel';

export default class TeamsService {
  public static async getAll(): Promise<teamAtributes[]> {
    const teams = TeamsModel.findAll();
    return teams;
  }
}
