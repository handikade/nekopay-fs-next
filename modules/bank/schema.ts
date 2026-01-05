import { Schema, type HydratedDocument, type InferSchemaType } from "mongoose";

export const BankSchema = new Schema({
  code: String,
  name: String,
});

export type Bank = InferSchemaType<typeof BankSchema>;

export type BankDocument = HydratedDocument<Bank>;
