import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B67XRIWq.js";
import { Head } from "@inertiajs/react";
import { P as ProductItem, a as Pagination } from "./Pagination-DDt-P1j8.js";
import "react";
import "@heroicons/react/24/outline";
import "./CurrencyFormatter-Bo-PTyIu.js";
import "./helpers-B7gCMt1w.js";
import "react-icons/fa";
import "react-icons/ai";
import "lucide-react";
function Profile({
  vendor,
  products
}) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: vendor.store_name + " Profile Page" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "hero min-h-[320px]",
        style: {
          backgroundImage: "url(https://20.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "hero-overlay bg-opacity-60" }),
          /* @__PURE__ */ jsx("div", { className: "hero-content text-neutral-content text-center", children: /* @__PURE__ */ jsx("div", { className: "max-w-md", children: /* @__PURE__ */ jsx("h1", { className: "mb-5 text-5xl font-bold", children: vendor.store_name }) }) })
        ]
      }
    ),
    products.data.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 p-8", children: products.data.map((product) => /* @__PURE__ */ jsx(ProductItem, { product }, product.id)) }),
      /* @__PURE__ */ jsx(
        Pagination,
        {
          links: products.links,
          currentPage: products.meta.current_page,
          lastPage: products.meta.last_page
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "bg-white p-8 text-center rounded shadow", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "No products found." }) })
  ] });
}
export {
  Profile as default
};
