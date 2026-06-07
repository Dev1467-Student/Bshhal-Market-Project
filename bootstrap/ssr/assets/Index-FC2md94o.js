import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { useForm, router, Link, Head } from "@inertiajs/react";
import { P as ProductRoute } from "./helpers-B7gCMt1w.js";
import { T as TextInput } from "./TextInput-BvLRji1h.js";
import { C as CurrencyFormatter } from "./CurrencyFormatter-Bo-PTyIu.js";
import { debounce } from "lodash";
import { P as PrimaryButton } from "./PrimaryButton-Da-R3KJE.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B67XRIWq.js";
import { CreditCardIcon } from "@heroicons/react/24/outline";
function CartItem({ item }) {
  const deleteForm = useForm({
    option_ids: item.option_ids
  });
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(item.quantity);
  const onDeleteClick = () => {
    deleteForm.delete(route("cart.destroy", item.product_id), {
      preserveScroll: true
    });
  };
  const debouncedUpdateQuantity = useCallback(
    debounce((newQty) => {
      router.put(
        route("cart.update", item.product_id),
        {
          quantity: newQty,
          option_ids: item.option_ids
        },
        {
          preserveScroll: true,
          onError: (errors) => {
            if (errors.quantity) {
              setError(Object.values(errors.quantity)[0]);
            }
          }
        }
      );
    }, 700),
    // Wait 700ms after user stops changing
    []
  );
  const handleQuantityChange = (e) => {
    const newQty = Number(e.target.value);
    setError("");
    setQuantity(newQty);
    debouncedUpdateQuantity(newQty);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex flex-col md:flex-row items-start gap-6 p-6 w-full bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition",
      children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: ProductRoute(item),
            className: "w-full md:w-32 h-32 flex justify-center items-center bg-gray-50 border rounded-lg overflow-hidden",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image,
                alt: item.title,
                className: "max-w-full max-h-full object-contain transition-transform duration-200 hover:scale-105"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between flex-1 w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold text-gray-900 hover:underline", children: /* @__PURE__ */ jsx(Link, { href: ProductRoute(item), children: item.title }) }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 space-y-1", children: item.options.map((option) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                option.type.name,
                ":"
              ] }),
              "  ",
              /* @__PURE__ */ jsx("span", { className: "", children: option.name })
            ] }, option.id)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mt-5 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Qty:" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: error ? "tooltip tooltip-open tooltip-error" : "",
                  "data-tip": error,
                  children: /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "number",
                      defaultValue: quantity,
                      onChange: handleQuantityChange,
                      className: "input-sm w-16"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onDeleteClick(),
                  className: "btn btn-sm btn-ghost text-red-500",
                  children: "Delete"
                }
              ),
              /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-ghost text-purple-600", children: "Save for Later" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-gray-800 min-w-max", children: /* @__PURE__ */ jsx(CurrencyFormatter, { amount: item.price * item.quantity }) })
          ] })
        ] })
      ]
    },
    item.id
  ) });
}
function Index({
  csrf_token,
  cartItems,
  totalQuantity,
  totalPrice
}) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Your Cart" }),
    /* @__PURE__ */ jsxs("div", { className: "container max-auto p-8 flex flex-col lg:flex-row gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "card flex-1 bg-white dark:bg-gray-800 order-2 lg:order-1", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Shopping Cart" }),
        /* @__PURE__ */ jsxs("div", { className: "my-4", children: [
          Object.keys(cartItems).length === 0 && /* @__PURE__ */ jsx("div", { className: "py-2 text-gray-500 text-center", children: "You don't have any items yet." }),
          Object.values(cartItems).map((cartItem) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-gray-300 mb-4", children: [
              /* @__PURE__ */ jsx(Link, { href: "/", className: "underline", children: cartItem.user.name }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("form", { action: route("cart.checkout"), method: "post", children: [
                /* @__PURE__ */ jsx("input", { type: "hidden", name: "_token", value: csrf_token }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "hidden",
                    name: "vendor_id",
                    value: cartItem.user.id
                  }
                ),
                /* @__PURE__ */ jsxs("button", { className: "btn btn-sm btn-ghost", children: [
                  /* @__PURE__ */ jsx(CreditCardIcon, { className: "size-6" }),
                  "Pay Only for this seller"
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 w-full pb-4 border-b border-gray-300 mb-4", children: cartItem.items.map((item) => /* @__PURE__ */ jsx(CartItem, { item }, item.id)) }) }, cartItem.user.id)
          ] }, cartItem.user.id))
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "card bg-white dark:bg-gray-800 lg:min-w-[260px] order-1 lg:order-2", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Subtotal (",
          totalQuantity,
          " items):  "
        ] }),
        /* @__PURE__ */ jsx(CurrencyFormatter, { amount: totalPrice }),
        /* @__PURE__ */ jsxs("form", { action: route("cart.checkout"), method: "post", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "_token", value: csrf_token }),
          /* @__PURE__ */ jsxs(PrimaryButton, { className: "rounded-full", children: [
            /* @__PURE__ */ jsx(CreditCardIcon, { className: "size-6 pr-2" }),
            "Proceed to checkout"
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Index as default
};
