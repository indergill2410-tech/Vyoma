import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const hasDatabase = Boolean(process.env.DATABASE_URL);
export const prisma = hasDatabase ? globalForPrisma.prisma ?? new PrismaClient() : null;

if (hasDatabase && process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
