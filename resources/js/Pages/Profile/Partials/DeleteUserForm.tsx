import InputError from "@/Components/Core/InputError";
import Modal from "@/Components/Core/Modal";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({
  className = "",
}: {
  className?: string;
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({ password: "" });

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };

  return (
    <section className={className}>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Once your account is deleted, all data will be permanently removed.
        Please download any data you wish to retain beforehand.
      </p>

      <button
        type="button"
        onClick={() => setConfirmingUserDeletion(true)}
        className="border border-black dark:border-gray-600 px-8 py-3 text-xs font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:border-red-600 dark:hover:text-white"
      >
        Delete Account
      </button>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-8">
          <h2 className="mb-2 text-xl font-black uppercase tracking-tighter text-black dark:text-white">
            Delete Account
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            This action is permanent. Please enter your password to confirm.
          </p>

          <div className="mb-6">
            <label
              htmlFor="delete-password"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
            >
              Password
            </label>
            <input
              id="delete-password"
              type="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              autoFocus
              placeholder="••••••••"
              className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

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
              className="border border-black dark:border-gray-600 px-8 py-3 text-xs font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:border-red-600 dark:hover:text-white disabled:opacity-50"
            >
              {processing ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}