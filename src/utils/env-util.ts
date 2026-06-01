import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/fast_tray?schema=public"),
  JWT_SECRET: z.string().min(8).default("dev-secret-change-me"),
  JWT_SECRET_KEY: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);
export const jwtSecret = env.JWT_SECRET_KEY ?? env.JWT_SECRET;