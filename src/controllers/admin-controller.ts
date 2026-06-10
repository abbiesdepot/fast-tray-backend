import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { adminService } from "../services/admin-service";
import { createStallSchema } from "../validations/stall-validation";

// ── Users ──────────────────────────────────────────────────────

export const listAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ data: await adminService.listAllUsers() });
});

export const warnUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }
  const updatedUser = await adminService.warnUser(userId);
  res.json({ data: updatedUser });
});

export const toggleBanUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }
  const updatedUser = await adminService.toggleBanUser(userId);
  res.json({ data: updatedUser });
});

// ── Stalls ─────────────────────────────────────────────────────

export const listAllStalls = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ data: await adminService.listAllStalls() });
});

export const registerStall = asyncHandler(async (req: Request, res: Response) => {
  const parsed = createStallSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const newStall = await adminService.registerStall(parsed.data);
  res.status(201).json({ data: newStall });
});

export const toggleStallActive = asyncHandler(async (req: Request, res: Response) => {
  const stallId = parseInt(req.params.id);
  if (isNaN(stallId)) {
    res.status(400).json({ error: "Invalid stall ID" });
    return;
  }
  const updatedStall = await adminService.toggleStallActive(stallId);
  res.json({ data: updatedStall });
});