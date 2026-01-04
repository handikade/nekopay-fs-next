import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongo } from "@/lib/mongoose";
import partnerService from "@/modules/partner/service";
import { getServerSession } from "next-auth";

// #region COMPONENTS
import PaginationControls from "@/components/PaginationControls";
import TablePartner from "@/components/TablePartner";
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
  const sortOrder = searchParams.sortOrder === "desc" ? "desc" : "asc";

  const { partners, meta } = await partnerService.findAll(
    { page, limit, sortBy, sortOrder },
    session
  );
  const { current_page, total_pages, total_records } = meta;

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <header className="p-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Partners</h1>
      </header>
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
            totalPages={total_pages}
            currentPage={current_page}
            limit={limit}
          />
        </footer>
      )}
    </div>
  );
};

export default PartnersPage;
