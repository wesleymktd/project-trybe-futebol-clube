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
  as: 'home_matches',
});

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'away_team_id',
  as: 'away_matches',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'home_team_id',
  as: 'home_team',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'away_team_id',
  as: 'away_team',
});

export default TeamsModel;
