import { User } from "@prisma/client";
import { JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";

export const createJWT = (userData: User) => {
  const tokenPayload = {
    id: userData.id,
    email: userData.email,
    role: userData.role || "user",
  };

  return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1d" });
};
