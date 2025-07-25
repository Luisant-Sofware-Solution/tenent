import { Request, Response } from 'express';
import prisma from '../db/client';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      itemCode, itemName, shortCode, printName, hsnCode,
      categoryId, unitId, taxId,
      prate, srate, mrp,
      userId, modifiedUserId, imageSaveInLocation
    } = req.body;

    const product = await prisma.product.create({
      data: {
        itemCode,
        itemName,
        shortCode,
        printName,
        hsnCode,
        categoryId,
        unitId,
        taxId,
        prate,
        srate,
        mrp,
        userId,
        modifiedUserId,
        imageSaveInLocation,
      },
    });

    res.status(201).json(product);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        unit: true,
        tax: true,
        user: true,
      },
    });

    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
