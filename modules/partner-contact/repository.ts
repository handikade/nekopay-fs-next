import { NekoApiError } from "@/lib/neko-api-error";
import { PartnerContactModel } from "./model";

import type { PartnerContact } from "./schema";

export async function create(payload: PartnerContact) {
  try {
    const partnerContact = await PartnerContactModel.create(payload);
    return partnerContact;
  } catch (error) {
    console.log("Unexpected error", error);
    throw new NekoApiError(500, "An unexpected error occurred");
  }
}

export async function update(id: string, payload: Partial<PartnerContact>) {
  try {
    const partnerContact = await PartnerContactModel.findOneAndUpdate(
      { _id: id },
      payload,
      { returnDocument: "after" }
    );
    return partnerContact;
  } catch (error) {
    console.log("Unexpected error", error);
    throw new NekoApiError(500, "An unexpected error occurred");
  }
}

export async function findById(id: string) {
  try {
    const partnerContact = await PartnerContactModel.findById(id);
    return partnerContact;
  } catch (error) {
    console.log("Unexpected error", error);
    throw new NekoApiError(500, "An unexpected error occurred");
  }
}
