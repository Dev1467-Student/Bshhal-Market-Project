import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import AppLayout from "@/Layouts/AppLayout";
import { Order, PageProps } from "@/types";
import { CheckCheck } from "lucide-react";
import { Head, Link } from "@inertiajs/react";

function Success({ orders }: PageProps<{ orders: Order[] }>) {
  return (
    <AppLayout>
      <Head title="Payment Successful" />

      <div className="min-h-[70vh] bg-white dark:bg-gray-950 px-4 py-16 md:px-8 lg:px-16">

        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black">
            <CheckCheck className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
            Payment Successful
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Thank you for your purchase! Here is your order summary.
          </p>
        </div>

        {/* Orders */}
        <div className="mx-auto max-w-2xl space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-8">

              {/* Order header */}
              <div className="mb-6 flex items-center justify-between border-b border-black dark:border-gray-700 pb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                  Order #{order.id}
                </h2>
                <span className="border border-black dark:border-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                  {order.status}
                </span>
              </div>

              {/* Order details */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs">Seller</span>
                  <Link
                    href={route("vendor.profile", order.vendorUser.store_name)}
                    className="font-medium text-black dark:text-white underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {order.vendorUser.store_name}
                  </Link>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs">Items</span>
                  <span className="font-medium text-black dark:text-white">
                    {order.orderItems.length}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3 text-sm">
                  <span className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                    Total
                  </span>
                  <span className="text-lg font-black text-black dark:text-white">
                    <CurrencyFormatter amount={order.total_price} />
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={route("dashboard")}
                  className="flex-1 border border-black dark:border-white bg-black dark:bg-white px-6 py-3 text-center text-xs font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white"
                >
                  Back to Home
                </Link>
                <Link
                  href={route("shop")}
                  className="flex-1 border border-black dark:border-white px-6 py-3 text-center text-xs font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default Success;