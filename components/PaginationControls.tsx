"use client";

import type { ChangeEvent } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  limit: number;
}

const PAGE_SIZE_OPTIONS = [8, 20, 50, 100];

const PaginationControls = ({
  totalPages,
  currentPage,
  limit,
}: PaginationControlsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit.toString());
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
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
      </div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
