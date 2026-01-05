import { Schema, type HydratedDocument, type InferSchemaType } from "mongoose";

const LocationSubSchema = new Schema(
  {
    id: String,
    name: String,
  },
  { _id: false }
);

const AddressIntlSubSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
  },
  { _id: false }
);

const AddressSubSchema = new Schema(
  {
    address_line1: String,
    address_line2: String,
    kelurahan: LocationSubSchema,
    kecamatan: LocationSubSchema,
    kabupaten: LocationSubSchema,
    provinsi: LocationSubSchema,
    postal_code: String,
  },
  { _id: false }
);

const CountrySubSchema = new Schema(
  {
    iso2: String,
    name: String,
  },
  { _id: false }
);

export const PartnerSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: [String],
    enum: ["supplier", "buyer"],
    required: true,
    // Mongoose `required` on an array only ensures the array exists, not that it's non-empty.
    // Adding a validator to ensure it has at least one item and unique items.
    validate: {
      validator: (v: string[]) =>
        Array.isArray(v) && v.length > 0 && new Set(v).size === v.length,
      message: "Partner type must be a non-empty array with unique items.",
    },
  },
  partner_number: {
    type: String,
    required: true,
  },
  business_entity: {
    type: String,
    enum: ["cv", "pt", "koperasi", "perorangan", "lainnya"],
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
  address_intl: AddressIntlSubSchema,
  address: AddressSubSchema,
  country: CountrySubSchema,
  created_by: {
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

export type Partner = InferSchemaType<typeof PartnerSchema>;

export type PartnerDocument = HydratedDocument<Partner>;
