import { Types } from "mongoose";
import type {
  CreatePartnerDto,
  FindPartnersQueryDto,
  ListPartnerDto,
} from "./dto";
import { SearchQuery } from "./repository";
import type { Partner, PartnerDocument } from "./schema";

export function partnerToListDto(partner: PartnerDocument): ListPartnerDto {
  return {
    id: partner._id.toString(),
    type: partner.type,
    number: partner.partner_number,
    name: partner.name,
    email: partner.email,
    phone: partner.phone,
    created_at: new Date(partner.created_at).toLocaleDateString(),
  };
}

export function adaptFindPartnersQueryDtoToSearchQuery(
  query: FindPartnersQueryDto
): SearchQuery {
  return {
    page: query.page ?? 1,
    limit: query.limit ?? 10,
    sortBy: query.sortBy ?? "created_at",
    sortOrder: query.sortOrder ?? "desc",
    ...(query.email && { email: query.email }),
    ...(query.partner_number && { partner_number: query.partner_number }),
  };
}

export function adaptCreatePartnerDtoToPartner(dto: CreatePartnerDto): Partner {
  const partner: Partner = {
    // basic
    partner_number: dto.partner_number,
    email: dto.email,
    name: dto.name,
    phone: dto.phone,
    type: dto.type,
    business_entity: dto.business_entity,
    company_phone: dto.company_phone,
    // address
    address: dto.address,
    // others
    user_id: new Types.ObjectId(dto.user_id),
    created_by: dto.created_by,
    created_at: dto.created_at,
    updated_at: dto.updated_at,
  };

  return partner;
}
