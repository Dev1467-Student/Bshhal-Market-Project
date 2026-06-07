import InputError from "@/Components/Core/InputError";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };

  return (
    <AppLayout>
      <Head title="Forgot Password" />

      <div className="flex min-h-[70vh] items-center justify-center bg-white dark:bg-gray-950 px-4 py-16">
        <div className="w-full max-w-md border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-10">

          <h1 className="mb-2 text-3xl font-black uppercase tracking-tighter text-black dark:text-white">
            Reset Password
          </h1>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {status && (
            <div className="mb-6 border border-black dark:border-white bg-black dark:bg-white px-4 py-3 text-sm text-white dark:text-black">
              {status}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                autoFocus
                onChange={(e) => setData("email", e.target.value)}
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
                placeholder="you@example.com"
                required
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full border border-black dark:border-white bg-black dark:bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
            >
              {processing ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link
                href={route("login")}
                className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-black dark:hover:text-white"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}