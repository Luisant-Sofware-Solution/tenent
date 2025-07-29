// src/controllers/company.controller.ts
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../db/client';

// ✅ Create a new company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, adminEmail, adminPassword, dbUrl } = req.body;

    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!adminEmail) missingFields.push('adminEmail');
    if (!adminPassword) missingFields.push('adminPassword');
    if (!dbUrl) missingFields.push('dbUrl');

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing field(s): ${missingFields.join(', ')}` });
    }

    const tenantId = `tenant_${uuidv4()}`;

    const existing = await prisma.company.findFirst({
      where: {
        OR: [{ tenantId }, { adminEmail }],
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Company already exists.' });
    }

    const company = await prisma.company.create({
      data: {
        tenantId,
        name,
        adminEmail,
        adminPassword,
        dbUrl,
      },
      select: {
        id: true,
        tenantId: true,
        name: true,
        adminEmail: true,
        dbUrl: true,
        status: true,
        createdAt: true,
      },
    });

    res.status(201).json(company);
  } catch (err: any) {
    console.error('❌ Error creating company:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all companies
export const getCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        tenantId: true,
        name: true,
        adminEmail: true,
        dbUrl: true,
        status: true,
        createdAt: true,
      },
    });

    res.json(companies);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
