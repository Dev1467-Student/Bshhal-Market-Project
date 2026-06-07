import ActiveFilters from "./ActiveFilters";
import SortDropdown from "./SortDropdown";

interface FilterToolbarProps {
  isFiltering: boolean;
  selectedCategory: string | null;
  filters: any;
  onClearCategory: () => void;
  selectedSort: string;
  onSortChange: (value: string) => void;
}

export default function FilterToolbar({
  isFiltering, selectedCategory, filters, onClearCategory, selectedSort, onSortChange,
}: FilterToolbarProps) {
  return (
    <div className="flex justify-between items-center mb-4 border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
      <ActiveFilters
        isFiltering={isFiltering}
        selectedCategory={selectedCategory}
        filters={filters}
        onClearCategory={onClearCategory}
      />
      <SortDropdown
        selectedSort={selectedSort}
        onSortChange={onSortChange}
        disabled={isFiltering}
      />
    </div>
  );
}