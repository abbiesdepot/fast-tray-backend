import { z } from "zod";

export const createMenuItemSchema = z.object({
  stallId: z.coerce.number().int().positive(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  imageUrl: z.string().url().max(255).optional().or(z.literal("")),
  category: z.string().max(50).optional(),
  isAvailable: z.boolean().optional(),
});

export const updateMenuItemSchema = createMenuItemSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

export const menuItemIdParamsSchema = z.object({
  menuItemId: z.coerce.number().int().positive(),
});

export const stallIdParamsSchema = z.object({
  stallId: z.coerce.number().int().positive(),
});

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;