import { getTenantPrisma } from "../db/dynamicClient";

const ensureCategoryTable = async (tenantId: string) => {
  const prisma = getTenantPrisma(tenantId);
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "${tenantId}"."Category" (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL,
      "companyId" INTEGER NOT NULL
    );
  `);
};

export const createCategoryService = async (tenantId: string, data: any) => {
  await ensureCategoryTable(tenantId);
  const prisma = getTenantPrisma(tenantId);
  return prisma.category.create({ data });
};

export const getAllCategoriesService = async (tenantId: string) => {
  const prisma = getTenantPrisma(tenantId);
  return prisma.category.findMany();
};

export const updateCategoryService = async (tenantId: string, id: number, data: any) => {
  const prisma = getTenantPrisma(tenantId);
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategoryService = async (tenantId: string, id: number) => {
  const prisma = getTenantPrisma(tenantId);
  return prisma.category.delete({
    where: { id },
  });
};
