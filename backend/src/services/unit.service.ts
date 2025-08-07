import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient();

interface CreateUnitDto {
  name: string;
  decimalNOs: number;
  companyId: number;
}

export async function createUnitForCompany(dto: CreateUnitDto) {
  const { name, decimalNOs, companyId } = dto;

  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company?.tenantId) throw new Error(`Company ID ${companyId} not found`);

  const tenantSchema = company.tenantId;

  const schemaExists: { schema_name: string }[] = await prisma.$queryRawUnsafe(
    `SELECT schema_name FROM information_schema.schemata WHERE schema_name = $1`,
    tenantSchema
  );
  if (!schemaExists.length) throw new Error(`Schema "${tenantSchema}" does not exist`);

  const result: { id: number }[] = await prisma.$queryRawUnsafe(
    `
    INSERT INTO "${tenantSchema}"."Unit" ("name", "decimalNOs", "companyId")
    VALUES ($1, $2, $3)
    RETURNING id
    `,
    name,
    decimalNOs,
    companyId
  );

  return {
    success: true,
    unitId: result[0]?.id,
    message: `Unit created in schema "${tenantSchema}"`,
  };
}

export async function getUnitsByCompanyId(companyId: number) {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company?.tenantId) throw new Error(`Company ID ${companyId} not found`);

  const tenantSchema = company.tenantId;

  const schemaExists: { schema_name: string }[] = await prisma.$queryRawUnsafe(
    `SELECT schema_name FROM information_schema.schemata WHERE schema_name = $1`,
    tenantSchema
  );
  if (!schemaExists.length) throw new Error(`Schema "${tenantSchema}" does not exist`);

  const units = await prisma.$queryRawUnsafe(
    `SELECT * FROM "${tenantSchema}"."Unit" WHERE "companyId" = $1`,
    companyId
  );

  return units;
}
