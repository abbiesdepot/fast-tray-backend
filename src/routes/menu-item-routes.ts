import { Router } from "express";
import { createMenuItem, listMenuItems, softDeleteMenuItem, toggleMenuItemAvailability, updateMenuItem } from "../controllers/menu-item-controller";
import { validateRequest } from "../validations/validation";
import { createMenuItemSchema, menuItemIdParamsSchema, stallIdParamsSchema, updateMenuItemSchema } from "../validations/menu-item-validation";

export const menuItemRouter = Router({ mergeParams: true });

menuItemRouter.get("/stalls/:stallId/menu-items", validateRequest(stallIdParamsSchema, "params"), listMenuItems);
menuItemRouter.post("/stalls/:stallId/menu-items", validateRequest(stallIdParamsSchema, "params"), validateRequest(createMenuItemSchema), createMenuItem);
menuItemRouter.patch("/menu-items/:menuItemId", validateRequest(menuItemIdParamsSchema, "params"), validateRequest(updateMenuItemSchema), updateMenuItem);
menuItemRouter.patch("/menu-items/:menuItemId/availability", validateRequest(menuItemIdParamsSchema, "params"), toggleMenuItemAvailability);
menuItemRouter.patch("/menu-items/:menuItemId/delete", validateRequest(menuItemIdParamsSchema, "params"), softDeleteMenuItem);