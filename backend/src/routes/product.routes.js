"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/product.routes.ts
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
// POST /api/products
router.post('/', product_controller_1.createProduct);
// GET /api/products
router.get('/', product_controller_1.getAllProducts);
exports.default = router;
