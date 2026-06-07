import InputError from "@/Components/Core/InputError";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Lock } from "lucide-react";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AppLayout>
      <Head title="Confirm Password" />

      <div className="flex min-h-[70vh] items-center justify-center bg-white dark:bg-gray-950 px-4 py-16">
        <div className="w-full max-w-md border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-10">

          <div className="mb-6 flex h-12 w-12 items-center justify-center border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black">
            <Lock className="h-6 w-6" />
          </div>

          <h1 className="mb-2 text-3xl font-black uppercase tracking-tighter text-black dark:text-white">
            Confirm Password
          </h1>

          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            This is a secure area. Please confirm your password before
            continuing.
          </p>

          <form onSubmit={submit} className="space-y-6">
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
                autoFocus
                onChange={(e) => setData("password", e.target.value)}
                className="w-full bg-white dark:bg-gray-950 border border-black dark:border-gray-600 px-4 py-3 text-sm text-black dark:text-white outline-none focus:ring-0 rounded-none placeholder-gray-400 dark:placeholder-gray-600"
                placeholder="••••••••"
              />
              <InputError message={errors.password} className="mt-2" />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full border border-black dark:border-white bg-black dark:bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
            >
              {processing ? "Confirming..." : "Confirm Password"}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
