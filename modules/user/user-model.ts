import mongoose, { type Model } from "mongoose";
import { userSchema, type UserDocument } from "./user-schema";

export const UserModel: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", userSchema);
