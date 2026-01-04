import { ListPartnerDto } from "@/modules/partner/dto";
import LabelSort from "./LabelSort";

export type TablePartnerProp = {
  partners: ListPartnerDto[];
  sortBy: SortBy;
  sortOrder: SortOrder;
  page: number;
  limit: number;
};

type SortBy =
  | "partner_number"
  | "name"
  | "email"
  | "phone"
  | "created_at"
  | string;
type SortOrder = "asc" | "desc";

const TablePartner = ({
  partners,
  sortBy,
  sortOrder,
  page,
  limit,
}: TablePartnerProp) => {
  const buildSortHref = (field: SortBy) => {
    const nextOrder =
      sortBy === field ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    const params = new URLSearchParams();
    // params.set("page", String(page));
    params.set("page", "1");
    params.set("limit", String(limit));
    params.set("sortBy", field);
    params.set("sortOrder", nextOrder);
    return `?${params.toString()}`;
  };

  const getAriaSort = (field: SortBy) =>
    sortBy === field
      ? sortOrder === "asc"
        ? "ascending"
        : "descending"
      : "none";

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            aria-sort={getAriaSort("partner_number")}
          >
            <LabelSort
              label="Number"
              direction={sortBy === "partner_number" ? sortOrder : "asc"}
              isActive={sortBy === "partner_number"}
              isSortable
              href={buildSortHref("partner_number")}
            />
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            aria-sort={getAriaSort("name")}
          >
            <LabelSort
              label="Name"
              direction={sortBy === "name" ? sortOrder : "asc"}
              isActive={sortBy === "name"}
              isSortable
              href={buildSortHref("name")}
            />
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            aria-sort={getAriaSort("email")}
          >
            <LabelSort
              label="Email"
              direction={sortBy === "email" ? sortOrder : "asc"}
              isActive={sortBy === "email"}
              isSortable
              href={buildSortHref("email")}
            />
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            aria-sort={getAriaSort("phone")}
          >
            <LabelSort
              label="Phone"
              direction={sortBy === "phone" ? sortOrder : "asc"}
              isActive={sortBy === "phone"}
              isSortable
              href={buildSortHref("phone")}
            />
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            aria-sort={getAriaSort("created_at")}
          >
            <LabelSort
              label="Created At"
              direction={sortBy === "created_at" ? sortOrder : "asc"}
              isActive={sortBy === "created_at"}
              isSortable
              href={buildSortHref("created_at")}
            />
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {partners.map((partner) => (
          <tr key={partner.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {partner.number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {partner.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {partner.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {partner.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {partner.createdAt}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePartner;
