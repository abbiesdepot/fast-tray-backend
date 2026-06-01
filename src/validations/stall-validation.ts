import { z } from "zod";

export const createStallSchema = z.object({
  ownerId: z.coerce.number().int().positive(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  imageUrl: z.string().url().max(255).optional().or(z.literal("")),
  location: z.string().min(1).max(100),
  isActive: z.boolean().optional(),
  openingHour: z.string().max(10).default("06:00"),
  closingHour: z.string().max(10).default("21:00"),
});

export const updateStallSchema = createStallSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

export const stallIdParamsSchema = z.object({
  stallId: z.coerce.number().int().positive(),
});

export type CreateStallInput = z.infer<typeof createStallSchema>;
export type UpdateStallInput = z.infer<typeof updateStallSchema>;