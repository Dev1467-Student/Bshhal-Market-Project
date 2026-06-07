import { jsxs, jsx } from "react/jsx-runtime";
import { C as CurrencyFormatter } from "./CurrencyFormatter-Bo-PTyIu.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B67XRIWq.js";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import "react";
import "./helpers-B7gCMt1w.js";
function Success({ orders }) {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Payment Completed" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-10", children: [
        /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-24 h-24 text-green-500 mb-4" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-2", children: "Payment Successful" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-lg", children: "Thank you for your purchase! Below is your order summary." })
      ] }),
      orders.map((order) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-8",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold mb-4 text-gray-800 dark:text-white", children: [
              "Order #",
              order.id
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Seller" }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: "#",
                    className: "text-indigo-600 hover:underline dark:text-indigo-400",
                    children: order.vendorUser.store_name
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Items" }),
                /* @__PURE__ */ jsx("span", { children: order.orderItems.length })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Total" }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-800 dark:text-white", children: /* @__PURE__ */ jsx(CurrencyFormatter, { amount: order.total_price }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between gap-3", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "#",
                  className: "btn bg-purple-800 hover:bg-purple-700 text-white rounded-full",
                  children: "View Order Details"
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("dashboard"),
                  className: "w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm font-medium rounded-full text-gray-800 dark:text-white transition",
                  children: "Back to Home"
                }
              )
            ] })
          ]
        },
        order.id
      ))
    ] })
  ] });
}
export {
  Success as default
};
