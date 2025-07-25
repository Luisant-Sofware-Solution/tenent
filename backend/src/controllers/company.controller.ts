import { Request, Response } from 'express';
import prisma from '../db/client';

// 📌 Create a new Company
export const createCompany = async (req: Request, res: Response) => {
  const { tenantId, name, adminEmail, adminPassword, dbUrl } = req.body;

  try {
    // Validation
    if (!tenantId || !name || !adminEmail || !adminPassword || !dbUrl) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check for existing tenantId or email
    const existing = await prisma.company.findFirst({
      where: {
        OR: [{ tenantId }, { adminEmail }],
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Company with tenantId or email already exists.' });
    }

    // Create the company
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
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get all Companies
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

// 📌 Get a single company by tenantId
export const getCompanyByTenantId = async (req: Request, res: Response) => {
  const { tenantId } = req.params;

  try {
    const company = await prisma.company.findUnique({
      where: { tenantId },
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

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};