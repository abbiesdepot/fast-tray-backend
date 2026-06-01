import { Router } from "express";
import { listAllStalls, listAllUsers } from "../controllers/admin-controller";

export const adminRouter = Router();

adminRouter.get("/users", listAllUsers);
adminRouter.get("/stalls", listAllStalls);