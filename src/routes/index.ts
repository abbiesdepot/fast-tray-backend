import type { Express } from "express";
import { publicRouter } from "./public-routes";
import { userRouter } from "./user-routes";
import { privateRouter } from "./private-routes";

export function registerRoutes(app: Express) {
  app.use("/api/public", publicRouter);
  app.use("/api/users", userRouter);
  app.use("/api/private", privateRouter);
}