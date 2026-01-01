import {
  Schema,
  type InferSchemaType,
  type HydratedDocument,
} from "mongoose";

const userAddressSchema = new Schema(
  {
    address1: { type: String, trim: true },
    address2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zip: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  { _id: false },
);

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
  },
  phone: {
    type: String,
    match: /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/, // Basic phone number validation
  },
  passwordHash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  address: userAddressSchema,
  roles: {
    type: [String],
  },
});

userSchema.index({ email: 1 }, { unique: true });

export type User = InferSchemaType<typeof userSchema>;

export type UserDocument = HydratedDocument<User>;
