import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  companyId: number;
}

export async function createUserForCompany(dto: CreateUserDto) {
  const { name, email, password, role, companyId } = dto;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  if (!company?.tenantId) {
    throw new Error(`Company ID ${companyId} not found`);
  }

  const tenantSchema = company.tenantId;

  const schemaExists: { schema_name: string }[] = await prisma.$queryRawUnsafe(
    `SELECT schema_name FROM information_schema.schemata WHERE schema_name = $1`,
    tenantSchema
  );

  if (!schemaExists.length) {
    throw new Error(`Schema "${tenantSchema}" does not exist`);
  }

  const result: { id: number }[] = await prisma.$queryRawUnsafe(
    `
    INSERT INTO "${tenantSchema}"."User"
      ("name", "email", "password", "role", "companyId")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `,
    name,
    email,
    password,
    role,
    companyId
  );

  return {
    success: true,
    userId: result[0]?.id,
    message: `User created in schema "${tenantSchema}"`,
  };
}
