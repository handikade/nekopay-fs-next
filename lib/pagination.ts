import { DEFAULT_MAX_PAGE } from "./pagination.config";

export type PaginationLinks = {
  first: string;
  prev: string;
  next: string;
  last: string;
};

export function clampPage(page: number, maxPage: number): number {
  return Math.min(Math.max(page, 1), maxPage);
}

export function buildPaginationLinks({
  baseUrl,
  page,
  limit,
  totalRecords,
  sortBy,
  sortOrder,
  maxPage = DEFAULT_MAX_PAGE,
  filters,
}: {
  baseUrl: string;
  page: number;
  limit: number;
  totalRecords: number;
  sortBy?: string;
  sortOrder?: string;
  maxPage?: number;
  filters?: Record<string, string | number>;
}): PaginationLinks {
  const searchParams = new URLSearchParams();

  if (filters) {
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const value = filters[key];
        if (value !== undefined && value !== null) {
          searchParams.set(key, String(value));
        }
      }
    }
  }

  searchParams.set("page", String(page));
  searchParams.set("limit", String(limit));

  if (sortBy) searchParams.set("sortBy", sortBy);
  if (sortOrder) searchParams.set("sortOrder", sortOrder);

  const totalPages = Math.ceil(totalRecords / limit);
  const actualMaxPage = clampPage(totalPages, maxPage);

  const hasPrev = page > 1;
  const hasNext = page < actualMaxPage;

  const firstSearchParams = new URLSearchParams(searchParams);
  firstSearchParams.set("page", String(1));

  const prevSearchParams = new URLSearchParams(searchParams);
  prevSearchParams.set("page", String(page - 1));

  const nextSearchParams = new URLSearchParams(searchParams);
  nextSearchParams.set("page", String(page + 1));

  const lastSearchParams = new URLSearchParams(searchParams);
  lastSearchParams.set("page", String(actualMaxPage));

  return {
    first: `${baseUrl}?${firstSearchParams.toString()}`,
    prev: hasPrev ? `${baseUrl}?${prevSearchParams.toString()}` : "",
    next: hasNext ? `${baseUrl}?${nextSearchParams.toString()}` : "",
    last: `${baseUrl}?${lastSearchParams.toString()}`,
  };
}
