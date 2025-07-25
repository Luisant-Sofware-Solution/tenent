import { Request, Response } from 'express';
import prisma from '../db/client';

export const createSale = async (req: Request, res: Response) => {
  try {
    const {
      prefix, billNo, suffix, date,
      customerId, itemId, qty, rate,
      taxPerc, taxAmount, srate, amount,
      userId, modifiedUserId, modifiedDate,
      timeOfBill, timeOfModifyBill
    } = req.body;

    const sale = await prisma.sales.create({
      data: {
        prefix,
        billNo,
        suffix,
        date: new Date(date),
        customerId,
        itemId,
        qty,
        rate,
        taxPerc,
        taxAmount,
        srate,
        amount,
        userId,
        modifiedUserId,
        modifiedDate: modifiedDate ? new Date(modifiedDate) : undefined,
        timeOfBill: timeOfBill ? new Date(timeOfBill) : undefined,
        timeOfModifyBill: timeOfModifyBill ? new Date(timeOfModifyBill) : undefined
      }
    });

    res.status(201).json(sale);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getSales = async (_req: Request, res: Response) => {
  try {
    const sales = await prisma.sales.findMany({
      include: {
        customer: true,
        product: true,
        user: true
      }
    });

    res.status(200).json(sales);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
