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

  public static async filterProgressQuery(query: string) {
    const matchFilter = await MatchesModel.findAll({
      where: { inProgress: query === 'true' },
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
        }],
    });
    return matchFilter;
  }

  public static async finishMatch(id: number) {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
    return { message: 'finished' };
  }

  public static async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'match updated' };
  }
}
