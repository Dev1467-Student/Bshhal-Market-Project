import InputError from "@/Components/Core/InputError";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            autoFocus
            autoComplete="name"
            className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
          />
          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
            className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div className="border border-black dark:border-gray-600 bg-white dark:bg-gray-950 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your email address is unverified.{" "}
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="font-medium text-black dark:text-white underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300"
              >
                Resend verification email
              </Link>
            </p>
            {status === "verification-link-sent" && (
              <p className="mt-2 text-sm font-medium text-black dark:text-white">
                A new verification link has been sent.
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={processing}
            className="border border-black dark:border-white bg-black dark:bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
          >
            {processing ? "Saving..." : "Save Changes"}
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