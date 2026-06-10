import type { Express } from "express";
import { publicRouter } from "./public-routes";
import { userRouter } from "./user-routes";
import { stallRouter } from "./stall-routes";
import { menuItemRouter } from "./menu-item-routes";
import { orderRouter } from "./order-routes";
import { adminRouter } from "./admin-routes";

export function registerRoutes(app: Express) {
  app.use("/api/public", publicRouter);
  app.use("/api/users", userRouter);
  app.use("/api/stalls", stallRouter);
  app.use("/api/menu-items", menuItemRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/admin", adminRouter);
  // privateRouter sengaja tidak dipakai agar demo tidak perlu JWT
}