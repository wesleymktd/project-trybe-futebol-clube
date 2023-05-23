"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teams_router_1 = require("./teams.router");
const router = (0, express_1.Router)();
router.use('/teams', teams_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map