import { model, models, type Model } from "mongoose";
import { PartnerContactSchema, type PartnerContactDocument } from "./schema";

export const PartnerContactModel: Model<PartnerContactDocument> =
  models.PartnerContact ||
  model<PartnerContactDocument>("PartnerContact", PartnerContactSchema, "partner_contacts");
