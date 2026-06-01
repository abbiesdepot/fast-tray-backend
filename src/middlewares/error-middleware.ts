import type { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error";

export function errorMiddleware(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message, details: err.details ?? null });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({ message: "Validation failed", details: err.flatten() });
    return;
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (typeof err === "object" && err !== null && "code" in err) {
    const code = Reflect.get(err, "code");
    const message = Reflect.get(err, "message");

    if (typeof code === "string") {
      res.status(400).json({ message: typeof message === "string" ? message : "Database request failed", code });
      return;
    }

    if (typeof message === "string") {
      res.status(400).json({ message });
      return;
    }

    res.status(400).json({ message: "Database request failed" });
    return;
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}