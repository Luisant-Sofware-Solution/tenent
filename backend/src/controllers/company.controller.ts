import { Request, Response } from 'express';
import prisma from '../db/client';
import bcrypt from 'bcryptjs';
import { generateGlobalCompanyTenantId } from '../utils/tenant';


export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, adminEmail, adminPassword } = req.body;

    if (!name || !adminEmail || !adminPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 🧮 Fetch existing tenantIds
    const existing = await prisma.company.findMany({
      where: { tenantId: { startsWith: 'company_' } },
      select: { tenantId: true },
    });

    const existingTenantIds = existing.map(c => c.tenantId);
    const tenantId = generateGlobalCompanyTenantId(existingTenantIds);

    // 🔗 Prepare DB URL
    const baseDbUrl = process.env.DATABASE_URL?.split('?')[0];
    if (!baseDbUrl) {
      return res.status(500).json({ error: 'DATABASE_URL not configured' });
    }
    const dbUrl = `${baseDbUrl}?schema=${tenantId}`;

    // 🛠 Create schema
    await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${tenantId}";`);

    // 📋 Clone tables
    const tables = ['User', 'Category', 'Unit', 'Tax', 'Product', 'Customer', 'Sales'];
    for (const table of tables) {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "${tenantId}"."${table}" (LIKE "public"."${table}" INCLUDING ALL);
      `);
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // 🏢 Register company in public schema
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
