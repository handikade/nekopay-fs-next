import { Types } from "mongoose";
import type { CreatePartnerContactDto } from "./dto";
import type { PartnerContact } from "./schema";

export function createPartnerContactDtoToPartnerContact(
  dto: CreatePartnerContactDto
): PartnerContact {
  const partnerContact: PartnerContact = {
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    partner_id: new Types.ObjectId(dto.partner_id),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return partnerContact;
}
