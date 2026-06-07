interface PriceFilterProps {
  priceRange: [number, number];
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

export default function PriceFilter({ priceRange, handlePriceChange }: PriceFilterProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-3">
        Price Range
      </h2>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          max="10000"
          value={priceRange[0]}
          onChange={(e) => handlePriceChange(e, 0)}
          className="w-full bg-white dark:bg-gray-900 border border-black dark:border-gray-600 text-black dark:text-white text-sm px-3 py-2 outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
          placeholder="Min"
        />
        <span className="text-gray-500 dark:text-gray-400 text-sm shrink-0">to</span>
        <input
          type="number"
          min="0"
          max="10000"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(e, 1)}
          className="w-full bg-white dark:bg-gray-900 border border-black dark:border-gray-600 text-black dark:text-white text-sm px-3 py-2 outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
          placeholder="Max"
        />
      </div>
    </div>
  );
}