// import ValidateError422 from '../errors/ValidateError422';
// import ValidateError404 from '../errors/ValidateError404';

import { matchesAtributes } from '../database/models/MatchesModel';
import MatchesService from './MatchesService';
import TeamsService from './TeamsService';

export default class LeaderBoardService {
  public static async findAllHomeLeaderBoard() {
    const teams = await TeamsService.getAll();
    const result = Promise.all(teams.map(async (team) => {
      const matchesHome = await MatchesService.findMatchesById(team.id);
      return {
        name: team.teamName,
        totalPoints: this.pointsResult(matchesHome),
        totalGames: matchesHome.length,
        totalVictories: this.sumVictorys(matchesHome),
        totalDraws: this.sumDrawns(matchesHome),
        totalLosses: this.sumLosses(matchesHome),
        goalsFavor: this.sumGoalsFavor(matchesHome),
        goalsOwn: this.sumLosses(matchesHome),
      };
    }));

    return result;
  }

  public static pointsResult(matches: matchesAtributes[]) {
    const result = matches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return acc + 3;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return acc;
      }

      return acc + 1;
    }, 0);
    return result;
  }

  public static sumVictorys(matches: matchesAtributes[]) {
    const result = matches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return result;
  }

  public static sumLosses(matches: matchesAtributes[]) {
    const result = matches.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return result;
  }

  public static sumDrawns(matches: matchesAtributes[]) {
    const result = matches.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return result;
  }

  public static sumGoalsFavor(matches: matchesAtributes[]) {
    const result = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return result;
  }

  public static sumGoalsOwn(matches: matchesAtributes[]) {
    const result = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return result;
  }
}
