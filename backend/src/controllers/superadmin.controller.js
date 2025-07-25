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
exports.loginSuperAdmin = exports.createSuperAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("../../prisma/generated/client");
const prisma = new client_1.PrismaClient();
const createSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, role = 'superadmin' } = req.body;
        const existing = yield prisma.superAdmin.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: 'SuperAdmin already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const superadmin = yield prisma.superAdmin.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
            },
        });
        res.status(201).json({ message: '✅ SuperAdmin created', superadmin });
    }
    catch (error) {
        console.error('❌ Error creating SuperAdmin:', error);
        res.status(500).json({ error: 'Failed to create SuperAdmin' });
    }
});
exports.createSuperAdmin = createSuperAdmin;
const loginSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield prisma.superAdmin.findUnique({ where: { email } });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: '✅ Login successful', superadmin: admin });
    }
    catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});
exports.loginSuperAdmin = loginSuperAdmin;
