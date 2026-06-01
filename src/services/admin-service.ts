import { prisma } from "../utils/database-util";

export const adminService = {
  listAllUsers: () => prisma.user.findMany({ orderBy: { id: "asc" } }),
  listAllStalls: () => prisma.stall.findMany({ orderBy: { id: "asc" }, include: { menuItems: true } }),
};