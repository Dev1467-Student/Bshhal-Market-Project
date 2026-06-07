import { jsxs, jsx } from "react/jsx-runtime";
import { P as ProductCard } from "./ProductCard-3aSC6lJn.js";
import { A as AppLayout } from "./AppLayout-CUsP7URF.js";
import { Head, Link } from "@inertiajs/react";
import "react";
import "./CurrencyFormatter-Bo-PTyIu.js";
import "lucide-react";
import "@heroicons/react/24/outline";
function Home({
  products
}) {
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Home" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white text-black", children: [
      /* @__PURE__ */ jsx("section", { className: "flex min-h-[60vh] w-full items-center justify-center bg-black px-4 py-24 text-white md:px-8 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-4xl flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl font-black uppercase tracking-tighter md:text-7xl", children: "Discover What Moves You" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg font-light text-gray-300", children: "Curated products from independent vendors. Quality craftsmanship, delivered to your door." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col gap-4 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("shop"),
              className: "inline-flex items-center justify-center bg-white px-8 py-3 text-sm font-medium uppercase tracking-wide text-black transition-all duration-200 hover:bg-gray-100",
              children: "Shop Now"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("about"),
              className: "inline-flex items-center justify-center border border-white px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition-all duration-200 hover:bg-white hover:text-black",
              children: "Explore"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "px-4 py-16 md:px-8 lg:px-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-8 border-b border-black pb-3 text-xs font-bold uppercase tracking-widest", children: "FEATURED PRODUCTS" }),
        products.data.length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-20 text-center text-sm text-gray-500", children: "No products available" }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-px bg-black sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: products.data.map((product) => /* @__PURE__ */ jsx("div", { className: "bg-white", children: /* @__PURE__ */ jsx(ProductCard, { product }) }, product.id)) })
      ] })
    ] })
  ] });
}
export {
  Home as default
};
