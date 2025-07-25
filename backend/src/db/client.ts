// src/prisma/client.ts or prisma/client.ts
// import { PrismaClient } from '../../generated/prisma/client'; // adjust path if needed
import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient();

export default prisma;
