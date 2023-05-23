"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeamsController_1 = require("../controller/TeamsController");
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', (req, res) => TeamsController_1.default.getAll(req, res));
exports.default = teamsRouter;
//# sourceMappingURL=teams.router.js.map