import { Schema, type HydratedDocument, type InferSchemaType } from "mongoose";

export const PartnerSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["supplier", "buyer", "both"],
      required: true,
    },
    partner_number: {
      type: String,
      required: true,
    },
    business_entity: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phone: {
      type: String,
      required: true,
    },
    company_phone: {
      type: String,
    },
    address_line1: {
      type: String,
    },
    address_line2: {
      type: String,
    },
    regency: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    country: {
      type: String,
    },
    created_by: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export type Partner = InferSchemaType<typeof PartnerSchema>;

export type PartnerDocument = HydratedDocument<Partner>;
