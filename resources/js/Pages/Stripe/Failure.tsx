import AppLayout from "@/Layouts/AppLayout";
import { XCircle } from "lucide-react";
import { Head, Link } from "@inertiajs/react";

export default function Failure() {
  return (
    <AppLayout>
      <Head title="Payment Failed" />

      <div className="min-h-[70vh] bg-white dark:bg-gray-950 px-4 py-16 md:px-8 lg:px-16">

        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center border border-black dark:border-white bg-white dark:bg-gray-900 text-black dark:text-white">
            <XCircle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
            Payment Failed
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Something went wrong during your payment. Your card was not charged.
          </p>
        </div>

        {/* What to do */}
        <div className="mx-auto max-w-md border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-8">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
            What you can do
          </h2>

          <ul className="space-y-3 mb-8">
            {[
              "Ensure your card details are correct.",
              "Try using a different payment method.",
              "Contact your bank if the issue persists.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={route("cart.index")}
              className="flex-1 border border-black dark:border-white bg-black dark:bg-white px-6 py-3 text-center text-xs font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white"
            >
              Try Again
            </Link>
            <Link
              href={route("dashboard")}
              className="flex-1 border border-black dark:border-white px-6 py-3 text-center text-xs font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}