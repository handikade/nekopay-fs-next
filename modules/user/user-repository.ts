import { UserModel } from "./user-model";
import { User, UserDocument } from "./user-schema";

export async function create(
  payload: Omit<User, "_id">
): Promise<UserDocument> {
  return await UserModel.create(payload);
}

export async function findByEmail(email: string): Promise<UserDocument | null> {
  return await UserModel.findOne({ email }).exec();
}
