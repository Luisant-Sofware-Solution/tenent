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
exports.getCompanyByTenantId = exports.getCompanies = exports.createCompany = void 0;
const client_1 = __importDefault(require("../db/client"));
// 📌 Create a new Company
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId, name, adminEmail, adminPassword, dbUrl } = req.body;
    try {
        // Validation
        if (!tenantId || !name || !adminEmail || !adminPassword || !dbUrl) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        // Check for existing tenantId or email
        const existing = yield client_1.default.company.findFirst({
            where: {
                OR: [{ tenantId }, { adminEmail }],
            },
        });
        if (existing) {
            return res.status(400).json({ error: 'Company with tenantId or email already exists.' });
        }
        // Create the company
        const company = yield client_1.default.company.create({
            data: {
                tenantId,
                name,
                adminEmail,
                adminPassword,
                dbUrl,
            },
            select: {
                id: true,
                tenantId: true,
                name: true,
                adminEmail: true,
                dbUrl: true,
                status: true,
                createdAt: true,
            },
        });
        res.status(201).json(company);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createCompany = createCompany;
// 📌 Get all Companies
const getCompanies = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield client_1.default.company.findMany({
            select: {
                id: true,
                tenantId: true,
                name: true,
                adminEmail: true,
                dbUrl: true,
                status: true,
                createdAt: true,
            },
        });
        res.json(companies);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getCompanies = getCompanies;
// 📌 Get a single company by tenantId
const getCompanyByTenantId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.params;
    try {
        const company = yield client_1.default.company.findUnique({
            where: { tenantId },
            select: {
                id: true,
                tenantId: true,
                name: true,
                adminEmail: true,
                dbUrl: true,
                status: true,
                createdAt: true,
            },
        });
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.json(company);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getCompanyByTenantId = getCompanyByTenantId;
