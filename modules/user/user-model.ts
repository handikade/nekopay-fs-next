import mongoose, { type Model } from "mongoose";
import { userSchema, type UserDocShape } from "./user-schema";

export const UserModel: Model<UserDocShape> =
  (mongoose.models.User as Model<UserDocShape>) ||
  mongoose.model<UserDocShape>("User", userSchema);
