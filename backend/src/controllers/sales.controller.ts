import { Request, Response } from 'express'
import prisma from '../db/client'

// controllers/sales.controller.ts
export const createSales = async (req: Request, res: Response) => {
  try {
    const {
      prefix,
      billNo,
      suffix,
      date,
      customerId,
      itemId,
      qty,
      rate,
      taxPerc,
      taxAmount,
      srate,
      amount,
      userId,
      createdDate,
      modifiedUserId,
      modifiedDate,
      timeOfBill,
      timeOfModifyBill,
      companyId
    } = req.body;

    const sales = await prisma.sales.create({
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
  } catch (error) {
    console.error('🔥 Sales Create Error:', error); // Add this line
    res.status(500).json({ success: false, message: 'Failed to create sales entry' });
  }
};
