"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeamsService_1 = require("../service/TeamsService");
class TeamsController {
    static async getAll(req, res) {
        const allTeams = await TeamsService_1.default.getAll();
        res.status(200).json(allTeams);
    }
}
exports.default = TeamsController;
//# sourceMappingURL=TeamsController.js.map