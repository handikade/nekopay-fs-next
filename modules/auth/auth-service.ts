import { connectMongo } from "@/lib/mongoose";
import { ServiceError } from "@/lib/service-error";
import * as userRepo from "@/modules/user/user-repository";
import bcrypt from "bcryptjs";

export async function register(payload: { email: string; password: string }) {
  await connectMongo();

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const createdUser = await userRepo.create({
    email: payload.email,
    passwordHash,
    roles: ["user"],
  });

  return { id: createdUser._id };
}

export async function login(payload: { email: string; password: string }) {
  await connectMongo();

  const user = await userRepo.findByEmail(payload.email);

  if (!user) {
    // telling the client that the user is not found is not secure actually
    // this is just an example
    throw new ServiceError(400, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    payload.password,
    user.passwordHash
  );

  if (!isPasswordValid || !user) {
    throw new ServiceError(400, "Invalid password");
  }

  return { id: user._id.toString() };
}
