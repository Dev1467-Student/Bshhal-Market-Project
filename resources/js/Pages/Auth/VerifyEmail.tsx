import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Mail } from "lucide-react";

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };

  return (
    <AppLayout>
      <Head title="Email Verification" />

      <div className="flex min-h-[70vh] items-center justify-center bg-white dark:bg-gray-950 px-4 py-16">
        <div className="w-full max-w-md border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-10">

          <div className="mb-6 flex h-12 w-12 items-center justify-center border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black">
            <Mail className="h-6 w-6" />
          </div>

          <h1 className="mb-2 text-3xl font-black uppercase tracking-tighter text-black dark:text-white">
            Verify Email
          </h1>

          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Thanks for signing up! Please verify your email address by clicking
            the link we sent you. If you didn't receive it, we can send another.
          </p>

          {status === "verification-link-sent" && (
            <div className="mb-6 border border-black dark:border-white bg-black dark:bg-white px-4 py-3 text-sm text-white dark:text-black">
              A new verification link has been sent to your email address.
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <button
              type="submit"
              disabled={processing}
              className="w-full border border-black dark:border-white bg-black dark:bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50"
            >
              {processing ? "Sending..." : "Resend Verification Email"}
            </button>

            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="block w-full border border-black dark:border-gray-600 px-8 py-3 text-center text-sm font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
            >
              Log Out
            </Link>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
