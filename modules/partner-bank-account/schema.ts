import { Schema, type HydratedDocument, type InferSchemaType } from "mongoose";

export const PartnerBankAccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    partnerId: {
      type: Schema.Types.ObjectId,
      ref: "Partner",
      required: true,
    },
    bankId: {
      type: Schema.Types.ObjectId,
      ref: "Bank",
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type PartnerBankAccount = InferSchemaType<
  typeof PartnerBankAccountSchema
>;
export type PartnerBankAccountDocument = HydratedDocument<PartnerBankAccount>;
