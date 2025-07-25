"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/prisma/client.ts or prisma/client.ts
// import { PrismaClient } from '../../generated/prisma/client'; // adjust path if needed
const client_1 = require("../../prisma/generated/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
