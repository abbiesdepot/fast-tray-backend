import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { adminService } from "../services/admin-service";

export const listAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ data: await adminService.listAllUsers() });
});

export const listAllStalls = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ data: await adminService.listAllStalls() });
});
