import TeamsModel from "../../database/models/TeamsModel"

const mockTeams = [
    {
    id: 4,
    teamName: "Corinthians"
  },
  {
    id: 5,
    teamName: "Cruzeiro"
  }
] as TeamsModel[]

const mockTeam = {
  id: 4,
  teamName: "Corinthians"
} as TeamsModel

export { mockTeams, mockTeam }