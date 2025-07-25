"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tax_controller_1 = require("../controllers/tax.controller");
const router = express_1.default.Router();
// POST /api/taxes
router.post('/', tax_controller_1.createTax);
exports.default = router;
