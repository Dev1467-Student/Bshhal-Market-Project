import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B67XRIWq.js";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import "react";
import "./CurrencyFormatter-Bo-PTyIu.js";
import "./helpers-B7gCMt1w.js";
function Failure() {
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Payment Failed" }),
    /* @__PURE__ */ jsxs("div", { className: "w-[480px] mx-auto py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-red-600", children: /* @__PURE__ */ jsx(XCircleIcon, { className: "size-24" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold mt-4", children: "Payment Failed" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2 text-center", children: "Something went wrong during your payment process. Your payment was not completed." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "What you can do" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300", children: [
          /* @__PURE__ */ jsx("li", { children: "Ensure your card details are correct." }),
          /* @__PURE__ */ jsx("li", { children: "Try using a different payment method." }),
          /* @__PURE__ */ jsx("li", { children: "Contact your bank if the issue persists." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-6", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("shop"),
              className: "btn bg-purple-800 hover:bg-purple-700 text-white rounded-full",
              children: "Back to Shop"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("dashboard"),
              className: "btn btn-outline rounded-full",
              children: "Go to Dashboard"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  Failure as default
};
