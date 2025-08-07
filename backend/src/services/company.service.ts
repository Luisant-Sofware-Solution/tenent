import prisma from '../db/client';
import bcrypt from 'bcryptjs';

export async function getAllCompanies() {
  return await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      tenantId: true,
      adminEmail: true,
      dbUrl: true,
      status: true,
    },
  });
}

export async function getCompanyById(id: number) {
  return await prisma.company.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      tenantId: true,
      adminEmail: true,
      dbUrl: true,
      status: true,
    },
  });
}

export async function patchCompanyById(
  id: number,
  data: { name?: string; adminEmail?: string; adminPassword?: string; status?: boolean }
) {
  const existing = await prisma.company.findUnique({ where: { id } });
  if (!existing) return null;

  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.adminEmail) updateData.adminEmail = data.adminEmail;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.adminPassword) {
    updateData.adminPassword = await bcrypt.hash(data.adminPassword, 10);
  }

  return await prisma.company.update({ where: { id }, data: updateData });
}

export async function deleteCompanyById(id: number) {
  const company = await prisma.company.findUnique({ where: { id } });
  if (!company) return null;

  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${company.tenantId}" CASCADE`);
  return await prisma.company.delete({ where: { id } });
}
