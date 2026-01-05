import { buildPaginationLinks } from "./pagination";

describe("buildPaginationLinks", () => {
  const baseUrl = "http://localhost/api/items";
  const commonParams = {
    limit: 10,
    totalRecords: 100,
    sortBy: "name",
    sortOrder: "asc",
    maxPage: 10,
  };

  it("should generate correct links for the first page", () => {
    const page = 1;
    const links = buildPaginationLinks({ ...commonParams, baseUrl, page });

    expect(links.first).toBe(
      `${baseUrl}?page=1&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.prev).toBe("");
    expect(links.next).toBe(
      `${baseUrl}?page=2&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.last).toBe(
      `${baseUrl}?page=10&limit=10&sortBy=name&sortOrder=asc`
    );
  });

  it("should generate correct links for a middle page", () => {
    const page = 5;
    const links = buildPaginationLinks({ ...commonParams, baseUrl, page });

    expect(links.first).toBe(
      `${baseUrl}?page=1&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.prev).toBe(
      `${baseUrl}?page=4&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.next).toBe(
      `${baseUrl}?page=6&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.last).toBe(
      `${baseUrl}?page=10&limit=10&sortBy=name&sortOrder=asc`
    );
  });

  it("should generate correct links for the last page", () => {
    const page = 10;
    const links = buildPaginationLinks({ ...commonParams, baseUrl, page });

    expect(links.first).toBe(
      `${baseUrl}?page=1&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.prev).toBe(
      `${baseUrl}?page=9&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.next).toBe("");
    expect(links.last).toBe(
      `${baseUrl}?page=10&limit=10&sortBy=name&sortOrder=asc`
    );
  });

  it("should handle totalRecords less than limit (single page)", () => {
    const page = 1;
    const links = buildPaginationLinks({
      ...commonParams,
      baseUrl,
      page,
      totalRecords: 5,
      limit: 10,
    });

    expect(links.first).toBe(
      `${baseUrl}?page=1&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.prev).toBe("");
    expect(links.next).toBe("");
    expect(links.last).toBe(
      `${baseUrl}?page=1&limit=10&sortBy=name&sortOrder=asc`
    );
  });

  it("should handle maxPage constraint", () => {
    const page = 1;
    const links = buildPaginationLinks({
      ...commonParams,
      baseUrl,
      page,
      totalRecords: 200, // 20 pages
      maxPage: 5, // Should clamp to 5 pages
    });

    expect(links.first).toBe(
      `${baseUrl}?page=1&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.prev).toBe("");
    expect(links.next).toBe(
      `${baseUrl}?page=2&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(links.last).toBe(
      `${baseUrl}?page=5&limit=10&sortBy=name&sortOrder=asc`
    );

    const middlePageLinks = buildPaginationLinks({
      ...commonParams,
      baseUrl,
      page: 5,
      totalRecords: 200,
      maxPage: 5,
    });
    expect(middlePageLinks.prev).toBe(
      `${baseUrl}?page=4&limit=10&sortBy=name&sortOrder=asc`
    );
    expect(middlePageLinks.next).toBe("");
    expect(middlePageLinks.last).toBe(
      `${baseUrl}?page=5&limit=10&sortBy=name&sortOrder=asc`
    );
  });

  it("should generate links without sortBy and sortOrder if not provided", () => {
    const page = 1;
    const links = buildPaginationLinks({
      baseUrl,
      page,
      limit: 10,
      totalRecords: 100,
      maxPage: 10,
    });

    expect(links.first).toBe(`${baseUrl}?page=1&limit=10`);
    expect(links.next).toBe(`${baseUrl}?page=2&limit=10`);
    expect(links.last).toBe(`${baseUrl}?page=10&limit=10`);
  });

  it("should include filter parameters in the links", () => {
    const page = 3;
    const filters = {
      status: "active",
      email: "test@example.com",
      date_start: "2023-01-01",
    };
    const links = buildPaginationLinks({
      ...commonParams,
      baseUrl,
      page,
      filters,
    });

    const checkUrl = (url: string, expectedPage: number) => {
      const u = new URL(url);
      expect(u.searchParams.get("page")).toBe(String(expectedPage));
      expect(u.searchParams.get("limit")).toBe(String(commonParams.limit));
      expect(u.searchParams.get("sortBy")).toBe(commonParams.sortBy);
      expect(u.searchParams.get("sortOrder")).toBe(commonParams.sortOrder);
      expect(u.searchParams.get("status")).toBe(filters.status);
      expect(u.searchParams.get("email")).toBe(filters.email);
      expect(u.searchParams.get("date_start")).toBe(filters.date_start);
    };

    checkUrl(links.first, 1);
    checkUrl(links.prev, 2);
    checkUrl(links.next, 4);
    checkUrl(links.last, 10);
  });
});
