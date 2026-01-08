import { model, models, type Model } from "mongoose";
import {
  PartnerBankAccountSchema,
  type PartnerBankAccountDocument,
} from "./schema";

export const PartnerBankAccountModel: Model<PartnerBankAccountDocument> =
  models.PartnerBankAccount ||
  model<PartnerBankAccountDocument>(
    "PartnerBankAccount",
    PartnerBankAccountSchema,
    "partner_bank_accounts"
  );
