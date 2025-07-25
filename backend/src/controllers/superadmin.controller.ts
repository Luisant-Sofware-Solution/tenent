import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient();

export const createSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role = 'superadmin' } = req.body;

    const existing = await prisma.superAdmin.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'SuperAdmin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const superadmin = await prisma.superAdmin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    res.status(201).json({ message: '✅ SuperAdmin created', superadmin });
  } catch (error) {
    console.error('❌ Error creating SuperAdmin:', error);
    res.status(500).json({ error: 'Failed to create SuperAdmin' });
  }
};

export const loginSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.superAdmin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: '✅ Login successful', superadmin: admin });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};
