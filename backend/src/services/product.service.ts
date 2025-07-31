// src/services/product.service.ts
import prisma from '../db/client';

export async function insertProductIntoTenant(tenantId: string, productData: any) {
  const {
    itemCode, itemName, shortCode, printName, hsnCode,
    categoryId, unitId, taxId, prate, srate, mrp,
    userId, modifiedUserId, imageSaveInLocation, companyId,
  } = productData;

  const result = await prisma.$executeRawUnsafe(
    `
    INSERT INTO "${tenantId}"."Product"
      ("itemCode", "itemName", "shortCode", "printName", "hsnCode", "categoryId", "unitId", "taxId",
       "prate", "srate", "mrp", "isActive", "createdDate", "modifiedDate", "modifiedUserId",
       "imageSaveInLocation", "userId", "companyId")
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, true, $12, $13, $14,
      $15, $16, $17
    )
    RETURNING *
    `,
    itemCode, itemName, shortCode, printName, hsnCode,
    categoryId, unitId, taxId, prate, srate, mrp,
    new Date(), new Date(), modifiedUserId ?? null,
    imageSaveInLocation ?? null, userId, companyId
  );

  return result;
}