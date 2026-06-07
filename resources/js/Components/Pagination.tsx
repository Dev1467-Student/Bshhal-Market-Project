import { ProductPaginationProps } from "@/types";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps extends ProductPaginationProps {
  className?: string;
}

const pageButtonBase =
  "inline-flex min-w-10 items-center justify-center border px-3 py-2 text-sm font-medium transition-colors duration-150";

const pageButtonInactive =
  "border-black dark:border-gray-600 bg-white dark:bg-gray-950 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black";

const pageButtonActive =
  "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black pointer-events-none";

export default function Pagination({ links, currentPage, lastPage, className = "" }: PaginationProps) {
  if (lastPage <= 1) return null;

  const previousLink = links.find((l) => l.label.toLowerCase().includes("previous"));
  const nextLink = links.find((l) => l.label.toLowerCase().includes("next"));
  const pageLinks = links.filter(
    (l) => l.url && !l.label.toLowerCase().includes("previous") && !l.label.toLowerCase().includes("next")
  );

  return (
    <nav
      className={["flex flex-col gap-4 border-t border-black dark:border-gray-700 pt-6", className].join(" ")}
      aria-label="Pagination"
    >
      {/* Mobile */}
      <div className="flex items-center justify-between sm:hidden">
        {currentPage > 1 && previousLink?.url ? (
          <Link href={previousLink.url} preserveState className={[pageButtonBase, pageButtonInactive, "gap-1 uppercase tracking-wide"].join(" ")}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Link>
        ) : <span />}
        <span className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
          Page {currentPage} of {lastPage}
        </span>
        {currentPage < lastPage && nextLink?.url ? (
          <Link href={nextLink.url} preserveState className={[pageButtonBase, pageButtonInactive, "gap-1 uppercase tracking-wide"].join(" ")}>
            Next <ChevronRight className="h-4 w-4" />
          </Link>
        ) : <span />}
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
          Page {currentPage} of {lastPage}
        </p>
        <div className="inline-flex -space-x-px">
          {previousLink?.url && (
            <Link href={previousLink.url} preserveState className={[pageButtonBase, pageButtonInactive].join(" ")} aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          )}
          {pageLinks.map((link, i) => (
            <Link
              key={`${link.label}-${i}`}
              href={link.url!}
              preserveState
              className={[pageButtonBase, link.active ? pageButtonActive : pageButtonInactive].join(" ")}
              aria-current={link.active ? "page" : undefined}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
          {nextLink?.url && (
            <Link href={nextLink.url} preserveState className={[pageButtonBase, pageButtonInactive].join(" ")} aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}