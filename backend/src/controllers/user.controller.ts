import { Request, Response } from 'express';
import prisma from '../db/client';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role, companyId } = req.body;

  if (!name || !email || !password || !role || !companyId) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return res.status(400).json({ error: 'Company not found with given companyId' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        companyId, // ✅ THIS is correct now
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
      },
    });

    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
