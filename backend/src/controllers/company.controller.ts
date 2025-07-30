import { Request, Response } from 'express';
import prisma from '../db/client';
import bcrypt from 'bcryptjs';

/**
 * Generates the next tenantId like "company_0001", "company_0002"
 * based on existing tenantIds starting with "company_"
 */
function generateGlobalCompanyTenantId(existingTenantIds: string[]): string {
  const suffixes = existingTenantIds
    .filter(id => id.startsWith('company_'))
    .map(id => {
      const num = parseInt(id.split('_')[1]);
      return isNaN(num) ? 0 : num;
    });

  const next = Math.max(...suffixes, 0) + 1;
  const padded = String(next).padStart(4, '0');

  return `company_${padded}`;
}

// ✅ Create Company: globally incremented tenantId and dynamic schema
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, adminEmail, adminPassword } = req.body;
    if (!name || !adminEmail || !adminPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 📦 Fetch all existing tenantIds with prefix "company_"
    const existing = await prisma.company.findMany({
      where: { tenantId: { startsWith: 'company_' } },
      select: { tenantId: true },
    });

    const existingTenantIds = existing.map(c => c.tenantId);
    const tenantId = generateGlobalCompanyTenantId(existingTenantIds);

    const baseDbUrl = process.env.DATABASE_URL?.split('?')[0];
    if (!baseDbUrl) {
      return res.status(500).json({ error: 'DATABASE_URL not configured' });
    }

    const dbUrl = `${baseDbUrl}?schema=${tenantId}`;
    await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${tenantId}";`);
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newCompany = await prisma.company.create({
      data: {
        tenantId,
        name,
        adminEmail,
        adminPassword: hashedPassword,
        dbUrl,
        status: true,
      },
    });

    res.status(201).json({ message: 'Company created', company: newCompany });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
/**
 * Retrieves a company by tenantId
 */
export const getCompany = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.params;

    if (!tenantId) {
      return res.status(400).json({ error: 'tenantId is required' });
    }

    const company = await prisma.company.findUnique({
      where: { tenantId },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};