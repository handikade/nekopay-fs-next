import { BaseSearchQueryDto } from "./base-search-query.dto";

export function mapSearchParams(
  searchParam: URLSearchParams
): BaseSearchQueryDto {
  const dto: BaseSearchQueryDto = {};

  if (searchParam.has("page")) {
    const page = parseInt(searchParam.get("page")!, 10);
    if (!isNaN(page)) {
      dto.page = page;
    }
  }

  if (searchParam.has("limit")) {
    const limit = parseInt(searchParam.get("limit")!, 10);
    if (!isNaN(limit)) {
      dto.limit = limit;
    }
  }

  if (searchParam.has("sortBy")) {
    dto.sortBy = searchParam.get("sortBy")!;
  }

  if (searchParam.has("sortOrder")) {
    const sortOrder = searchParam.get("sortOrder")!;
    if (sortOrder === "asc" || sortOrder === "desc") {
      dto.sortOrder = sortOrder;
    }
  }

  const reservedParams = ["page", "limit", "sortBy", "sortOrder"];
  const filters: NonNullable<BaseSearchQueryDto["filters"]> = [];

  for (const [key, value] of searchParam.entries()) {
    if (reservedParams.includes(key)) {
      continue;
    }

    const parts = key.split("_");
    let field: string;
    let operator: string;

    if (parts.length > 1) {
      operator = parts.pop()!;
      field = parts.join("_");
    } else {
      field = key;
      operator = "eq";
    }

    filters.push({ field, operator, value });
  }

  if (filters.length > 0) {
    dto.filters = filters;
  }

  return dto;
}

