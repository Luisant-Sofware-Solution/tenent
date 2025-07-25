import { Request, Response } from 'express';
import prisma from '../db/client';

export const createTax = async (req: Request, res: Response) => {
  const { taxName, percentage } = req.body;
  try {
    const tax = await prisma.tax.create({
      data: { taxName, percentage },
    });
    res.status(201).json(tax);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaxes = async (_req: Request, res: Response) => {
  try {
    const taxes = await prisma.tax.findMany();
    res.json(taxes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
