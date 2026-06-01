import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(150),
  role: z.enum(["STUDENT", "STALL_OWNER", "ADMIN"]).default("STUDENT"),
  isActive: z.boolean().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email().max(150),
  role: z.enum(["STUDENT", "STALL_OWNER", "ADMIN"]),
});

export const updateUserSchema = createUserSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const userIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});