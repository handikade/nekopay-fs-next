import Link from "next/link";
import PaginationLimitSelector from "./PaginationLimitSelector";

interface PaginationControlsProps {
  limit: number;
  prevPageUrl: string;
  nextPageUrl: string;
}

const PaginationControls = ({
  limit,
  prevPageUrl,
  nextPageUrl,
}: PaginationControlsProps) => {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium";
  const enabled =
    "bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const disabledCls = "bg-blue-200 text-white/70 cursor-not-allowed";

  const hasPrev = !!prevPageUrl;
  const hasNext = !!nextPageUrl;

  const prevLink = hasPrev ? (
    <Link href={prevPageUrl} className={`${base} ${enabled}`}>
      Previous
    </Link>
  ) : (
    <span className={`${base} ${disabledCls}`}>Previous</span>
  );

  const nextLink = hasNext ? (
    <Link href={nextPageUrl} className={`${base} ${enabled}`}>
      Next
    </Link>
  ) : (
    <span className={`${base} ${disabledCls}`}>Next</span>
  );

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <PaginationLimitSelector limit={limit}></PaginationLimitSelector>
      </div>
      {prevLink}
      {nextLink}
    </div>
  );
};

export default PaginationControls;
