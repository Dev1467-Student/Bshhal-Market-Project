import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B67XRIWq.js";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./DeleteUserForm-B2NLBLPm.js";
import UpdatePasswordForm from "./UpdatePasswordForm-CqRGaFGP.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-CVoenKzU.js";
import VendorDetails from "./VendorDetails-CbZY-iTT.js";
import "react";
import "@heroicons/react/24/outline";
import "./CurrencyFormatter-Bo-PTyIu.js";
import "./helpers-B7gCMt1w.js";
import "./InputError-roYfmLKp.js";
import "./InputLabel-BMFb3spV.js";
import "./SecondaryButton-B05Cq_fG.js";
import "@headlessui/react";
import "./TextInput-BvLRji1h.js";
import "./PrimaryButton-Da-R3KJE.js";
function Edit({
  mustVerifyEmail,
  status
}) {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        "̥",
        /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 col-span-2", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800", children: /* @__PURE__ */ jsx(
              UpdateProfileInformation,
              {
                mustVerifyEmail,
                status,
                className: "max-w-xl"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800", children: /* @__PURE__ */ jsx(VendorDetails, {}) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
