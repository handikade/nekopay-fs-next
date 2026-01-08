import { NekoApiError } from "@/lib/neko-api-error";
import { PartnerBankAccountModel } from "./model";

import type { PartnerBankAccount } from "./schema";

export async function create(payload: PartnerBankAccount) {
  try {
    const partnerBankAccount = await PartnerBankAccountModel.create(payload);
    return partnerBankAccount;
  } catch (error) {
    console.log("Unexpected error", error);
    throw new NekoApiError(500, "An unexpected error occurred");
  }
}

export async function update(id: string, payload: Partial<PartnerBankAccount>) {
  try {
    const partnerBankAccount = await PartnerBankAccountModel.findOneAndUpdate(
      { _id: id },
      payload,
      { returnDocument: "after" }
    );
    return partnerBankAccount;
  } catch (error) {
    console.log("Unexpected error", error);
    throw new NekoApiError(500, "An unexpected error occurred");
  }
}

export async function findById(id: string) {
  try {
    const partnerBankAccount = await PartnerBankAccountModel.findById(id)
      .populate("bankId")
      .exec();
    return partnerBankAccount;
  } catch (error) {
    console.log("Unexpected error", error);
    throw new NekoApiError(500, "An unexpected error occurred");
  }
}

export async function findAll() {
  try {
    const partnerBankAccounts = await PartnerBankAccountModel.find({}).exec();
    return partnerBankAccounts;
  } catch (error) {
    console.log("Unexpected error", error);
    throw new NekoApiError(500, "An unexpected error occurred");
  }
}

export async function remove(id: string) {
  try {
    const partnerBankAccount = await PartnerBankAccountModel.findByIdAndDelete(
      id
    );
    return partnerBankAccount;
  } catch (error) {
    console.log("Unexpected error", error);
    throw new NekoApiError(500, "An unexpected error occurred");
  }
}
