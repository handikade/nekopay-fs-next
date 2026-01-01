export interface BaseSearchQueryDto {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: {
    field: string;
    operator: string;
    value: string;
  }[];
}
