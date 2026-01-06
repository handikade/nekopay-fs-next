import { Schema, type HydratedDocument, type InferSchemaType } from "mongoose";

export const PartnerContactSchema = new Schema({
  partner_id: {
    type: Schema.Types.ObjectId,
    ref: "Partner",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
  },
  phone: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

PartnerContactSchema.pre<PartnerContactDocument>("validate", function () {
  if (!this.email && !this.phone) {
    this.invalidate("email", "Either email or phone must be provided.");
    this.invalidate("phone", "Either email or phone must be provided.");
  }
});

export type PartnerContact = InferSchemaType<typeof PartnerContactSchema>;
export type PartnerContactDocument = HydratedDocument<PartnerContact>;
