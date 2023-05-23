"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const MatchesModel_1 = require("./MatchesModel");
class TeamsModel extends sequelize_1.Model {
}
TeamsModel.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    teamName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: 'teams',
    sequelize: _1.default,
    timestamps: false,
    underscored: true,
});
TeamsModel.hasMany(MatchesModel_1.default, {
    foreignKey: 'home_team_id',
    as: 'home_matches',
});
TeamsModel.hasMany(MatchesModel_1.default, {
    foreignKey: 'away_team_id',
    as: 'away_matches',
});
MatchesModel_1.default.belongsTo(TeamsModel, {
    foreignKey: 'home_team_id',
    as: 'home_team',
});
MatchesModel_1.default.belongsTo(TeamsModel, {
    foreignKey: 'away_team_id',
    as: 'away_team',
});
exports.default = TeamsModel;
//# sourceMappingURL=TeamsModel.js.map