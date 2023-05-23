"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeamsModel_1 = require("../database/models/TeamsModel");
class TeamsService {
    static async getAll() {
        const teams = TeamsModel_1.default.findAll();
        return teams;
    }
}
exports.default = TeamsService;
//# sourceMappingURL=TeamsService.js.map