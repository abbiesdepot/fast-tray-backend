import { Router } from "express";
import { loginUser } from "../controllers/user-controller";
import { validateRequest } from "../validations/validation";
import { loginUserSchema } from "../validations/user-validation";

export const authRouter = Router();

authRouter.post("/login", validateRequest(loginUserSchema), loginUser);
