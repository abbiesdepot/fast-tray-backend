import { prisma } from "../utils/database-util";
import type { CreateMenuItemInput, UpdateMenuItemInput } from "../validations/menu-item-validation";

export const menuItemService = {
  listByStall: (stallId: number) => prisma.menuItem.findMany({ where: { stallId }, orderBy: { id: "asc" } }),
  getById: (id: number) => prisma.menuItem.findUnique({ where: { id } }),
  create: (data: CreateMenuItemInput) => prisma.menuItem.create({ data: data as any }),
  update: (id: number, data: UpdateMenuItemInput) => prisma.menuItem.update({ where: { id }, data: data as any }),
  toggleAvailability: (id: number, isAvailable: boolean) => prisma.menuItem.update({ where: { id }, data: { isAvailable } }),
  softDelete: (id: number) => prisma.menuItem.update({ where: { id }, data: { isAvailable: false } }),
};