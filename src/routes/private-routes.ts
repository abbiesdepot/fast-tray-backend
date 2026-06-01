import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { stallRouter } from "./stall-routes";
import { menuItemRouter } from "./menu-item-routes";
import { orderRouter } from "./order-routes";
import { adminRouter } from "./admin-routes";

export const privateRouter = Router();

privateRouter.use(authMiddleware);
privateRouter.use(stallRouter);
privateRouter.use(menuItemRouter);
privateRouter.use(orderRouter);
privateRouter.use("/admin", adminRouter);