import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { PaginatedProducts } from "@/types";
import { Head, router } from "@inertiajs/react";
import ProductCard from "@/Components/ProductCard";
import Pagination from "@/Components/Pagination";
import { debounce } from "lodash";
import { Loader2, SlidersHorizontal } from "lucide-react";
import CategoryFilter from "@/Components/App/Shop/CategoryFilter";
import PriceFilter from "@/Components/App/Shop/PriceFilter";
import CategoryModal from "@/Components/App/Shop/CategoryModal";
import FilterToolbar from "@/Components/App/Shop/FilterToolbar";

interface ShopPageProps {
  products: PaginatedProducts;
  filters: any;
}

export default function Shop({ products, filters }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const applyFilters = useCallback(
    debounce((params: any) => {
      router.get(route("shop"), params, {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => setIsFiltering(false),
      });
    }, 600),
    []
  );

  useEffect(() => {
    setIsFiltering(true);
    applyFilters({
      category: selectedCategory,
      sort: selectedSort,
      price_min: priceRange[0],
      price_max: priceRange[1],
    });
  }, [selectedCategory, selectedSort, priceRange, applyFilters]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...priceRange] as [number, number];
    newValue[index] = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 10000);
    setPriceRange(newValue);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSort("");
    setPriceRange([0, 10000]);
  };

  return (
    <AppLayout>
      <Head title="Shop" />

      <div className="bg-white dark:bg-gray-950 px-4 py-12 md:px-8 lg:px-16">
        {/* Page header */}
        <header className="mb-8 border-b border-black dark:border-gray-700 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
            Shop
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {products.meta.total}{" "}
            {products.meta.total === 1 ? "product" : "products"}
          </p>
        </header>

        {/* Mobile filters trigger */}
        <button
          type="button"
          onClick={() => setShowCategoryModal(true)}
          className="mb-6 inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-medium uppercase tracking-wide text-black dark:text-white transition-colors duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>

        {/* Two-column layout */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden w-64 shrink-0 border-r border-black dark:border-gray-700 pr-8 lg:block">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
              FILTERS
            </h2>
            <CategoryFilter
              categories={filters.categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setShowCategoryModal={setShowCategoryModal}
            />
            <div className="my-6 border-t border-gray-200 dark:border-gray-800" />
            <PriceFilter
              priceRange={priceRange}
              handlePriceChange={handlePriceChange}
            />
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            <FilterToolbar
              isFiltering={isFiltering}
              selectedCategory={selectedCategory}
              filters={filters}
              onClearCategory={() => setSelectedCategory(null)}
              selectedSort={selectedSort}
              onSortChange={(value) => setSelectedSort(value)}
            />

            {products.data.length > 0 ? (
              <>
                <div className="relative">
                  {isFiltering && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-gray-950/60">
                      <Loader2 className="h-8 w-8 animate-spin text-black dark:text-white" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-px bg-black dark:bg-gray-700 sm:grid-cols-2 lg:grid-cols-3">
                    {products.data.map((product) => (
                      <div key={product.id} className="bg-white dark:bg-gray-950">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
                <Pagination
                  links={products.links}
                  currentPage={products.meta.current_page}
                  lastPage={products.meta.last_page}
                  className="mt-8"
                />
              </>
            ) : (
              <div className="py-24 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                  NO PRODUCTS FOUND
                </p>
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                  Try adjusting your filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 border border-black dark:border-gray-600 px-6 py-2 text-sm uppercase tracking-wide text-black dark:text-white transition-colors duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CategoryModal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        categories={filters.categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={categorySearch}
        setSearchTerm={setCategorySearch}
      />
    </AppLayout>
  );
}