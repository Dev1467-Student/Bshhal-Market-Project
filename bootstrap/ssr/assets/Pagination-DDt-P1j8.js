import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import { FaCartPlus } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Eye } from "lucide-react";
import { C as CurrencyFormatter } from "./CurrencyFormatter-Bo-PTyIu.js";
function ProductItem({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };
  const form = useForm({
    option_ids: {},
    quantity: 1
  });
  const addToCart = () => {
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err) => console.log(err)
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group relative", children: [
    /* @__PURE__ */ jsxs("figure", { className: "relative group aspect-[4/3] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsx(Link, { href: route("product.show", product.slug), children: /* @__PURE__ */ jsx(
        "img",
        {
          src: product.image,
          alt: product.title,
          className: "w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleWishlist,
            title: "Wishlist",
            className: "bg-white p-2 rounded-full shadow hover:bg-rose-100",
            children: wishlisted ? /* @__PURE__ */ jsx(AiFillHeart, { className: "text-red-500 w-5 h-5" }) : /* @__PURE__ */ jsx(AiOutlineHeart, { className: "text-gray-600 w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: addToCart,
            title: "Add to Cart",
            className: "bg-white p-2 rounded-full shadow hover:bg-blue-100",
            children: /* @__PURE__ */ jsx(FaCartPlus, { className: "text-gray-600 w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("product.show", product.slug),
            title: "Quick View",
            className: "bg-white p-2 rounded-full shadow hover:bg-cyan-100",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsx(Eye, { className: "text-gray-600 w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-gray-800 hover:text-indigo-600", children: /* @__PURE__ */ jsx(Link, { href: route("product.show", product.slug), children: product.title }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-gray-500", children: [
        /* @__PURE__ */ jsx(Link, { href: route("product.byDepartment", product.department.slug), children: /* @__PURE__ */ jsx("span", { className: "bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full", children: product.department.name }) }),
        /* @__PURE__ */ jsx("span", { className: "bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-full", children: product.category.name })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 line-clamp-2", children: product.description || "High-quality product crafted with modern design for your needs." }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 pt-2", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-indigo-600", children: /* @__PURE__ */ jsx(CurrencyFormatter, { amount: product.price }) }) }),
      product.user.store_name && /* @__PURE__ */ jsxs("div", { className: "pt-1 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Sold by " }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("vendor.profile", product.user.store_name),
            className: "text-blue-600 hover:underline",
            children: product.user.name
          }
        )
      ] })
    ] })
  ] });
}
function Pagination({
  links,
  currentPage,
  lastPage
}) {
  var _a, _b;
  if (lastPage <= 1) return null;
  return /* @__PURE__ */ jsxs("nav", { className: "flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 justify-between sm:hidden", children: [
      currentPage > 1 && /* @__PURE__ */ jsx(
        Link,
        {
          href: ((_a = links.find((l) => l.label.toLowerCase().includes("previous"))) == null ? void 0 : _a.url) || "",
          preserveState: true,
          className: "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
          children: "Previous"
        }
      ),
      currentPage < lastPage && /* @__PURE__ */ jsx(
        Link,
        {
          href: ((_b = links.find((l) => l.label.toLowerCase().includes("next"))) == null ? void 0 : _b.url) || "",
          preserveState: true,
          className: "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "nav",
      {
        className: "isolate inline-flex -space-x-px rounded-md shadow-sm",
        "aria-label": "Pagination",
        children: links.map((link, index) => {
          if (!link.url) return null;
          return /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              preserveState: true,
              className: `relative inline-flex items-center px-4 py-2 text-sm font-medium ${link.active ? "z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"}`,
              dangerouslySetInnerHTML: { __html: link.label }
            },
            index
          );
        })
      }
    ) }) })
  ] });
}
export {
  ProductItem as P,
  Pagination as a
};
