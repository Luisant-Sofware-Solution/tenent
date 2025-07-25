"use strict";
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
exports.createTax = void 0;
const client_1 = __importDefault(require("../db/client"));
const createTax = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxName, percentage, companyId } = req.body;
        if (!taxName || !percentage || !companyId) {
            return res.status(400).json({ error: 'taxName, percentage, and companyId are required' });
        }
        const company = yield client_1.default.company.findUnique({
            where: { id: Number(companyId) },
        });
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        const tax = yield client_1.default.tax.create({
            data: {
                taxName,
                percentage,
                company: {
                    connect: { id: Number(companyId) },
                },
            },
        });
        res.status(201).json(tax);
    }
    catch (error) {
        console.error('Error creating tax:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createTax = createTax;
