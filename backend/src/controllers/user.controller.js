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
exports.createUser = void 0;
const client_1 = __importDefault(require("../db/client"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, companyId } = req.body;
    if (!name || !email || !password || !role || !companyId) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const company = yield client_1.default.company.findUnique({
            where: { id: companyId },
        });
        if (!company) {
            return res.status(400).json({ error: 'Company not found with given companyId' });
        }
        const user = yield client_1.default.user.create({
            data: {
                name,
                email,
                password,
                role,
                companyId, // ✅ THIS is correct now
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                companyId: true,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
});
exports.createUser = createUser;
