import InputError from "@/Components/Core/InputError";
import Modal from "@/Components/Core/Modal";
import { useForm, usePage } from "@inertiajs/react";
import React, { FormEventHandler, useState } from "react";
import { Store, CheckCircle } from "lucide-react";

function VendorDetails({ className = "" }: { className?: string }) {
  const [showBecomeVendorConfirmation, setShowBecomeVendorConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const user = usePage().props.auth.user;
  const token = usePage().props.csrf_token;

  const { data, setData, errors, post, processing, recentlySuccessful } =
    useForm({
      store_name: user.vendor?.store_name || user.name.toLowerCase().replace(/\s+/g, "-"),
      store_address: user.vendor?.store_address || "",
    });

  const onStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("store_name", e.target.value.toLowerCase().replace(/\s+/g, "-"));
  };

  const becomeVendor: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("vendor.store"), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
        setSuccessMessage("You can now create and publish products.");
      },
    });
  };

  const updateVendor: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("vendor.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setSuccessMessage("Your details were updated.");
      },
    });
  };

  const closeModal = () => setShowBecomeVendorConfirmation(false);

  const statusStyles: Record<string, string> = {
    pending: "border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-400",
    rejected: "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black",
    approved: "border-black dark:border-white text-black dark:text-white",
  };

  return (
    <section className={className}>

      {/* Success message */}
      {recentlySuccessful && successMessage && (
        <div className="mb-6 border border-black dark:border-white bg-black dark:bg-white px-4 py-3 text-xs font-bold uppercase tracking-widest text-white dark:text-black">
          {successMessage}
        </div>
      )}

      {/* Vendor status badge */}
      {user.vendor?.status && (
        <div className="mb-6 flex items-center gap-3">
          <Store className="h-4 w-4 text-black dark:text-white" />
          <span className={`border px-3 py-1 text-xs font-bold uppercase tracking-widest ${statusStyles[user.vendor.status] || "border-black dark:border-white text-black dark:text-white"}`}>
            {user.vendor.status_label}
          </span>
        </div>
      )}

      {/* Become vendor button */}
      {!user.vendor && (
        <button
          type="button"
          onClick={() => setShowBecomeVendorConfirmation(true)}
          disabled={processing}
          className="w-full border border-black dark:border-white bg-black dark:bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
        >
          Become a Vendor
        </button>
      )}

      {/* Vendor form */}
      {user.vendor && (
        <>
          <form onSubmit={updateVendor} className="space-y-4">
            <div>
              <label
                htmlFor="store_name"
                className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
              >
                Store Name
              </label>
              <input
                id="store_name"
                type="text"
                value={data.store_name}
                onChange={onStoreNameChange}
                required
                autoComplete="store_name"
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
              />
              <InputError className="mt-2" message={errors.store_name} />
            </div>

            <div>
              <label
                htmlFor="store_address"
                className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
              >
                Store Address
              </label>
              <textarea
                id="store_address"
                value={data.store_address}
                onChange={(e) => setData("store_address", e.target.value)}
                rows={3}
                placeholder="Enter your store address"
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600 resize-none"
              />
              <InputError className="mt-2" message={errors.store_address} />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full border border-black dark:border-white bg-black dark:bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
            >
              {processing ? "Saving..." : "Update Store"}
            </button>
          </form>

          {/* Stripe connect */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            {user.stripe_account_active && (
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                <CheckCircle className="h-4 w-4" />
                Connected to Stripe
              </div>
            )}

            <form action={route("stripe.connect")} method="post">
              <input type="hidden" name="_token" value={token} />
              <button
                type="submit"
                disabled={user.stripe_account_active}
                className="w-full border border-black dark:border-gray-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {user.stripe_account_active ? "Stripe Connected" : "Connect to Stripe"}
              </button>
            </form>
          </div>
        </>
      )}

      {/* Become vendor modal */}
      <Modal show={showBecomeVendorConfirmation} onClose={closeModal}>
        <div className="p-8">
          <h2 className="mb-2 text-xl font-black uppercase tracking-tighter text-black dark:text-white">
            Become a Vendor
          </h2>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to become a vendor? You'll be able to create
            and publish products on the marketplace.
          </p>

          <form onSubmit={becomeVendor}>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="border border-black dark:border-gray-600 px-6 py-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processing}
                className="border border-black dark:border-white bg-black dark:bg-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
              >
                {processing ? "Processing..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
}

export default VendorDetails;