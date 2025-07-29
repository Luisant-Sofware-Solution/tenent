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
exports.createCompany = void 0;
const uuid_1 = require("uuid");
const client_1 = __importDefault(require("../db/client")); // Your superadmin Prisma client
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, adminEmail, adminPassword, dbUrl } = req.body;
        // ✅ Validate required fields and report missing ones
        const missingFields = [];
        if (!name)
            missingFields.push('name');
        if (!adminEmail)
            missingFields.push('adminEmail');
        if (!adminPassword)
            missingFields.push('adminPassword');
        if (!dbUrl)
            missingFields.push('dbUrl');
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing field(s): ${missingFields.join(', ')}` });
        }
        const tenantId = `tenant_${(0, uuid_1.v4)()}`;
        const existing = yield client_1.default.company.findFirst({
            where: {
                OR: [{ tenantId }, { adminEmail }],
            },
        });
        if (existing) {
            return res.status(400).json({ error: 'Company already exists.' });
        }
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
        console.error('❌ Error creating company:', err);
        res.status(500).json({ error: err.message });
    }
});
exports.createCompany = createCompany;
