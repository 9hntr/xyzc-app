import { siteConfig } from "@/siteConfig";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (siteConfig.env !== "production") globalForPrisma.prisma = prisma;
