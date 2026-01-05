import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongo } from "@/lib/mongoose";
import partnerService from "@/modules/partner/service";
import { getServerSession } from "next-auth";

// #region COMPONENTS
import PaginationControls from "@/components/PaginationControls";
import TablePartner from "@/components/TablePartner";
import Link from "next/link";
// #endregion COMPONENTS

type PartnersPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
};

const PartnersPage = async (props: PartnersPageProps) => {
  const searchParams = await props.searchParams;
  const session = await getServerSession(authOptions);

  await connectMongo();

  const page = parseInt(searchParams.page ?? "1", 10);
  const limitOptions = [8, 20, 50, 100];
  const requestedLimit = parseInt(searchParams.limit ?? "8", 10);
  const limit = limitOptions.includes(requestedLimit) ? requestedLimit : 8;
  const allowedSortBy = [
    "partner_number",
    "name",
    "email",
    "phone",
    "created_at",
  ];
  const sortBy = allowedSortBy.includes(searchParams.sortBy ?? "")
    ? (searchParams.sortBy as (typeof allowedSortBy)[number])
    : "created_at";
  const sortOrder = searchParams.sortOrder
    ? searchParams.sortOrder === "desc"
      ? "desc"
      : "asc"
    : "desc";

  const { partners, meta, links } = await partnerService.findAll(
    { page, limit, sortBy, sortOrder },
    session,
    { withPagination: true, baseUrl: "/dashboard/partners" }
  );

  const { current_page, total_records } = meta;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex align-middle p-6 justify-between border-b border-gray-200">
        <header>
          <h1 className="text-3xl font-bold text-gray-800">Partners</h1>
        </header>
        <Link
          href="/dashboard/partners/create"
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Partner
        </Link>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <TablePartner
            partners={partners}
            sortBy={sortBy}
            sortOrder={sortOrder}
            page={page}
            limit={limit}
          />
        </div>
      </div>
      {meta && (
        <footer className="p-6 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing {current_page * limit - limit + 1}-
            {Math.min(current_page * limit, total_records)} of {total_records}
          </span>
          <PaginationControls
            limit={limit}
            prevPageUrl={links?.prev as string}
            nextPageUrl={links?.next as string}
          />
        </footer>
      )}
    </div>
  );
};

export default PartnersPage;
