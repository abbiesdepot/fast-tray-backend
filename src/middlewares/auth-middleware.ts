import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { verifyJwt } from "../utils/jwt-util";

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (authorization?.startsWith("Bearer ")) {
    try {
      req.user = verifyJwt(authorization.slice(7));
      next();
      return;
    } catch {
      next(new AppError(401, "Invalid or expired token"));
      return;
    }
  }

  const userId = Number(req.headers["x-user-id"]);
  const role = req.headers["x-user-role"];
  const email = req.headers["x-user-email"];

  if (Number.isInteger(userId) && typeof role === "string" && typeof email === "string") {
    req.user = { userId, role: role as "STUDENT" | "STALL_OWNER" | "ADMIN", email };
    next();
    return;
  }

  next(new AppError(401, "Missing role-based identity headers"));
}