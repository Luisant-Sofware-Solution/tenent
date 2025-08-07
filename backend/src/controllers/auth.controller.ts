import { Request, Response } from 'express';
import prisma from '../db/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    if (!adminEmail || !adminPassword) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const company = await prisma.company.findFirst({ where: { adminEmail } });
    if (!company) return res.status(401).json({ error: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(adminPassword, company.adminPassword);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { companyId: company.id, tenantId: company.tenantId, email: company.adminEmail },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return res.json({
      message: '✅ Login successful',
      token,
      company: { id: company.id, name: company.name, tenantId: company.tenantId }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
