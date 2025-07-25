import { Request, Response } from 'express';
import prisma from '../db/client';

export const createUnit = async (req: Request, res: Response) => {
  const { name, decimalNOs } = req.body;
  try {
    const unit = await prisma.unit.create({
      data: { name, decimalNOs },
    });
    res.status(201).json(unit);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUnits = async (_req: Request, res: Response) => {
  try {
    const units = await prisma.unit.findMany();
    res.json(units);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
