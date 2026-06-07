interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (value: string) => void;
  disabled: boolean;
}

export default function SortDropdown({ selectedSort, onSortChange, disabled }: SortDropdownProps) {
  return (
    <select
      value={selectedSort}
      onChange={(e) => onSortChange(e.target.value)}
      disabled={disabled}
      className="bg-white dark:bg-gray-900 border border-black dark:border-gray-600 text-black dark:text-white text-sm px-3 py-2 outline-none focus:ring-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="">Sort By</option>
      <option value="price_asc">Price Low to High</option>
      <option value="price_desc">Price High to Low</option>
      <option value="latest">Latest</option>
    </select>
  );
}