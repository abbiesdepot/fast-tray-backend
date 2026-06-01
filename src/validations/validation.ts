import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../utils/app-error";

export const idParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export function validateRequest(schema: z.ZodTypeAny, source: "body" | "params" | "query" = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      next(new AppError(400, "Validation failed", result.error.flatten()));
      return;
    }

    const request = req as unknown as Record<string, unknown>;
    request[source] = result.data;
    next();
  };
}

export function parseSchema<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);

  if (!result.success) {
    throw new AppError(400, "Validation failed", result.error.flatten());
  }

  return result.data;
}