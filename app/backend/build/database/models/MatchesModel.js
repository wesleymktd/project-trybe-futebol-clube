"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class MatchesModel extends sequelize_1.Model {
}
MatchesModel.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    homeTeamId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'teams',
            key: 'id',
        },
    },
    homeTeamGoals: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    awayTeamId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'teams',
            key: 'id',
        },
    },
    awayTeamGoals: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    inProgress: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    tableName: 'matches',
    sequelize: _1.default,
    timestamps: false,
    underscored: true,
});
exports.default = MatchesModel;
//# sourceMappingURL=MatchesModel.js.map