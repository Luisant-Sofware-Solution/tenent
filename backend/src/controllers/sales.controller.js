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
exports.createSales = void 0;
const client_1 = __importDefault(require("../db/client"));
// controllers/sales.controller.ts
const createSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prefix, billNo, suffix, date, customerId, itemId, qty, rate, taxPerc, taxAmount, srate, amount, userId, createdDate, modifiedUserId, modifiedDate, timeOfBill, timeOfModifyBill, companyId } = req.body;
        const sales = yield client_1.default.sales.create({
            data: {
                prefix,
                billNo,
                suffix,
                date: new Date(date),
                qty,
                rate,
                taxPerc,
                taxAmount,
                srate,
                amount,
                createdDate: createdDate ? new Date(createdDate) : new Date(),
                modifiedUserId,
                modifiedDate: modifiedDate ? new Date(modifiedDate) : undefined,
                timeOfBill: timeOfBill ? new Date(timeOfBill) : undefined,
                timeOfModifyBill: timeOfModifyBill ? new Date(timeOfModifyBill) : undefined,
                company: { connect: { id: companyId } },
                customer: { connect: { id: customerId } },
                product: { connect: { id: itemId } },
                user: { connect: { id: userId } },
            }
        });
        res.status(201).json({ success: true, data: sales });
    }
    catch (error) {
        console.error('🔥 Sales Create Error:', error); // Add this line
        res.status(500).json({ success: false, message: 'Failed to create sales entry' });
    }
});
exports.createSales = createSales;
