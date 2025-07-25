"use strict";
// src/controllers/customer.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCustomers = exports.createCustomer = void 0;
const client_1 = __importDefault(require("../db/client"));
// 👉 POST /customers - Create a customer
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, mobileNo, city, userId, modifiedUserId } = req.body;
        // Foreign key check (optional)
        const userExists = yield client_1.default.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        const customer = yield client_1.default.customer.create({
            data: {
                name,
                mobileNo,
                city,
                userId,
                modifiedUserId,
            }
        });
        res.status(201).json({ success: true, data: customer });
    }
    catch (error) {
        console.error('Create Customer Error:', error);
        res.status(500).json({ success: false, message: 'Failed to create customer' });
    }
});
exports.createCustomer = createCustomer;
// 👉 GET /customers - Get all customers
const getAllCustomers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield client_1.default.customer.findMany({
            include: {
                user: true
            }
        });
        res.status(200).json({ success: true, data: customers });
    }
    catch (error) {
        console.error('Get Customers Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch customers' });
    }
});
exports.getAllCustomers = getAllCustomers;
