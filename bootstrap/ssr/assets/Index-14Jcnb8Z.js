import { jsxs, jsx } from "react/jsx-runtime";
import { P as ProductItem, a as Pagination } from "./Pagination-DDt-P1j8.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B67XRIWq.js";
import { Head } from "@inertiajs/react";
import "react";
import "react-icons/fa";
import "react-icons/ai";
import "lucide-react";
import "./CurrencyFormatter-Bo-PTyIu.js";
import "@heroicons/react/24/outline";
import "./helpers-B7gCMt1w.js";
function Index({
  appName,
  department,
  products
}) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: department.name }),
      /* @__PURE__ */ jsx("meta", { name: "title", content: department.meta_title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: department.meta_description }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "canonical",
          href: route("product.byDepartment", department.slug)
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: department.name }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: department.meta_description }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:url",
          content: route("product.byDepartment", department.slug)
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: appName })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx("div", { className: "hero bg-base-200 min-h-[120px]", children: /* @__PURE__ */ jsx("div", { className: "hero-content text-center", children: /* @__PURE__ */ jsx("div", { className: "max-w-lg", children: /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold", children: department.name }) }) }) }) }),
    products.data.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-16 px-8 text-center text-gray-300 text-3xl", children: "No products found" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 p-8", children: products.data.map((product) => /* @__PURE__ */ jsx(ProductItem, { product }, product.id)) }),
    /* @__PURE__ */ jsx(
      Pagination,
      {
        links: products.links,
        currentPage: products.meta.current_page,
        lastPage: products.meta.last_page
      }
    )
  ] });
}
export {
  Index as default
};
