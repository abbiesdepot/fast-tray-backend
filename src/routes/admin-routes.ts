import { Router } from "express";
import {
  listAllUsers,
  warnUser,
  toggleBanUser,
  listAllStalls,
  registerStall,
  toggleStallActive,
} from "../controllers/admin-controller";

export const adminRouter = Router();

// User management
adminRouter.get("/users", listAllUsers);
adminRouter.patch("/users/:id/warn", warnUser);
adminRouter.patch("/users/:id/ban", toggleBanUser);

// Stall management
adminRouter.get("/stalls", listAllStalls);
adminRouter.post("/stalls", registerStall);
adminRouter.patch("/stalls/:id/toggle", toggleStallActive);