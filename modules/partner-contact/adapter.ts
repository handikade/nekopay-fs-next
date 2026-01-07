import { Types } from "mongoose";
import type {
  CreatePartnerContactDto,
  ListPartnerContactDto,
  ViewPartnerContactDto,
} from "./dto";
import type { PartnerContact, PartnerContactDocument } from "./schema";

export function CreatePartnerContactDto_to_PartnerContact(
  dto: CreatePartnerContactDto
): PartnerContact {
  const partnerContact = {
    partner_id: new Types.ObjectId(dto.partner_id),
    user_id: new Types.ObjectId(dto.user_id),
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
  };

  return partnerContact as PartnerContact;
}

export function PartnerContactDocument_to_ListPartnerContactDto(
  pc: PartnerContactDocument
): ListPartnerContactDto {
  return {
    _id: pc._id.toString(),
    name: pc.name,
    email: pc.email ?? "",
    phone: pc.phone ?? "",
    created_at: pc.createdAt?.toISOString() ?? "",
    updated_at: pc.updatedAt?.toISOString() ?? "",
  };
}

export function PartnerContactDocument_to_ViewPartnerContactDto(
  pc: PartnerContactDocument
): ViewPartnerContactDto {
  return {
    _id: pc._id.toString(),
    name: pc.name,
    email: pc.email ?? "",
    phone: pc.phone ?? "",
    created_at: pc.createdAt?.toISOString() ?? "",
    updated_at: pc.updatedAt?.toISOString() ?? "",
  };
}
