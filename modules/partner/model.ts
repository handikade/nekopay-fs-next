import { model, models, type Model } from "mongoose";
import { PartnerDocument, PartnerSchema } from "./schema";

export const PartnerModel: Model<PartnerDocument> =
  models.Partner || model<PartnerDocument>("Partner", PartnerSchema);
