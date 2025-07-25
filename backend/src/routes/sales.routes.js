"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sales_controller_1 = require("../controllers/sales.controller");
const router = express_1.default.Router();
// POST /api/sales
router.post('/', sales_controller_1.createSales);
// GET /api/sales
// router.get('/', getAllSales)
exports.default = router;
