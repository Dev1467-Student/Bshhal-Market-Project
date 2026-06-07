interface CategoryFilterProps {
  categories: any[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  setShowCategoryModal: (show: boolean) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  setShowCategoryModal,
}: CategoryFilterProps) {
  const displayedCategories = categories?.slice(0, 5);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">
          Categories
        </h2>
        {categories?.length > 5 && (
          <button
            onClick={() => setShowCategoryModal(true)}
            className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Browse All
          </button>
        )}
      </div>

      <ul className="space-y-1">
        {displayedCategories?.map((category) => (
          <li key={category.id}>
            <button
              className={[
                "w-full text-left text-sm flex justify-between items-center px-2 py-1.5 border transition-colors duration-150",
                selectedCategory === category.id
                  ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-medium"
                  : "border-transparent text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-gray-500 hover:text-black dark:hover:text-white",
              ].join(" ")}
              onClick={() =>
                setSelectedCategory(selectedCategory === category.id ? null : category.id)
              }
            >
              <span>{category.name}</span>
              <span className="text-xs opacity-60">({category.products_count})</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedCategory && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setSelectedCategory(null)}
            className="w-full text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white px-2 py-1 transition-colors"
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
}