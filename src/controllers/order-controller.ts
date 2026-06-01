import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import { orderService } from "../services/order-service";

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ data: await orderService.placeOrder(req.body) });
});

export const listStudentOrders = asyncHandler(async (req: Request, res: Response) => {
  res.json({ data: await orderService.listByStudent(Number(req.params.studentId)) });
});

export const listStallQueue = asyncHandler(async (req: Request, res: Response) => {
  res.json({ data: await orderService.queueByStall(Number(req.params.stallId)) });
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.getById(Number(req.params.orderId));
  if (!order) throw new AppError(404, "Order not found");
  res.json({ data: order });
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  res.json({ data: await orderService.updateStatus(Number(req.params.orderId), req.body) });
});

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  res.json({ data: await orderService.cancelOrder(Number(req.params.orderId)) });
});
