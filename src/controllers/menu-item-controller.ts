import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import { menuItemService } from "../services/menu-item-service";

export const listMenuItems = asyncHandler(async (req: Request, res: Response) => {
  res.json({ data: await menuItemService.listByStall(Number(req.params.stallId)) });
});

export const createMenuItem = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ data: await menuItemService.create({ ...req.body, stallId: Number(req.params.stallId) }) });
});

export const updateMenuItem = asyncHandler(async (req: Request, res: Response) => {
  const menuItem = await menuItemService.getById(Number(req.params.menuItemId));
  if (!menuItem) throw new AppError(404, "Menu item not found");
  res.json({ data: await menuItemService.update(menuItem.id, req.body) });
});

export const toggleMenuItemAvailability = asyncHandler(async (req: Request, res: Response) => {
  const menuItem = await menuItemService.toggleAvailability(Number(req.params.menuItemId), Boolean(req.body?.isAvailable));
  res.json({ data: menuItem });
});

export const softDeleteMenuItem = asyncHandler(async (req: Request, res: Response) => {
  const menuItem = await menuItemService.softDelete(Number(req.params.menuItemId));
  res.json({ data: menuItem });
});
