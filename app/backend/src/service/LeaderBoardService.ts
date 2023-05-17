import leaderBoard from '../interface/leaderBoard';
import { matchesAtributes } from '../database/models/MatchesModel';
import MatchesService from './MatchesService';
import TeamsService from './TeamsService';

export default class LeaderBoardService {
  public static async findAllHomeLeaderBoard(): Promise<leaderBoard[]> {
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
        goalsOwn: this.sumGoalsOwn(matchesHome),
        goalsBalance: this.resultGoalsBalance(matchesHome),
        efficiency: this.resultEfficiency(matchesHome),
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

  public static resultGoalsBalance(matches: matchesAtributes[]) {
    const result = this.sumGoalsFavor(matches) - this.sumGoalsOwn(matches);
    return result;
  }

  public static resultEfficiency(matches: matchesAtributes[]) {
    const result = (this.pointsResult(matches) / ((matches.length) * 3)) * 100;
    return Number(result.toFixed(2));
  }

  public static async resultSort() {
    const origin = await this.findAllHomeLeaderBoard();
    const sortArray = origin.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      } if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      } if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });

    return sortArray;
  }
}
