import { model, models, type Model } from "mongoose";
import { userSchema, type UserDocument } from "./schema";

export const UserModel: Model<UserDocument> =
  (models.User as Model<UserDocument>) ||
  model<UserDocument>("User", userSchema);
