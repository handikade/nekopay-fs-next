import { Schema, type HydratedDocument, type InferSchemaType } from "mongoose";

export const PartnerContactSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    // Add timestamps here for correct type inference
    // created_at: Date,
    // updated_at: Date,
  },
  // { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  { timestamps: true }
);

PartnerContactSchema.pre<PartnerContactDocument>("validate", function () {
  if (!this.email && !this.phone) {
    this.invalidate("email", "Either email or phone must be provided.");
    this.invalidate("phone", "Either email or phone must be provided.");
  }
});

export type PartnerContact = InferSchemaType<typeof PartnerContactSchema>;
export type PartnerContactDocument = HydratedDocument<PartnerContact>;
