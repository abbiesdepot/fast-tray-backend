import { prisma } from "../utils/database-util";
import type { CreateStallInput, UpdateStallInput } from "../validations/stall-validation";

export const stallService = {
  listActive: () => prisma.stall.findMany({ where: { isActive: true }, orderBy: { id: "asc" } }),
  listAll: () => prisma.stall.findMany({ orderBy: { id: "asc" } }),
  getByIdWithMenu: (id: number) => prisma.stall.findUnique({ where: { id }, include: { menuItems: { orderBy: { id: "asc" } } } }),
  create: (data: CreateStallInput) => prisma.stall.create({ data: data as any }),
  update: (id: number, data: UpdateStallInput) => prisma.stall.update({ where: { id }, data: data as any }),
  toggleActive: (id: number, isActive: boolean) => prisma.stall.update({ where: { id }, data: { isActive } }),
};