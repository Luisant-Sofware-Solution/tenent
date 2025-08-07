// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../../prisma/generated/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

function getTenantPrisma(tenantId: string) {
  const url = `${process.env.DATABASE_URL?.split('?')[0]}?schema=${tenantId}`;
  return new PrismaClient({ datasources: { db: { url } } });
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { tenantId, email, password } = req.body;

    console.log('Login request body:', { tenantId, email, password }); // Debugging

    if (!tenantId || !email || !password) {
      return res.status(400).json({ error: 'Email, password, and tenantId are required' });
    }

    const prisma = getTenantPrisma(tenantId);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role, tenantId }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
  });
};
