import { mapSearchParams } from "./query.util";

describe("mapSearchParams", () => {
  it("should return an empty object for empty search params", () => {
    const params = new URLSearchParams();
    expect(mapSearchParams(params)).toEqual({});
  });

  it("should correctly parse pagination and sorting parameters", () => {
    const params = new URLSearchParams({
      page: "2",
      limit: "50",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    expect(mapSearchParams(params)).toEqual({
      page: 2,
      limit: 50,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  });

  it("should handle invalid sortOrder gracefully", () => {
    const params = new URLSearchParams({
      sortOrder: "invalid",
    });
    expect(mapSearchParams(params)).toEqual({});
  });

  it("should parse a single equality filter", () => {
    const params = new URLSearchParams({
      status: "active",
    });
    expect(mapSearchParams(params)).toEqual({
      filters: [{ field: "status", operator: "eq", value: "active" }],
    });
  });

  it("should parse multiple filters with different operators", () => {
    const params = new URLSearchParams({
      name: "John Doe",
      age_gt: "30",
    });
    expect(mapSearchParams(params)).toEqual({
      filters: [
        { field: "name", operator: "eq", value: "John Doe" },
        { field: "age", operator: "gt", value: "30" },
      ],
    });
  });

  it("should handle field names with underscores", () => {
    const params = new URLSearchParams({
      user_role_in: "admin,manager",
    });
    expect(mapSearchParams(params)).toEqual({
      filters: [
        { field: "user_role", operator: "in", value: "admin,manager" },
      ],
    });
  });

  it("should correctly parse a mix of all parameter types", () => {
    const params = new URLSearchParams({
      page: "1",
      limit: "10",
      sortBy: "name",
      sortOrder: "asc",
      status: "published",
      views_gte: "1000",
    });
    expect(mapSearchParams(params)).toEqual({
      page: 1,
      limit: 10,
      sortBy: "name",
      sortOrder: "asc",
      filters: [
        { field: "status", operator: "eq", value: "published" },
        { field: "views", operator: "gte", value: "1000" },
      ],
    });
  });

  it("should ignore invalid numeric values for page and limit", () => {
    const params = new URLSearchParams({
      page: "one",
      limit: "ten",
    });
    expect(mapSearchParams(params)).toEqual({});
  });
});
