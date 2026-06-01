import { Router } from "express";
import { listUsers, getUser, createUser, updateUser, deleteUser, loginUser, banUser, warnUser } from "../controllers/user-controller";
import { validateRequest } from "../validations/validation";
import { createUserSchema, loginUserSchema, updateUserSchema, userIdParamsSchema } from "../validations/user-validation";

export const userRouter = Router();

userRouter.post("/login", validateRequest(loginUserSchema), loginUser);
userRouter.get("/", listUsers);
userRouter.get("/:id", validateRequest(userIdParamsSchema, "params"), getUser);
userRouter.post("/", validateRequest(createUserSchema), createUser);
userRouter.patch("/:id", validateRequest(userIdParamsSchema, "params"), validateRequest(updateUserSchema), updateUser);
userRouter.patch("/:id/ban", validateRequest(userIdParamsSchema, "params"), banUser);
userRouter.patch("/:id/warn", validateRequest(userIdParamsSchema, "params"), warnUser);
userRouter.delete("/:id", validateRequest(userIdParamsSchema, "params"), deleteUser);