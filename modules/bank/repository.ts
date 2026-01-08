import type { QueryFilter } from "mongoose";
import { BankModel } from "./model";
import type { BankDocument } from "./schema";

export type SearchQuery = {
  code?: string;
  name?: string;
};

export async function findAll(query: SearchQuery): Promise<BankDocument[]> {
  const { code, name } = query;

  const filters: QueryFilter<BankDocument> = {};

  if (code) {
    filters.code = { $regex: code, $options: "i" };
  }
  if (name) {
    filters.name = { $regex: name, $options: "i" };
  }

  const banks = await BankModel.find(filters).sort({ name: 1 }).exec();

  return banks;
}

export async function findById(id: string): Promise<BankDocument | null> {
  return await BankModel.findById(id).exec();
}
