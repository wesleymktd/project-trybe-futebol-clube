import MatchesModel from "../../database/models/MatchesModel"

const mockMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  }
] as unknown as MatchesModel[]

const mockMatchesFinish = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 8,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  }
] as unknown as MatchesModel[]

const mockMatchEdited = {
  id: 49,
  homeTeamId: 5,
  awayTeamId: 3,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
} as MatchesModel

export { mockMatches, mockMatchesFinish, mockMatchEdited }