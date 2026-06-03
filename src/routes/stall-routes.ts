import { Router } from "express";
import { createStall, getDailySalesSummary, getStall, listActiveStalls, toggleStallActive, updateStall } from "../controllers/stall-controller";
import { validateRequest } from "../validations/validation";
import { createStallSchema, stallIdParamsSchema, updateStallSchema } from "../validations/stall-validation";
import { createMenuItem, listMenuItems } from "../controllers/menu-item-controller";
import { createMenuItemSchema } from "../validations/menu-item-validation";

export const stallRouter = Router();

stallRouter.get("/", listActiveStalls);
stallRouter.get("/:stallId", validateRequest(stallIdParamsSchema, "params"), getStall);
stallRouter.get("/:stallId/sales-summary", validateRequest(stallIdParamsSchema, "params"), getDailySalesSummary);
stallRouter.post("/", validateRequest(createStallSchema), createStall);
stallRouter.patch("/:stallId", validateRequest(stallIdParamsSchema, "params"), validateRequest(updateStallSchema), updateStall);
stallRouter.patch("/:stallId/toggle", validateRequest(stallIdParamsSchema, "params"), toggleStallActive);

stallRouter.get("/:stallId/menu-items", validateRequest(stallIdParamsSchema, "params"), listMenuItems);
stallRouter.post("/:stallId/menu-items", validateRequest(stallIdParamsSchema, "params"), validateRequest(createMenuItemSchema), createMenuItem);