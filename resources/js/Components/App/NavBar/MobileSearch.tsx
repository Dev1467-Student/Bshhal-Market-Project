import React, { useState, FormEventHandler } from "react";
import { Search, X } from "lucide-react";
import { usePage, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function MobileSearch() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { keyword } = usePage<PageProps>().props;

  const searchForm = useForm<{ keyword: string }>({
    keyword: keyword || "",
  });

  const { url } = usePage();

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    searchForm.get(url, {
      preserveScroll: true,
      preserveState: true,
    });
    setIsMobileSearchOpen(false);
  };

  return (
    <>
      <button
        className="lg:hidden border border-black p-1.5 text-black transition-all duration-200 hover:bg-black hover:text-white"
        onClick={() => setIsMobileSearchOpen((prev) => !prev)}
        aria-label="Toggle mobile search"
      >
        {isMobileSearchOpen
          ? <X className="h-4 w-4" />
          : <Search className="h-4 w-4" />
        }
      </button>

      {isMobileSearchOpen && (
        <form
          onSubmit={onSubmit}
          className="absolute top-16 left-0 right-0 z-40 border-b border-black bg-white px-4 py-3 flex items-center gap-2"
        >
          <input
            type="text"
            autoFocus
            value={searchForm.data.keyword}
            onChange={(e) => searchForm.setData("keyword", e.target.value)}
            className="flex-1 bg-white border border-black border-r-0 px-4 py-2 text-sm text-black outline-none focus:ring-0 rounded-none placeholder-gray-400"
            placeholder="Search products..."
          />
          <button
            type="submit"
            className="border border-black bg-black px-3 py-2 text-white transition-all duration-200 hover:bg-white hover:text-black"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      )}
    </>
  );
}