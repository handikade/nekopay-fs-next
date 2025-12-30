import { model, models, type Model } from "mongoose";
import { PartnerDocument, PartnerSchema } from "./schema";

export const PartnerModel: Model<PartnerDocument> =
  models.Partner || model<PartnerDocument>("Partner", PartnerSchema);

// export const UserModel: Model<UserDocument> =
//   (mongoose.models.User as Model<UserDocument>) ||
//   mongoose.model<UserDocument>("User", userSchema);
