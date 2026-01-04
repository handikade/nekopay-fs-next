import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

export type LabelSortProps = {
  isActive: boolean;
  direction: "asc" | "desc";
  label: string;
  isSortable: boolean;
  href?: string;
};

const LabelSort = ({
  isActive,
  direction,
  label,
  isSortable,
  href,
}: LabelSortProps) => {
  const ariaLabel = `${label}${
    isSortable ? ", sortable" : ""
  }${isActive ? `, sorted ${direction === "asc" ? "ascending" : "descending"}` : ""}`;
  const SortIcon = !isSortable
    ? null
    : isActive
      ? direction === "asc"
        ? ChevronUpIcon
        : ChevronDownIcon
      : ChevronUpDownIcon;

  const className = `inline-flex items-center gap-1 text-left text-xs font-medium uppercase ${
    isActive ? "text-blue-500" : "text-gray-500"
  }`;
  const content = (
    <>
      <span>{label}</span>
      {SortIcon ? (
        <SortIcon className="h-3.5 w-3.5 text-current" aria-hidden="true" />
      ) : null}
    </>
  );

  if (!isSortable) {
    return (
      <span className={`${className} cursor-default opacity-50`} aria-label={ariaLabel}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={href ?? "#"}
      className={`${className} hover:text-gray-700`}
      aria-label={ariaLabel}
    >
      {content}
    </a>
  );
};

export default LabelSort;
