import { Request, Response } from 'express';
import prisma from '../db/client';
import bcrypt from 'bcryptjs';
import { generateGlobalCompanyTenantId } from '../utils/tenant';
import {
  getAllCompanies,
  getCompanyById as getCompanyByIdService,
  patchCompanyById as updateCompanyInService,
  deleteCompanyById as deleteCompanyInService,
} from '../services/company.service';

// ✅ Create Company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, adminEmail, adminPassword } = req.body;

    if (!name || !adminEmail || !adminPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Step 1: Get existing tenant IDs
    const existing = await prisma.company.findMany({
      where: { tenantId: { startsWith: 'company_' } },
      select: { tenantId: true },
    });
    const existingTenantIds = existing.map((c: { tenantId: string }) => c.tenantId);

    // Step 2: Generate new tenantId
    const tenantId = generateGlobalCompanyTenantId(existingTenantIds);

    // Step 3: Construct schema-specific DB URL
    const baseDbUrl = process.env.DATABASE_URL?.split('?')[0];
    if (!baseDbUrl) {
      return res.status(500).json({ error: 'DATABASE_URL not configured properly' });
    }

    const dbUrl = `${baseDbUrl}?schema=${tenantId}`;

    // Step 4: Create new schema
    await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${tenantId}"`);

    // Step 5: Clone tables into new schema
    const tables = ['User', 'Category', 'Unit', 'Tax', 'Product', 'Customer', 'Sales'];
    for (const table of tables) {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "${tenantId}"."${table}" 
        (LIKE "public"."${table}" INCLUDING ALL);
      `);
    }

    // Step 6: Create company entry in `public.Company`
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newCompany = await prisma.company.create({
      data: {
        name,
        adminEmail,
        adminPassword: hashedPassword,
        tenantId,
        dbUrl,
        status: true,
      },
    });

    res.status(201).json({ message: '✅ Company created successfully', company: newCompany });
  } catch (error) {
    console.error('❌ Error creating company:', error);
    res.status(500).json({ error: 'Internal server error while creating company' });
  }
};

// ✅ Get all companies
export const getCompanies = async (_: Request, res: Response) => {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error('❌ Error getting companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

// ✅ Get company by ID
export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const company = await getCompanyByIdService(id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('❌ Error fetching company by ID:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
};

// ✅ Update company by ID
export const patchCompanyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await updateCompanyInService(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: '✅ Company updated', company: updated });
  } catch (error) {
    console.error('❌ Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
};

// ✅ Delete company by ID
export const deleteCompanyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteCompanyInService(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: '🗑️ Company deleted', company: deleted });
  } catch (error) {
    console.error('❌ Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
};
