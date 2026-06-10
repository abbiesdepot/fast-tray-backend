import type { User } from "@prisma/client";

export function toPublicUser(user: User) {
  const { password, ...publicUser } = user;
  return publicUser;
}