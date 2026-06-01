import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

test("jwt util round trip", async () => {
  process.env.JWT_SECRET = "test-secret-change-me";
  const { signJwt, verifyJwt } = await import("../src/utils/jwt-util");

  const token = signJwt({ userId: 1, email: "person@example.com", role: "STUDENT" });
  const payload = verifyJwt(token);

  assert.equal(payload.userId, 1);
  assert.equal(payload.email, "person@example.com");
});

test("validation schemas parse objects", async () => {
  const { parseSchema } = await import("../src/validations/validation");
  const schema = z.object({ title: z.string().min(1) });

  const parsed = parseSchema(schema, { title: "Build scaffold" });

  assert.equal(parsed.title, "Build scaffold");
});