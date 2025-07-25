import { Request, Response } from 'express';
import prisma from '../db/client';
import bcrypt from 'bcrypt';

export const createSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existing = await prisma.superAdmin.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'SuperAdmin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const superAdmin = await prisma.superAdmin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({
      id: superAdmin.id,
      email: superAdmin.email,
      name: superAdmin.name,
      role: superAdmin.role,
      createdAt: superAdmin.createdAt,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSuperAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await prisma.superAdmin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(200).json(admins);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
