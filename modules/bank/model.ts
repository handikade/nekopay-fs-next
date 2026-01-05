import { model, models, type Model } from "mongoose";
import { BankDocument, BankSchema } from "./schema";

export const BankModel: Model<BankDocument> =
  models.Bank || model<BankDocument>("Bank", BankSchema);
