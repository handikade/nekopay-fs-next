import { Schema, type InferSchemaType, type Types } from "mongoose";

const userAddressSchema = new Schema(
  {
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
  },
  { _id: false }
);

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phone: { type: String },
  passwordHash: {
    type: String,
    required: true,
  },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  address: userAddressSchema,
  roles: {
    type: [String],
  },
});

userSchema.index({ email: 1 }, { unique: true });

export type UserDocShape = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};
