import InputError from "@/Components/Core/InputError";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <AppLayout>
      <Head title="Reset Password" />

      <div className="flex min-h-[70vh] items-center justify-center bg-white dark:bg-gray-950 px-4 py-16">
        <div className="w-full max-w-md border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-10">

          <h1 className="mb-2 text-3xl font-black uppercase tracking-tighter text-black dark:text-white">
            Reset Password
          </h1>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            Enter your new password below.
          </p>

          <form onSubmit={submit} className="space-y-6">
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
                name="email"
                value={data.email}
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 rounded-none placeholder-gray-400 dark:placeholder-gray-600"
              />
              <InputError message={errors.email} className="mt-2" />
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
                type="password"
                name="password"
                value={data.password}
                autoComplete="new-password"
                autoFocus
                onChange={(e) => setData("password", e.target.value)}
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 rounded-none placeholder-gray-400 dark:placeholder-gray-600"
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
                name="password_confirmation"
                value={data.password_confirmation}
                autoComplete="new-password"
                onChange={(e) => setData("password_confirmation", e.target.value)}
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 rounded-none placeholder-gray-400 dark:placeholder-gray-600"
                placeholder="••••••••"
              />
              <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full border border-black dark:border-white bg-black dark:bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
            >
              {processing ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
