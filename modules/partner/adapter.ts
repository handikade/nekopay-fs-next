import type { FindPartnersQueryDto, ListPartnerDto } from "./dto";
import { SearchQuery } from "./repository";
import type { PartnerDocument } from "./schema";

export function partnerToListDto(partner: PartnerDocument): ListPartnerDto {
  return {
    id: partner._id.toString(),
    type: partner.type,
    number: partner.partner_number,
    name: partner.name,
    email: partner.email,
    phone: partner.phone,
    createdAt: new Date(partner.created_at).toLocaleDateString(),
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
