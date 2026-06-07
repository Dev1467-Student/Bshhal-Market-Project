import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { P as PrimaryButton } from "./PrimaryButton-Da-R3KJE.js";
import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
import { M as Modal, S as SecondaryButton } from "./SecondaryButton-B05Cq_fG.js";
import { I as InputLabel } from "./InputLabel-BMFb3spV.js";
import { T as TextInput } from "./TextInput-BvLRji1h.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import "@headlessui/react";
function VendorDetails({ className = "" }) {
  var _a, _b, _c;
  const [showBecomeVendorConfirmation, setShowBecomeVendorConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const user = usePage().props.auth.user;
  const token = usePage().props.csrf_token;
  const { data, setData, errors, post, processing, recentlySuccessful } = useForm({
    store_name: ((_a = user.vendor) == null ? void 0 : _a.store_name) || user.name.toLowerCase().replace(/\s+/g, "-"),
    store_address: ((_b = user.vendor) == null ? void 0 : _b.store_address) || ""
  });
  const onStoreNameChange = (event) => {
    setData(
      "store_name",
      event.target.value.toLowerCase().replace(/\s+/g, "-")
    );
  };
  const becomeVendor = (event) => {
    event.preventDefault();
    post(route("vendor.store"), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
        setSuccessMessage("You can now create and publish products.");
      },
      onError: () => {
      }
    });
  };
  const updateVendor = (event) => {
    event.preventDefault();
    post(route("vendor.store"), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
        setSuccessMessage("Your details were updated.");
      },
      onError: () => {
      }
    });
  };
  const closeModal = () => {
    setShowBecomeVendorConfirmation(false);
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    recentlySuccessful && /* @__PURE__ */ jsx("div", { className: "toast toast-top toast-end z-[1000]", children: /* @__PURE__ */ jsx("div", { className: "alert alert-success text-white", children: /* @__PURE__ */ jsx("span", { children: successMessage }) }) }),
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsxs("h2", { className: "flex justify-between mb-8 text-lg font-medium text-gray-900 dark:text-gray-100", children: [
      "Vendor Details",
      ((_c = user.vendor) == null ? void 0 : _c.status) && /* @__PURE__ */ jsx(
        "span",
        {
          className: `badge text-white ${{
            pending: "badge-warning",
            rejected: "badge-error",
            approved: "badge-success"
          }[user.vendor.status] || ""}`,
          children: user.vendor.status_label
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      !user.vendor && /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          onClick: (event) => setShowBecomeVendorConfirmation(true),
          disabled: processing,
          children: "Become a Vendor"
        }
      ),
      user.vendor && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: updateVendor, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Store Name" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "store_name",
                value: data.store_name,
                onChange: onStoreNameChange,
                required: true,
                isFocused: true,
                autoComplete: "store_name",
                className: "mt-1 block w-full"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.store_name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Store Address" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.store_address,
                onChange: (event) => setData("store_address", event.target.value),
                className: "textarea textarea-bordered w-full mt-1 focus:border-violet-900 focus:ring-1 focus:ring-violet-900 dark:focus:border-indigo-600 dark:focus:ring-1 dark:focus:ring-indigo-600 focus:outline-none transition-all duration-200 ease-in-out",
                placeholder: "Enter Your Store Address"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.store_address })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Update" }) })
        ] }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            action: route("stripe.connect"),
            method: "post",
            className: "my-8",
            children: [
              /* @__PURE__ */ jsx("input", { type: "hidden", name: "_token", value: token }),
              user.stripe_account_active && /* @__PURE__ */ jsx("div", { className: "text-center text-gray-600 my-4 text-sm", children: "Yor are successfully connected to Stripe" }),
              /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
                PrimaryButton,
                {
                  className: "w-full justify-center",
                  disabled: user.stripe_account_active,
                  children: "Connect to Stripe"
                }
              ) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { show: showBecomeVendorConfirmation, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: becomeVendor, className: "p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Are you sure you want to become a Vendor?" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, className: "normal-case", children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, className: "normal-case", children: "Confirm" })
      ] })
    ] }) })
  ] });
}
export {
  VendorDetails as default
};
