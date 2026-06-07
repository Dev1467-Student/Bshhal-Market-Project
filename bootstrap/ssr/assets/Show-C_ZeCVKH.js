import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { C as CurrencyFormatter } from "./CurrencyFormatter-Bo-PTyIu.js";
import { P as ProductCard } from "./ProductCard-3aSC6lJn.js";
import { A as AppLayout } from "./AppLayout-CUsP7URF.js";
import { a as arraysAreEqual } from "./helpers-B7gCMt1w.js";
import { useForm, usePage, router, Head, Link } from "@inertiajs/react";
import { ShoppingBag } from "lucide-react";
import "@heroicons/react/24/outline";
function Carousel({ images }) {
  var _a;
  const [activeIndex, setActiveIndex] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row h-full gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:overflow-y-auto py-2 px-1 md:px-0", children: images.map((image, index) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveIndex(index),
        className: `flex-shrink-0 w-14 h-14 border-2 rounded-md overflow-hidden ${index === activeIndex ? "border-black" : "border-gray-200"} hover:border-black transition-colors duration-150`,
        "aria-label": `View image ${index + 1}`,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image.thumb,
            alt: "",
            className: "w-full h-full object-cover"
          }
        )
      },
      image.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 bg-white border border-black rounded-lg overflow-hidden min-h-[300px] md:min-h-0", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: ((_a = images[activeIndex]) == null ? void 0 : _a.large) || "",
        alt: "",
        className: "w-full h-full object-contain p-4"
      }
    ) })
  ] });
}
function Show({
  appName,
  product,
  relatedProducts,
  variationOptions
}) {
  var _a;
  const form = useForm({
    option_ids: {},
    quantity: 1,
    price: null
  });
  const { url } = usePage();
  const [selectedOptions, setSelectedOptions] = useState({});
  const images = useMemo(() => {
    for (let typeId in selectedOptions) {
      const option = selectedOptions[typeId];
      if (option.images.length > 0) return option.images;
    }
    return product.images;
  }, [product, selectedOptions]);
  const computedProduct = useMemo(() => {
    const selectedOptionIds = Object.values(selectedOptions).map((option) => option.id).sort();
    for (let variation of product.variations) {
      const optionIds = variation.variation_type_option_ids.sort();
      if (arraysAreEqual(selectedOptionIds, optionIds)) {
        return {
          price: variation.price,
          quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity
        };
      }
    }
    return {
      price: product.price,
      quantity: product.quantity
    };
  }, [product, selectedOptions]);
  useEffect(() => {
    for (let type of product.variationTypes) {
      const selectedOptionId = variationOptions[type.id];
      chooseOption(
        type.id,
        type.options.find((op) => op.id == selectedOptionId) || type.options[0],
        false
      );
    }
  }, []);
  const getOptionIdsMap = (newOption) => {
    return Object.fromEntries(
      Object.entries(newOption).map(([a, b]) => [a, b.id])
    );
  };
  const chooseOption = (typeId, option, updateRouter = true) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = {
        ...prevSelectedOptions,
        [typeId]: option
      };
      if (updateRouter) {
        router.get(
          url,
          {
            options: getOptionIdsMap(newOptions)
          },
          {
            preserveScroll: true,
            preserveState: true
          }
        );
      }
      return newOptions;
    });
  };
  const handleQuantitySelect = (e) => {
    const value = parseInt(e.target.value);
    form.setData("quantity", value);
  };
  const addToCart = () => {
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err) => {
        console.log(err);
      }
    });
  };
  useEffect(() => {
    const idsMap = Object.fromEntries(
      Object.entries(selectedOptions).map(
        ([typeId, option]) => [typeId, option.id]
      )
    );
    form.setData("option_ids", idsMap);
  }, [selectedOptions]);
  const renderProductVariationTypes = () => {
    return product.variationTypes.map((type, index) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col mb-6", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium uppercase tracking-wide mb-3 text-gray-700", children: type.name }),
      type.type === "Image" && /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: type.options.map((option) => {
        var _a2, _b;
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => chooseOption(type.id, option),
            className: `cursor-pointer border-2 rounded-md p-1 transition-colors duration-150 ${((_a2 = selectedOptions[type.id]) == null ? void 0 : _a2.id) === option.id ? "border-black" : "border-gray-200 hover:border-gray-400"}`,
            "aria-label": `Select ${option.name}`,
            children: ((_b = option.images) == null ? void 0 : _b.length) > 0 ? /* @__PURE__ */ jsx(
              "img",
              {
                src: option.images[0].thumb,
                alt: option.name,
                className: "w-12 h-12 object-cover rounded"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 flex items-center justify-center text-sm font-medium text-gray-500 bg-gray-50 rounded", children: option.name.substring(0, 2).toUpperCase() })
          },
          option.id
        );
      }) }),
      type.type === "Radio" && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: type.options.map((option) => {
        var _a2, _b;
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => chooseOption(type.id, option),
            className: `px-4 py-2 border text-sm font-medium uppercase tracking-wide transition-colors duration-150 ${((_a2 = selectedOptions[type.id]) == null ? void 0 : _a2.id) === option.id ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black"}`,
            "aria-pressed": ((_b = selectedOptions[type.id]) == null ? void 0 : _b.id) === option.id,
            children: option.name
          },
          option.id
        );
      }) })
    ] }, type.id));
  };
  const renderAddToCartButton = () => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "quantity", className: "text-sm font-medium uppercase tracking-wide text-gray-700", children: "Qty" }),
      /* @__PURE__ */ jsx(
        "select",
        {
          id: "quantity",
          value: form.data.quantity,
          onChange: handleQuantitySelect,
          className: "text-sm px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black",
          children: Array.from(
            { length: Math.min(computedProduct.quantity, 20) },
            (_, i) => i + 1
          ).map((qty) => /* @__PURE__ */ jsx("option", { value: qty, children: qty }, qty))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: addToCart,
        disabled: form.processing,
        className: "w-full bg-black text-white text-sm font-medium px-4 py-3 uppercase tracking-wide transition-colors duration-150 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
        children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4" }),
          "Add to Cart"
        ]
      }
    )
  ] });
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: product.title }),
      /* @__PURE__ */ jsx("meta", { name: "title", content: product.meta_title || product.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: product.meta_description }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: route("product.show", product.slug) }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: product.title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: product.meta_description }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: (_a = images[0]) == null ? void 0 : _a.small }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: route("product.show", product.slug) }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "product" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: appName })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 md:py-12", children: [
      /* @__PURE__ */ jsx("nav", { className: "mb-8 text-sm text-gray-500", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("home"), className: "hover:text-black transition-colors", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("product.byDepartment", product.department.slug),
            className: "hover:text-black transition-colors",
            children: product.department.name
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-black font-medium", children: product.title })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-12 grid-cols-1 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-8 lg:self-start", children: /* @__PURE__ */ jsx(Carousel, { images }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 pb-6 mb-6", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-2", children: product.title }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
              "by",
              " ",
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("vendor.profile", product.user.store_name),
                  className: "font-medium underline underline-offset-2 hover:text-black transition-colors",
                  children: product.user.name
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold mb-8", children: /* @__PURE__ */ jsx(CurrencyFormatter, { amount: computedProduct.price }) }),
          computedProduct.quantity != void 0 && computedProduct.quantity < 10 && /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-gray-700 mb-6 bg-gray-50 border border-gray-200 px-4 py-3", children: [
            "Only ",
            computedProduct.quantity,
            " left in stock"
          ] }),
          product.variationTypes.length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-8", children: renderProductVariationTypes() }),
          /* @__PURE__ */ jsx("div", { className: "mb-12", children: renderAddToCartButton() }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4 uppercase tracking-wide", children: "About the Item" }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "prose prose-gray max-w-none text-gray-700",
                dangerouslySetInnerHTML: { __html: product.description }
              }
            )
          ] })
        ] })
      ] }),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-16 md:mt-24 border-t border-black pt-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-8 uppercase tracking-wide text-center", children: "You May Also Like" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: relatedProducts.map((relatedProduct) => /* @__PURE__ */ jsx(
          ProductCard,
          {
            product: relatedProduct,
            showVendor: false,
            showDescription: false
          },
          relatedProduct.id
        )) })
      ] })
    ] })
  ] });
}
export {
  Show as default
};
