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
exports.createCategory = void 0;
const client_1 = __importDefault(require("../db/client")); // Adjust this import to your Prisma client
// POST /categories
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, companyId } = req.body;
        // Basic validation
        if (!category || !companyId) {
            return res.status(400).json({ error: 'Category and companyId are required.' });
        }
        // Optional: Check if company exists
        const company = yield client_1.default.company.findUnique({
            where: { id: Number(companyId) },
        });
        if (!company) {
            return res.status(404).json({ error: 'Company not found.' });
        }
        const newCategory = yield client_1.default.category.create({
            data: {
                category,
                company: {
                    connect: { id: Number(companyId) },
                },
            },
        });
        return res.status(201).json(newCategory);
    }
    catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createCategory = createCategory;
