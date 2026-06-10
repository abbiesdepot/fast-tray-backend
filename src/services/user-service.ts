import { prisma } from "../utils/database-util";
import type { CreateUserInput, LoginUserInput, UpdateUserInput, RegisterUserInput } from "../validations/user-validation";
import bcrypt from "bcrypt";
import { AppError } from "../utils/app-error";

export const userService = {
  list: () => prisma.user.findMany({ orderBy: { id: "asc" } }),
  listAll: () => prisma.user.findMany({ orderBy: { id: "asc" } }),
  getById: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (data: CreateUserInput) => prisma.user.create({ data: data as any }),
  update: (id: number, data: UpdateUserInput) => prisma.user.update({ where: { id }, data: data as any }),
  remove: (id: number) => prisma.user.delete({ where: { id } }),
  
  register: async (data: RegisterUserInput) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new AppError(400, "Email already in use");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      } as any,
    });
  },

  login: async ({ email, password }: LoginUserInput) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, "Invalid email or password");
    }
    return user;
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