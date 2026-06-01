import { Prisma } from "@prisma/client";
import { prisma } from "../utils/database-util";
import { AppError } from "../utils/app-error";
import type { CreateOrderInput, UpdateOrderStatusInput } from "../validations/order-validation";

const legalTransitions: Record<string, string[]> = {
  PENDING: ["ACCEPTED", "CANCELLED", "REJECTED"],
  ACCEPTED: ["PREPARING"],
  PREPARING: ["READY"],
  READY: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
  REJECTED: [],
};

export const orderService = {
  placeOrder: async (data: CreateOrderInput) => {
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: data.items.map((item) => item.menuItemId) }, stallId: data.stallId },
    });

    if (menuItems.length !== data.items.length) {
      throw new AppError(400, "One or more menu items were not found for this stall");
    }

    const itemMap = new Map(menuItems.map((item) => [item.id, item]));
    const orderItems = data.items.map((item) => {
      const menuItem = itemMap.get(item.menuItemId);
      if (!menuItem || !menuItem.isAvailable) {
        throw new AppError(400, "One or more menu items are unavailable");
      }

      const menuItemPrice = new Prisma.Decimal(menuItem.price.toString());
      const subtotal = menuItemPrice.mul(item.quantity);

      return {
        menuItemId: menuItem.id,
        menuItemName: menuItem.name,
        menuItemPrice,
        quantity: item.quantity,
        notes: item.notes ?? "",
        subtotal,
      };
    });

    const totalPrice = orderItems.reduce((sum, item) => sum.plus(item.subtotal), new Prisma.Decimal(0));

    return prisma.$transaction(async (transaction) => {
      const order = await transaction.order.create({
        data: {
          studentId: data.studentId,
          stallId: data.stallId,
          pickupTime: data.pickupTime,
          totalPrice,
          items: {
            create: orderItems,
          },
        },
        include: { items: true },
      });

      return order;
    });
  },
  listByStudent: (studentId: number) => prisma.order.findMany({ where: { studentId }, include: { items: true }, orderBy: { createdAt: "desc" } }),
  getById: (id: number) => prisma.order.findUnique({ where: { id }, include: { items: true } }),
  queueByStall: (stallId: number) => prisma.order.findMany({
    where: { stallId, status: { in: ["PENDING", "ACCEPTED", "PREPARING", "READY"] } },
    include: { items: true, student: true },
    orderBy: { createdAt: "asc" },
  }),
  cancelOrder: async (id: number) => {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new AppError(404, "Order not found");
    if (order.status !== "PENDING") throw new AppError(400, "Only pending orders can be cancelled");
    return prisma.order.update({ where: { id }, data: { status: "CANCELLED" } });
  },
  updateStatus: async (id: number, data: UpdateOrderStatusInput) => {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new AppError(404, "Order not found");

    const allowedStatuses = legalTransitions[order.status] ?? [];
    if (!allowedStatuses.includes(data.status)) {
      throw new AppError(400, `Illegal status transition from ${order.status} to ${data.status}`);
    }

    if (data.status === "REJECTED" && !data.rejectionReason.trim()) {
      throw new AppError(400, "Rejection reason is required when rejecting an order");
    }

    return prisma.order.update({
      where: { id },
      data: {
        status: data.status,
        rejectionReason: data.status === "REJECTED" ? data.rejectionReason : "",
      },
    });
  },
};