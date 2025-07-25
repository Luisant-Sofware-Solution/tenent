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
exports.createUnit = void 0;
const client_1 = __importDefault(require("../db/client"));
const createUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, decimalNOs, companyId } = req.body;
        if (!name || decimalNOs === undefined || !companyId) {
            return res.status(400).json({ error: 'name, decimalNOs, and companyId are required' });
        }
        const company = yield client_1.default.company.findUnique({
            where: { id: Number(companyId) },
        });
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        const unit = yield client_1.default.unit.create({
            data: {
                name,
                decimalNOs: Number(decimalNOs),
                company: {
                    connect: { id: Number(companyId) },
                },
            },
        });
        return res.status(201).json(unit);
    }
    catch (error) {
        console.error('Error creating unit:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createUnit = createUnit;
