import { PrismaClient } from "../../prisma/generated/client";

const clientMap = new Map<string, PrismaClient>();

export const getTenantPrisma = (tenantId: string): PrismaClient => {
  if (!clientMap.has(tenantId)) {
    const newClient = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.DATABASE_URL}?schema=${tenantId}`,
        },
      },
    });
    clientMap.set(tenantId, newClient);
  }

  return clientMap.get(tenantId)!;
};
