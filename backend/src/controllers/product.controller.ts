// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import prisma from '../db/client';
import { insertProductIntoTenant } from '../services/product.service';

// Create product and insert into tenant schema
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.body;

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { tenantId: true },
    });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    const tenantId = company.tenantId;
    const product = await insertProductIntoTenant(tenantId, req.body);

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

// Placeholder to get all products (adjust for tenant DB if needed)
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({ success: false, message: 'companyId is required' });
    }

    const company = await prisma.company.findUnique({
      where: { id: Number(companyId) },
      select: { tenantId: true },
    });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    const tenantId = company.tenantId;

    const products = await prisma.$queryRawUnsafe(
      `SELECT * FROM "${tenantId}"."Product"`
    );

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error('Get Products Error:', err);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};
