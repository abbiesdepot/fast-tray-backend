import { prisma } from "../utils/database-util";
import type { CreateUserInput, LoginUserInput, UpdateUserInput } from "../validations/user-validation";

export const userService = {
  list: () => prisma.user.findMany({ orderBy: { id: "asc" } }),
  listAll: () => prisma.user.findMany({ orderBy: { id: "asc" } }),
  getById: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (data: CreateUserInput) => prisma.user.create({ data: data as any }),
  update: (id: number, data: UpdateUserInput) => prisma.user.update({ where: { id }, data: data as any }),
  remove: (id: number) => prisma.user.delete({ where: { id } }),
  loginOrCreate: async ({ email, role }: LoginUserInput) => {
    const matchingUser = await prisma.user.findFirst({ where: { email, role } });

    if (matchingUser) {
      return matchingUser;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return prisma.user.update({
        where: { email },
        data: { role },
      });
    }

    const name = email.split("@")[0] || "user";

    return prisma.user.create({
      data: {
        name,
        email,
        role,
      } as any,
    });
  },
  ban: (id: number, isBanned: boolean) => prisma.user.update({ where: { id }, data: { isBanned } }),
  warn: async (id: number) => {
    const warnedUser = await prisma.user.update({
      where: { id },
      data: { warningCount: { increment: 1 } },
    });

    if (warnedUser.warningCount >= 3 && !warnedUser.isBanned) {
      return prisma.user.update({
        where: { id },
        data: { isBanned: true },
      });
    }

    return warnedUser;
  },
};