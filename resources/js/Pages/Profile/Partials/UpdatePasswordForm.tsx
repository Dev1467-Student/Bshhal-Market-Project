import InputError from "@/Components/Core/InputError";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

export default function UpdatePasswordForm({
  className = "",
}: {
  className?: string;
}) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }
        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <form onSubmit={updatePassword} className="space-y-6">
        <div>
          <label
            htmlFor="current_password"
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
          >
            Current Password
          </label>
          <input
            id="current_password"
            ref={currentPasswordInput}
            type="password"
            value={data.current_password}
            onChange={(e) => setData("current_password", e.target.value)}
            autoComplete="current-password"
            className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
            placeholder="••••••••"
          />
          <InputError message={errors.current_password} className="mt-2" />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
          >
            New Password
          </label>
          <input
            id="password"
            ref={passwordInput}
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            autoComplete="new-password"
            className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
            placeholder="••••••••"
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <label
            htmlFor="password_confirmation"
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
          >
            Confirm Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            autoComplete="new-password"
            className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
            placeholder="••••••••"
          />
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={processing}
            className="border border-black dark:border-white bg-black dark:bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
          >
            {processing ? "Saving..." : "Update Password"}
          </button>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Saved.
            </p>
          </Transition>
        </div>
      </form>
    </section>
  );
}