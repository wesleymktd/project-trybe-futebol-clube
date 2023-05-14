import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import MatchesModel from './MatchesModel';

export interface teamAtributes {
  id: number;
  teamName: string;
}

class TeamsModel extends Model<teamAtributes> {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    teamName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'teams',
    sequelize,
    timestamps: false,
    underscored: true,
  },
);

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'home_team_id',
  as: 'homeMatches',
});

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'away_team_id',
  as: 'awayMatches',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

export default TeamsModel;
