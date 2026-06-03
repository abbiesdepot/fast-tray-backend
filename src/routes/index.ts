import type { Express } from "express";
import { authRouter } from "./auth-routes";
import { stallRouter } from "./stall-routes";
import { menuItemRouter } from "./menu-item-routes";
import { orderRouter } from "./order-routes";
import { userRouter } from "./user-routes";
import { authMiddleware } from "../middlewares/auth-middleware";

export function registerRoutes(app: Express) {
  app.use("/api/auth", authRouter);

  app.use("/api/stalls", authMiddleware, stallRouter);
  app.use("/api/menu-items", authMiddleware, menuItemRouter);
  app.use("/api/orders", authMiddleware, orderRouter);
  app.use("/api/users", authMiddleware, userRouter);
}