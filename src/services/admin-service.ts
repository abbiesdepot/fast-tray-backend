import { prisma } from "../utils/database-util";
import type { CreateStallInput } from "../validations/stall-validation";

export const adminService = {
  // ── User queries ──────────────────────────────────────────────
  listAllUsers: () =>
    prisma.user.findMany({ orderBy: { id: "asc" } }),

  warnUser: async (userId: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const newWarningCount = user.warningCount + 1;
    const shouldBan = newWarningCount >= 3;

    return prisma.user.update({
      where: { id: userId },
      data: {
        warningCount: newWarningCount,
        isBanned: shouldBan ? true : user.isBanned,
      },
    });
  },

  toggleBanUser: async (userId: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    return prisma.user.update({
      where: { id: userId },
      data: { isBanned: !user.isBanned },
    });
  },

  // ── Stall queries ─────────────────────────────────────────────
  listAllStalls: () =>
    prisma.stall.findMany({
      orderBy: { id: "asc" },
      include: { menuItems: true },
    }),

  registerStall: (data: CreateStallInput) =>
    prisma.stall.create({ data: data as any }),

  toggleStallActive: async (stallId: number) => {
    const stall = await prisma.stall.findUnique({ where: { id: stallId } });
    if (!stall) throw new Error("Stall not found");

    return prisma.stall.update({
      where: { id: stallId },
      data: { isActive: !stall.isActive },
    });
  },
};