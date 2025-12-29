import { UserModel } from "./user-model";
import { UserDocShape } from "./user-schema";

export async function create(
  payload: Omit<UserDocShape, "_id">
): Promise<UserDocShape> {
  return await UserModel.create(payload);
}

export async function findByEmail(email: string): Promise<UserDocShape | null> {
  return await UserModel.findOne({ email }).exec();
}
