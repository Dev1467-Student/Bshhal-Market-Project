import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { A as AppLayout } from "./AppLayout-CUsP7URF.js";
import { Link, router, Head } from "@inertiajs/react";
import { P as ProductCard } from "./ProductCard-3aSC6lJn.js";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Loader2 } from "lucide-react";
import { debounce } from "lodash";
import { FaTimes, FaSearch } from "react-icons/fa";
import "@heroicons/react/24/outline";
import "./CurrencyFormatter-Bo-PTyIu.js";
const pageButtonBase = "inline-flex min-w-10 items-center justify-center border border-black px-3 py-2 text-sm font-medium transition-colors duration-150";
const pageButtonInactive = "bg-white text-black hover:bg-black hover:text-white";
const pageButtonActive = "bg-black text-white pointer-events-none";
function Pagination({
  links,
  currentPage,
  lastPage,
  className = ""
}) {
  if (lastPage <= 1) return null;
  const previousLink = links.find(
    (link) => link.label.toLowerCase().includes("previous")
  );
  const nextLink = links.find(
    (link) => link.label.toLowerCase().includes("next")
  );
  const pageLinks = links.filter(
    (link) => link.url && !link.label.toLowerCase().includes("previous") && !link.label.toLowerCase().includes("next")
  );
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: ["flex flex-col gap-4 border-t border-black pt-6", className].join(
        " "
      ),
      "aria-label": "Pagination",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between sm:hidden", children: [
          currentPage > 1 && (previousLink == null ? void 0 : previousLink.url) ? /* @__PURE__ */ jsxs(
            Link,
            {
              href: previousLink.url,
              preserveState: true,
              className: [
                pageButtonBase,
                pageButtonInactive,
                "gap-1 uppercase tracking-wide"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
                "Prev"
              ]
            }
          ) : /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium uppercase tracking-wide text-gray-600", children: [
            "Page ",
            currentPage,
            " of ",
            lastPage
          ] }),
          currentPage < lastPage && (nextLink == null ? void 0 : nextLink.url) ? /* @__PURE__ */ jsxs(
            Link,
            {
              href: nextLink.url,
              preserveState: true,
              className: [
                pageButtonBase,
                pageButtonInactive,
                "gap-1 uppercase tracking-wide"
              ].join(" "),
              children: [
                "Next",
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
              ]
            }
          ) : /* @__PURE__ */ jsx("span", {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs font-medium uppercase tracking-wide text-gray-600", children: [
            "Page ",
            currentPage,
            " of ",
            lastPage
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex -space-x-px", children: [
            (previousLink == null ? void 0 : previousLink.url) && /* @__PURE__ */ jsx(
              Link,
              {
                href: previousLink.url,
                preserveState: true,
                className: [pageButtonBase, pageButtonInactive].join(" "),
                "aria-label": "Previous page",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
              }
            ),
            pageLinks.map((link, index) => /* @__PURE__ */ jsx(
              Link,
              {
                href: link.url,
                preserveState: true,
                className: [
                  pageButtonBase,
                  link.active ? pageButtonActive : pageButtonInactive
                ].join(" "),
                "aria-current": link.active ? "page" : void 0,
                dangerouslySetInnerHTML: { __html: link.label }
              },
              `${link.label}-${index}`
            )),
            (nextLink == null ? void 0 : nextLink.url) && /* @__PURE__ */ jsx(
              Link,
              {
                href: nextLink.url,
                preserveState: true,
                className: [pageButtonBase, pageButtonInactive].join(" "),
                "aria-label": "Next page",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  setShowCategoryModal
}) {
  const displayedCategories = categories == null ? void 0 : categories.slice(0, 5);
  return /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-md font-semibold", children: "Categories" }),
      (categories == null ? void 0 : categories.length) > 5 && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowCategoryModal(true),
          className: "text-sm text-blue-500",
          children: "Browse All"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: displayedCategories == null ? void 0 : displayedCategories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `w-full text-left text-sm flex justify-between items-center p-1 ${selectedCategory === category.id ? "font-semibold text-primary" : "text-gray-700"}`,
        onClick: () => setSelectedCategory(
          selectedCategory === category.id ? null : category.id
        ),
        children: /* @__PURE__ */ jsxs("span", { children: [
          category.name,
          " (",
          category.products_count,
          ")"
        ] })
      }
    ) }, category.id)) }),
    selectedCategory && /* @__PURE__ */ jsx("div", { className: "mt-3 pt-2 border-t border-gray-100", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setSelectedCategory(null),
        className: "w-full text-left text-sm text-blue-500 font-medium p-1 hover:bg-gray-50 rounded",
        children: "Show All Products"
      }
    ) })
  ] });
}
function PriceFilter({
  priceRange,
  handlePriceChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-md font-semibold mb-3", children: "Price Range" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          min: "0",
          max: "10000",
          value: priceRange[0],
          onChange: (e) => handlePriceChange(e, 0),
          className: "w-full p-2 border rounded text-sm",
          placeholder: "Min"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "to" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          min: "0",
          max: "10000",
          value: priceRange[1],
          onChange: (e) => handlePriceChange(e, 1),
          className: "w-full p-2 border rounded text-sm",
          placeholder: "Max"
        }
      )
    ] }) })
  ] });
}
function CategoryModal({
  show,
  onClose,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm
}) {
  const filteredCategories = categories == null ? void 0 : categories.filter(
    (category) => category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!show) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-4 border-b", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Select Category" }),
        /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-gray-500", children: /* @__PURE__ */ jsx(FaTimes, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative mt-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search categories...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full p-2 pl-8 border rounded text-sm"
          }
        ),
        /* @__PURE__ */ jsx(FaSearch, { className: "absolute left-2 top-3 text-gray-400" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-y-auto flex-1", children: /* @__PURE__ */ jsx("ul", { className: "divide-y", children: filteredCategories == null ? void 0 : filteredCategories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: `w-full text-left p-3 text-sm ${selectedCategory === category.id ? "bg-blue-50 text-primary font-medium" : "text-gray-700"}`,
        onClick: () => {
          setSelectedCategory(category.id);
          onClose();
        },
        children: [
          category.name,
          " (",
          category.products_count,
          ")"
        ]
      }
    ) }, category.id)) }) }),
    /* @__PURE__ */ jsx("div", { className: "p-4 border-t", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setSelectedCategory(null);
          onClose();
        },
        className: "w-full py-2 text-sm text-blue-500",
        children: "Clear Selection"
      }
    ) })
  ] }) });
}
function ActiveFilters({
  isFiltering,
  selectedCategory,
  filters,
  onClearCategory
}) {
  var _a, _b;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
    isFiltering && /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "Applying filters..." }),
    selectedCategory && /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-gray-100 rounded px-2 py-1 text-sm", children: [
      "Category:",
      " ",
      (_b = (_a = filters.categories) == null ? void 0 : _a.find((c) => c.id === selectedCategory)) == null ? void 0 : _b.name,
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClearCategory,
          className: "ml-1 text-gray-500 hover:text-gray-700",
          children: /* @__PURE__ */ jsx(FaTimes, { size: 12 })
        }
      )
    ] })
  ] });
}
function SortDropdown({
  selectedSort,
  onSortChange,
  disabled
}) {
  return /* @__PURE__ */ jsxs(
    "select",
    {
      value: selectedSort,
      onChange: (e) => onSortChange(e.target.value),
      className: "p-2 rounded border text-sm",
      disabled,
      children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "Sort By" }),
        /* @__PURE__ */ jsx("option", { value: "price_asc", children: "Price Low to High" }),
        /* @__PURE__ */ jsx("option", { value: "price_desc", children: "Price High to Low" }),
        /* @__PURE__ */ jsx("option", { value: "latest", children: "Latest" })
      ]
    }
  );
}
function FilterToolbar({
  isFiltering,
  selectedCategory,
  filters,
  onClearCategory,
  selectedSort,
  onSortChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4 bg-white p-3 rounded shadow", children: [
    /* @__PURE__ */ jsx(
      ActiveFilters,
      {
        isFiltering,
        selectedCategory,
        filters,
        onClearCategory
      }
    ),
    /* @__PURE__ */ jsx(
      SortDropdown,
      {
        selectedSort,
        onSortChange,
        disabled: isFiltering
      }
    )
  ] });
}
function Shop({ products, filters }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1e4]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const applyFilters = useCallback(
    debounce((params) => {
      router.get(route("shop"), params, {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => setIsFiltering(false)
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
      price_max: priceRange[1]
    });
  }, [selectedCategory, selectedSort, priceRange, applyFilters]);
  const handlePriceChange = (e, index) => {
    const newValue = [...priceRange];
    const value = parseInt(e.target.value) || 0;
    newValue[index] = Math.min(Math.max(value, 0), 1e4);
    setPriceRange(newValue);
  };
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSort("");
    setPriceRange([0, 1e4]);
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Shop" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 py-12 md:px-8 lg:px-16", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-8 border-b border-black pb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black uppercase tracking-tighter text-black", children: "Shop" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-500", children: [
          products.meta.total,
          " ",
          products.meta.total === 1 ? "product" : "products"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowCategoryModal(true),
          className: "mb-6 inline-flex items-center gap-2 border border-black px-4 py-2 text-sm font-medium uppercase tracking-wide text-black transition-all duration-200 hover:bg-black hover:text-white lg:hidden",
          children: [
            /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            "Filters"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
        /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 shrink-0 border-r border-black pr-8 lg:block", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-xs font-bold uppercase tracking-widest text-black", children: "FILTERS" }),
          /* @__PURE__ */ jsx(
            CategoryFilter,
            {
              categories: filters.categories,
              selectedCategory,
              setSelectedCategory,
              setShowCategoryModal
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "my-6 border-t border-gray-200" }),
          /* @__PURE__ */ jsx(
            PriceFilter,
            {
              priceRange,
              handlePriceChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx(
            FilterToolbar,
            {
              isFiltering,
              selectedCategory,
              filters,
              onClearCategory: () => setSelectedCategory(null),
              selectedSort,
              onSortChange: (value) => setSelectedSort(value)
            }
          ),
          products.data.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              isFiltering && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-white/60", children: /* @__PURE__ */ jsx(
                Loader2,
                {
                  className: "h-8 w-8 animate-spin text-black",
                  "aria-label": "Loading products"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-px bg-black sm:grid-cols-2 lg:grid-cols-3", children: products.data.map((product) => /* @__PURE__ */ jsx("div", { className: "bg-white", children: /* @__PURE__ */ jsx(ProductCard, { product }) }, product.id)) })
            ] }),
            /* @__PURE__ */ jsx(
              Pagination,
              {
                links: products.links,
                currentPage: products.meta.current_page,
                lastPage: products.meta.last_page,
                className: "mt-8"
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "py-24 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-widest text-black", children: "NO PRODUCTS FOUND" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-400", children: "Try adjusting your filters to find what you're looking for." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: clearFilters,
                className: "mt-6 border border-black px-6 py-2 text-sm uppercase tracking-wide text-black transition-all duration-200 hover:bg-black hover:text-white",
                children: "Clear filters"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      CategoryModal,
      {
        show: showCategoryModal,
        onClose: () => setShowCategoryModal(false),
        categories: filters.categories,
        selectedCategory,
        setSelectedCategory,
        searchTerm: categorySearch,
        setSearchTerm: setCategorySearch
      }
    )
  ] });
}
export {
  Shop as default
};
