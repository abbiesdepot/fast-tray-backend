import type { User } from "@prisma/client";

export function toPublicUser(user: User) {
  return user;
}