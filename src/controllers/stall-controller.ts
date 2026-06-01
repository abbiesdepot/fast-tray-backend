import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import { stallService } from "../services/stall-service";
import { salesSummaryService } from "../services/sales-summary-service";
import { toPublicUser } from "../models/user-model";

export const listActiveStalls = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ data: await stallService.listActive() });
});

export const getStall = asyncHandler(async (req: Request, res: Response) => {
  const stall = await stallService.getByIdWithMenu(Number(req.params.stallId));
  if (!stall) throw new AppError(404, "Stall not found");
  res.json({ data: stall });
});

export const createStall = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ data: await stallService.create(req.body) });
});

export const updateStall = asyncHandler(async (req: Request, res: Response) => {
  res.json({ data: await stallService.update(Number(req.params.stallId), req.body) });
});

export const toggleStallActive = asyncHandler(async (req: Request, res: Response) => {
  const stall = await stallService.toggleActive(Number(req.params.stallId), Boolean(req.body?.isActive));
  res.json({ data: stall });
});

export const getDailySalesSummary = asyncHandler(async (req: Request, res: Response) => {
  const date = typeof req.query.date === "string" && req.query.date ? req.query.date : new Date().toISOString().slice(0, 10);
  const summary = await salesSummaryService.getDailySummary(Number(req.params.stallId), date);
  res.json({ data: summary });
});

export const listStallsForAdmin = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ data: await stallService.listAll() });
});
