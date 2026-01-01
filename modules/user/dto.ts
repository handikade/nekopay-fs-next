import { z } from "zod";

export const RegisterUserSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long").optional(),
  phone: z.string().regex(/^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/, "Invalid phone number").optional(),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
