// src/controllers/superadmin.controller.ts
import { Request, Response } from 'express';
import prisma from '../db/client'; // Adjust if your client is elsewhere
import bcrypt from 'bcryptjs';

export const createSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existing = await prisma.superAdmin.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ success: false, message: 'SuperAdmin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.superAdmin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({ success: true, data: newAdmin });
  } catch (error) {
    console.error('Error creating superadmin:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const loginSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.superAdmin.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    res.status(200).json({ success: true, message: 'Login successful', data: admin });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllSuperAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await prisma.superAdmin.findMany();
    res.json({ success: true, data: admins });
  } catch (error) {
    console.error('Get all superadmins error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch superadmins' });
  }
};
