import Checkbox from "@/Components/Core/Checkbox";
import InputError from "@/Components/Core/InputError";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false as boolean,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AppLayout>
      <Head title="Log in" />

      <div className="flex min-h-[70vh] items-center justify-center bg-white dark:bg-gray-950 px-4 py-16">
        <div className="w-full max-w-md border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-10">

          <h1 className="mb-2 text-3xl font-black uppercase tracking-tighter text-black dark:text-white">
            Sign In
          </h1>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href={route("register")}
              className="font-medium text-black dark:text-white underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300"
            >
              Register
            </Link>
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
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                autoComplete="username"
                autoFocus
                onChange={(e) => setData("email", e.target.value)}
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
                placeholder="you@example.com"
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-bold uppercase tracking-widest text-black dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
                placeholder="••••••••"
              />
              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) =>
                    setData("remember", (e.target.checked || false) as false)
                  }
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>

              {canResetPassword && (
                <Link
                  href={route("password.request")}
                  className="text-xs font-medium uppercase tracking-wide text-black dark:text-white underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Forgot password?
                </Link>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full border border-black dark:border-white bg-black dark:bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
            >
              {processing ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}