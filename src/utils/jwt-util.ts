import jwt from "jsonwebtoken";
import { jwtSecret } from "./env-util";
import type { JwtUser } from "../models";

export function signJwt(payload: JwtUser, expiresIn: jwt.SignOptions["expiresIn"] = "1d") {
  return jwt.sign(payload, jwtSecret, { expiresIn });
}

export const generateToken = signJwt;

export function verifyJwt(token: string) {
  return jwt.verify(token, jwtSecret) as JwtUser;
}