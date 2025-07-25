"use strict";
// src/routes/customer.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controllers/customer.controller");
const router = express_1.default.Router();
router.post('/', customer_controller_1.createCustomer);
router.get('/', customer_controller_1.getAllCustomers);
exports.default = router;
