import TeamsModel from '../database/models/TeamsModel';
import MatchesModel, { matchesAtributes } from '../database/models/MatchesModel';
import matchesInsert from '../interface/matchesInsert';
import TeamsService from './TeamsService';
import ValidateError422 from '../errors/ValidateError422';
import ValidateError404 from '../errors/ValidateError404';

export default class MatchesService {
  public static async findAllMatchesWithTeams(): Promise<matchesAtributes[]> {
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

  public static async findMatchesHomeById(id: number): Promise<matchesAtributes[]> {
    const matches = await MatchesModel.findAll({
      where: { homeTeamId: id, inProgress: false },
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

  public static async findMatchesAwayById(id: number): Promise<matchesAtributes[]> {
    const matches = await MatchesModel.findAll({
      where: { awayTeamId: id, inProgress: false },
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

  public static async createMatch(matcheInsert: matchesInsert) {
    if (matcheInsert.awayTeamId === matcheInsert.homeTeamId) {
      throw new ValidateError422('It is not possible to create a match with two equal teams');
    }
    const idHome = await TeamsService.getById(matcheInsert.homeTeamId);
    const idAway = await TeamsService.getById(matcheInsert.awayTeamId);

    if (typeof idHome === 'string' || typeof idAway === 'string') {
      throw new ValidateError404('There is no team with such id!');
    }

    const newMatch = await MatchesModel.create({
      ...matcheInsert,
      inProgress: true,
    });
    return newMatch;
  }
}
