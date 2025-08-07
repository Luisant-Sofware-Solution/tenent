// src/services/user.service.ts
import { PrismaClient } from '../../prisma/generated/client';
import bcrypt from 'bcryptjs';

// Helper to get tenant-specific Prisma client
function getTenantPrisma(tenantId: string) {
  const url = `${process.env.DATABASE_URL?.split('?')[0]}?schema=${tenantId}`;
  return new PrismaClient({ datasources: { db: { url } } });
}

// Create User
export const createUser = async ({
  tenantId,
  name, 
  email,
  password,
  role,
  companyId,
}: {
  tenantId: string;
  name: string;
  email: string;
  password: string;
  role: string;
  companyId: number;
}) => {
  const prisma = getTenantPrisma(tenantId);
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role,
      companyId,
    },
  });
};

// Get All Users
export const getUsers = async (tenantId: string) => {
  const prisma = getTenantPrisma(tenantId);
  return prisma.user.findMany({
    orderBy: { id: 'asc' },
  });
};

// Update User
export const updateUserById = async (
  tenantId: string,
  userId: number,
  data: { name?: string; email?: string; password?: string; role?: string }
) => {
  const prisma = getTenantPrisma(tenantId);
  const updateData: any = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

// Delete User
export const deleteUserById = async (tenantId: string, userId: number) => {
  const prisma = getTenantPrisma(tenantId);
  return prisma.user.delete({ where: { id: userId } });
};
