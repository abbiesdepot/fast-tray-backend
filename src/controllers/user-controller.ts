import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import { userService } from "../services/user-service";
import { toPublicUser } from "../models/user-model";

export const listUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.list();
  res.json({ data: users.map(toPublicUser) });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getById(Number(req.params.id));
  if (!user) throw new AppError(404, "User not found");
  res.json({ data: toPublicUser(user) });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.create(req.body);
  res.status(201).json({ data: toPublicUser(user) });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.update(Number(req.params.id), req.body);
  res.json({ data: toPublicUser(user) });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(204).send(await userService.remove(Number(req.params.id)));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.loginOrCreate(req.body);
  res.json({ data: toPublicUser(user) });
});

export const banUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.ban(Number(req.params.id), Boolean(req.body?.isBanned ?? true));
  res.json({ data: toPublicUser(user) });
});

export const warnUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.warn(Number(req.params.id));
  res.json({ data: toPublicUser(user) });
});