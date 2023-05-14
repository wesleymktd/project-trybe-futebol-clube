import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  public static async findAllMatchesWithTeams() {
    const matches = await MatchesModel.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        {
          model: TeamsModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamsModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return matches;
  }
}
