import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("Username must be filled."),
  password: z
    .string()
    .nonempty("Password must be filled.")
    .min(8, "Password must be at least 8 characters long."),
});

export const registerSchema = z.object({
  name: z.string().nonempty("Username must be filled."),
  email: z
    .string()
    .email("Invalid email address.")
    .nonempty("Email must be filled."),
  username: z.string().nonempty("Username must be filled."),
  age: z
    .number()
    .int("Age must be a whole number.")
    .positive("Age must be a positive number."),
});
