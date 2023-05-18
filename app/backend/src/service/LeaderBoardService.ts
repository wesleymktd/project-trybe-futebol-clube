import leaderBoard from '../interface/leaderBoard';
import { matchesAtributes } from '../database/models/MatchesModel';
import MatchesService from './MatchesService';
import TeamsService from './TeamsService';

export default class LeaderBoardService {
  public static async findAllLeaderBoard(endPoint: string): Promise<leaderBoard[]> {
    const teams = await TeamsService.getAll();
    const result = Promise.all(teams.map(async (team) => {
      const matches = endPoint === 'home' ? await MatchesService.findMatchesHomeById(team.id)
        : await MatchesService.findMatchesAwayById(team.id);
      return {
        name: team.teamName,
        totalPoints: this.pointsResult(matches, endPoint),
        totalGames: matches.length,
        totalVictories: this.sumVictorys(matches, endPoint),
        totalDraws: this.sumDrawns(matches),
        totalLosses: this.sumLosses(matches, endPoint),
        goalsFavor: this.sumGoalsFavor(matches, endPoint),
        goalsOwn: this.sumGoalsOwn(matches, endPoint),
        goalsBalance: this.resultGoalsBalance(matches, endPoint),
        efficiency: this.resultEfficiency(matches, endPoint),
      };
    }));

    return result;
  }

  public static async findAllGeneral(Leader: leaderBoard[]) {
    const teams = await TeamsService.getAll();
    const resultRedux = teams.map((team) => {
      const leaderRedux = Leader.filter((match) => match.name === team.teamName);
      return { name: team.teamName,
        totalPoints: leaderRedux[0].totalPoints + leaderRedux[1].totalPoints,
        totalGames: leaderRedux[0].totalGames + leaderRedux[1].totalGames,
        totalVictories: leaderRedux[0].totalVictories + leaderRedux[1].totalVictories,
        totalDraws: leaderRedux[0].totalDraws + leaderRedux[1].totalDraws,
        totalLosses: leaderRedux[0].totalLosses + leaderRedux[1].totalLosses,
        goalsFavor: leaderRedux[0].goalsFavor + leaderRedux[1].goalsFavor,
        goalsOwn: leaderRedux[0].goalsOwn + leaderRedux[1].goalsOwn,
        goalsBalance: leaderRedux[0].goalsBalance + leaderRedux[1].goalsBalance,
        efficiency: Number((((leaderRedux[0].totalPoints + leaderRedux[1].totalPoints)
        / ((leaderRedux[0].totalGames + leaderRedux[1].totalGames) * 3)) * 100).toFixed(2)),
      };
    });
    const result = await this.resultSort(resultRedux);
    return result;
  }

  public static pointsResult(matches: matchesAtributes[], endPoint: string) {
    if (endPoint === 'home') {
      const result = matches.reduce((acc, match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) return acc + 3;
        if (match.homeTeamGoals < match.awayTeamGoals) return acc;

        return acc + 1;
      }, 0);
      return result;
    }
    const result = matches.reduce((acc, match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) return acc + 3;

      if (match.awayTeamGoals < match.homeTeamGoals) return acc;

      return acc + 1;
    }, 0);
    return result;
  }

  public static sumVictorys(matches: matchesAtributes[], endPoint: string) {
    if (endPoint === 'home') {
      const result = matches.reduce((acc, match) =>
        (match.homeTeamGoals > match.awayTeamGoals ? acc + 1 : acc), 0);
      return result;
    }

    const result = matches.reduce((acc, match) =>
      (match.awayTeamGoals > match.homeTeamGoals ? acc + 1 : acc), 0);
    return result;
  }

  public static sumLosses(matches: matchesAtributes[], endPoint: string) {
    if (endPoint === 'home') {
      const result = matches.reduce((acc, match) =>
        (match.homeTeamGoals < match.awayTeamGoals ? acc + 1 : acc), 0);
      return result;
    }
    const result = matches.reduce((acc, match) =>
      (match.awayTeamGoals < match.homeTeamGoals ? acc + 1 : acc), 0);
    return result;
  }

  public static sumDrawns(matches: matchesAtributes[]) {
    const result = matches.reduce((acc, match) =>
      (match.homeTeamGoals === match.awayTeamGoals ? acc + 1 : acc), 0);
    return result;
  }

  public static sumGoalsFavor(matches: matchesAtributes[], endPoint: string) {
    if (endPoint === 'home') {
      const result = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
      return result;
    }
    const result = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return result;
  }

  public static sumGoalsOwn(matches: matchesAtributes[], endPoint: string) {
    if (endPoint === 'home') {
      const result = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
      return result;
    }
    const result = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return result;
  }

  public static resultGoalsBalance(matches: matchesAtributes[], endPoint: string) {
    const result = this.sumGoalsFavor(matches, endPoint) - this.sumGoalsOwn(matches, endPoint);
    return result;
  }

  public static resultEfficiency(matches: matchesAtributes[], endPoint: string) {
    const result = (this.pointsResult(matches, endPoint) / ((matches.length) * 3)) * 100;
    return Number(result.toFixed(2));
  }

  public static async resultSort(param: string | leaderBoard[]): Promise<leaderBoard[]> {
    const origin = typeof param === 'string' ? await this.findAllLeaderBoard(param)
      : param;
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
