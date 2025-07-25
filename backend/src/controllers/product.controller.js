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
exports.getAllProducts = exports.createProduct = void 0;
const client_1 = __importDefault(require("../db/client"));
// ✅ Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemCode, itemName, shortCode, printName, hsnCode, categoryId, unitId, taxId, prate, srate, mrp, userId, modifiedUserId, imageSaveInLocation, companyId, } = req.body;
        // ⚠️ Ensure foreign keys exist: User, Category, Unit, Tax, Company
        const product = yield client_1.default.product.create({
            data: {
                itemCode,
                itemName,
                shortCode,
                printName,
                hsnCode,
                prate,
                srate,
                mrp,
                isActive: true,
                createdDate: new Date(),
                modifiedDate: new Date(),
                modifiedUserId, // optional scalar
                imageSaveInLocation,
                // 🔗 Foreign key relations
                category: { connect: { id: categoryId } },
                unit: { connect: { id: unitId } },
                tax: { connect: { id: taxId } },
                user: { connect: { id: userId } },
                company: { connect: { id: companyId } },
            },
        });
        res.status(201).json({ success: true, data: product });
    }
    catch (err) {
        console.error('Create Product Error:', err);
        // Specific Prisma error handling
        if (err.code === 'P2025') {
            return res.status(400).json({
                success: false,
                message: 'Invalid foreign key references',
            });
        }
        res.status(500).json({ success: false, message: 'Failed to create product' });
    }
});
exports.createProduct = createProduct;
// ✅ Get all products
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield client_1.default.product.findMany({
            include: {
                category: true,
                unit: true,
                tax: true,
                user: true,
                company: true,
            },
        });
        res.status(200).json({ success: true, data: products });
    }
    catch (err) {
        console.error('Get Products Error:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
});
exports.getAllProducts = getAllProducts;
