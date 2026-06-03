// // import "dotenv/config";
// import { PrismaClient } from "@prisma/client";
//
// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }
//
// export const prisma = global.prisma ?? new PrismaClient();
//
// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }

// src/utils/database-util.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// 1. Ambil URL dari environment OS (yang ter-load otomatis lewat flag --env-file)
const connectionString = process.env.DATABASE_URL;

// 2. Inisialisasi adapter PostgreSQL
const adapter = new PrismaPg({ connectionString });

// 3. Masukkan adapter ke dalam constructor PrismaClient
export const prisma = global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}