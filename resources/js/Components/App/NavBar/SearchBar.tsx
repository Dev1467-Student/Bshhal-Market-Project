import React, { FormEventHandler } from "react";
import { Search } from "lucide-react";
import { usePage, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function SearchBar() {
  const { keyword, url } = usePage<PageProps>().props;

  const searchForm = useForm<{ keyword: string }>({
    keyword: keyword || "",
  });

  const { url: currentUrl } = usePage();

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    searchForm.get(currentUrl, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <div className="hidden lg:block w-64">
      <form onSubmit={onSubmit} className="flex">
        <input
          type="text"
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
    </div>
  );
}