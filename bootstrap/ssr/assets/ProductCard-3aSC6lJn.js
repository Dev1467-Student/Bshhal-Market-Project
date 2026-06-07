import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { C as CurrencyFormatter } from "./CurrencyFormatter-Bo-PTyIu.js";
import { useForm, Link } from "@inertiajs/react";
import { Eye, ShoppingBag } from "lucide-react";
const variantClasses$1 = {
  solid: "border border-black bg-black text-white hover:bg-white hover:text-black",
  outline: "border border-black bg-white text-black hover:bg-black hover:text-white",
  muted: "border border-gray-300 bg-white text-gray-600 hover:border-black hover:bg-black hover:text-white"
};
function Badge({
  variant = "outline",
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: [
        "inline-flex items-center px-2 py-0.5 text-xs font-medium uppercase tracking-wide transition-colors duration-150",
        variantClasses$1[variant],
        className
      ].join(" "),
      ...props,
      children
    }
  );
}
const variantClasses = {
  solid: "border border-black bg-black text-white hover:bg-white hover:text-black",
  outline: "border border-black bg-white text-black hover:bg-black hover:text-white",
  ghost: "border border-transparent bg-transparent text-black hover:border-black hover:bg-black hover:text-white"
};
const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base"
};
const Button = forwardRef(
  ({
    variant = "solid",
    size = "md",
    fullWidth = false,
    className = "",
    disabled,
    type = "button",
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type,
        disabled,
        className: [
          "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-wide transition-colors duration-150",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
          "disabled:pointer-events-none disabled:opacity-40",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? "w-full" : "",
          className
        ].filter(Boolean).join(" "),
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";
function ProductCard({
  product,
  showVendor = true,
  showDescription = true,
  className = ""
}) {
  const form = useForm({
    option_ids: {},
    quantity: 1
  });
  const addToCart = () => {
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: [
        "group flex flex-col border border-black bg-white transition-colors duration-150 hover:bg-black hover:text-white",
        className
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxs("figure", { className: "relative aspect-[4/3] overflow-hidden border-b border-black bg-white", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("product.show", product.slug),
              className: "block h-full w-full",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: product.image,
                  alt: product.title,
                  className: "h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("product.show", product.slug),
                className: "inline-flex items-center justify-center border border-black bg-white p-2 text-black transition-colors duration-150 hover:bg-black hover:text-white",
                "aria-label": `View ${product.title}`,
                children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: addToCart,
                disabled: form.processing,
                className: "inline-flex items-center justify-center border border-black bg-white p-2 text-black transition-colors duration-150 hover:bg-black hover:text-white disabled:opacity-40",
                "aria-label": `Add ${product.title} to cart`,
                children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(Link, { href: route("product.byDepartment", product.department.slug), children: /* @__PURE__ */ jsx(Badge, { variant: "muted", children: product.department.name }) }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: product.category.name })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold leading-snug", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("product.show", product.slug),
              className: "transition-colors duration-150 group-hover:text-white",
              children: product.title
            }
          ) }),
          showDescription && /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm text-gray-600 transition-colors duration-150 group-hover:text-gray-300", children: product.short_description || product.description || "Quality product from our curated marketplace." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-end justify-between gap-3 pt-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: /* @__PURE__ */ jsx(CurrencyFormatter, { amount: product.price }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addToCart,
                disabled: form.processing,
                className: "group-hover:border-white group-hover:bg-white group-hover:text-black",
                children: "Add"
              }
            )
          ] }),
          showVendor && product.user.store_name && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 transition-colors duration-150 group-hover:text-gray-300", children: [
            "Sold by",
            " ",
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("vendor.profile", product.user.store_name),
                className: "font-medium underline underline-offset-2 transition-colors duration-150 hover:text-white group-hover:text-white",
                children: product.user.name
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
