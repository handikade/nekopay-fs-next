"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

const PAGE_SIZE_OPTIONS = [8, 20, 50, 100] as const;

const PaginationLimitSelector = (props: { limit: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { limit } = props;

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit.toString());
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <label
        htmlFor="pagination-limit"
        className="text-sm font-medium text-gray-700"
      >
        Rows
      </label>
      <select
        id="pagination-limit"
        value={limit}
        onChange={handleLimitChange}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        {PAGE_SIZE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default PaginationLimitSelector;
