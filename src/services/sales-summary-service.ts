import { Prisma } from "@prisma/client";
import { prisma } from "../utils/database-util";
import type { SalesSummary, TopSellingItem } from "../models";

function dayRange(date: string) {
  const start = new Date(`${date}T00:00:00.000Z`);
  const end = new Date(`${date}T23:59:59.999Z`);
  return { start, end };
}

export const salesSummaryService = {
  getDailySummary: async (stallId: number, date: string): Promise<SalesSummary> => {
    const { start, end } = dayRange(date);
    const orders = await prisma.order.findMany({
      where: {
        stallId,
        createdAt: { gte: start, lte: end },
      },
      include: { items: true },
    });

    const totalRevenue = orders
      .filter((order) => order.status === "COMPLETED")
      .reduce((sum, order) => sum.plus(order.totalPrice), new Prisma.Decimal(0));

    const itemMap = new Map<number, TopSellingItem>();

    for (const order of orders.filter((entry) => entry.status === "COMPLETED")) {
      for (const item of order.items) {
        const revenue = new Prisma.Decimal(item.menuItemPrice.toString()).mul(item.quantity);
        const existing = itemMap.get(item.menuItemId);
        if (existing) {
          existing.quantitySold += item.quantity;
          existing.revenue += Number(revenue);
        } else {
          itemMap.set(item.menuItemId, {
            menuItemId: item.menuItemId,
            menuItemName: item.menuItemName,
            quantitySold: item.quantity,
            revenue: Number(revenue),
          });
        }
      }
    }

    return {
      stallId,
      date,
      totalOrders: orders.length,
      completedOrders: orders.filter((order) => order.status === "COMPLETED").length,
      cancelledOrders: orders.filter((order) => order.status === "CANCELLED").length,
      rejectedOrders: orders.filter((order) => order.status === "REJECTED").length,
      totalRevenue: Number(totalRevenue),
      topSellingItems: Array.from(itemMap.values()).sort((left, right) => right.quantitySold - left.quantitySold),
    };
  },
};