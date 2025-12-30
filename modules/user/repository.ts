import { UserModel } from "./model";
import { User, UserDocument } from "./schema";

export async function create(
  payload: Omit<User, "_id">
): Promise<UserDocument> {
  return await UserModel.create(payload);
}

export async function findByEmail(email: string): Promise<UserDocument | null> {
  return await UserModel.findOne({ email }).exec();
}
