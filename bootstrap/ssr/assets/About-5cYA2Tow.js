import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppLayout } from "./AppLayout-CUsP7URF.js";
import { Head, Link } from "@inertiajs/react";
import "@heroicons/react/24/outline";
import "react";
function About() {
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "About" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white text-black", children: [
      /* @__PURE__ */ jsx("section", { className: "flex min-h-[40vh] w-full items-center justify-center border-b border-black px-4 py-16 md:px-8 lg:px-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-3xl flex-col items-center text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-5xl font-black uppercase tracking-tighter md:text-6xl", children: "About Us" }) }) }),
      /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-8 border-b border-black pb-3 text-xs font-bold uppercase tracking-widest", children: "Our Story" }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-gray max-w-none", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-gray-700 mb-6", children: "We believe in the power of craftsmanship and independent creativity. Founded with a simple mission to connect talented vendors with discerning customers, our platform brings together unique products you won't find anywhere else." }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-gray-700 mb-6", children: "Every item in our collection is carefully curated, ensuring quality, authenticity, and a story behind each purchase." }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-gray-700", children: "We're more than just an ecommerce store. We're a community of creators, entrepreneurs, and shoppers who value the extraordinary." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-t border-black bg-gray-50 px-4 py-16 md:px-8 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-12 text-center text-xs font-bold uppercase tracking-widest", children: "Our Values" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-3", children: [
          {
            title: "Quality First",
            description: "We never compromise on quality. Every product meets our high standards."
          },
          {
            title: "Support Local",
            description: "We empower independent vendors and small businesses to thrive."
          },
          {
            title: "Sustainable",
            description: "We prioritize products and practices that respect our planet."
          }
        ].map((value, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "border border-black bg-white p-8",
            children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-bold uppercase tracking-wide", children: value.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: value.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4 py-16 md:px-8 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-3xl flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold uppercase tracking-tight mb-6", children: "Ready to Explore?" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("shop"),
            className: "inline-flex items-center justify-center bg-black px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition-all duration-200 hover:bg-gray-900",
            children: "Shop Now"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  About as default
};
