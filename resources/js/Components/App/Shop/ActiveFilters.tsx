import { X } from "lucide-react";

interface ActiveFiltersProps {
  isFiltering: boolean;
  selectedCategory: string | null;
  filters: any;
  onClearCategory: () => void;
}

export default function ActiveFilters({
  isFiltering, selectedCategory, filters, onClearCategory,
}: ActiveFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      {isFiltering && (
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Filtering...
        </span>
      )}
      {selectedCategory && (
        <div className="flex items-center gap-1 border border-black dark:border-gray-600 bg-white dark:bg-gray-950 px-2 py-1 text-xs text-black dark:text-white">
          <span>
            {filters.categories?.find((c: any) => c.id === selectedCategory)?.name}
          </span>
          <button
            onClick={onClearCategory}
            className="ml-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Clear category filter"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}