import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

export interface matchesAtributes {
  id: number;
  homeTeamId: string;
  homeTeamGoals: string;
  awayTeamId: string;
  awayTeamGoals: string;
  inProgress: boolean;
}

class MatchesModel extends Model<matchesAtributes> {
  declare id: number;
  declare homeTeamId: string;
  declare homeTeamGoals: string;
  declare awayTeamId: string;
  declare awayTeamGoals: string;
  declare inProgress: boolean;
}

MatchesModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    homeTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'matches',
    sequelize,
    timestamps: false,
    underscored: true,
  },
);

export default MatchesModel;
