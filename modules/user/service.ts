import { connectMongo } from "@/lib/mongoose";
import { ServiceError } from "@/lib/service-error";
import bcrypt from "bcryptjs";
import { ZodError, z } from "zod";
import { RegisterUserSchema } from "./dto";
import * as userRepo from "./repository";

export async function findByEmail(email: string) {
  return await userRepo.findByEmail(email);
}

export async function register(payload: { email: string; password: string }) {
  try {
    RegisterUserSchema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ServiceError(
        400,
        error.issues.map((e: z.core.$ZodIssue) => e.message).join(", ")
      );
    }
    throw error;
  }

  await connectMongo();

  const existingUser = await userRepo.findByEmail(payload.email);
  if (existingUser) {
    throw new ServiceError(400, "Email already in use");
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const createdUser = await userRepo.create({
    email: payload.email,
    passwordHash,
    roles: ["user"],
  });

  return { id: createdUser._id.toString() };
}
