import { z } from "zod";

export const orderItemSchema = z.object({
  menuItemId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  notes: z.string().optional().default(""),
});

export const createOrderSchema = z.object({
  studentId: z.coerce.number().int().positive(),
  stallId: z.coerce.number().int().positive(),
  pickupTime: z.string().min(1).max(20),
  items: z.array(orderItemSchema).min(1),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "ACCEPTED", "PREPARING", "READY", "COMPLETED", "CANCELLED", "REJECTED"]),
  rejectionReason: z.string().optional().default(""),
});

export const orderIdParamsSchema = z.object({
  orderId: z.coerce.number().int().positive(),
});

export const studentIdParamsSchema = z.object({
  studentId: z.coerce.number().int().positive(),
});

export const stallIdParamsSchema = z.object({
  stallId: z.coerce.number().int().positive(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;