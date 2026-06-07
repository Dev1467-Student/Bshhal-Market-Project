import CartItem from "@/Components/App/CartItem";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import AppLayout from "@/Layouts/AppLayout";
import { GroupedCartItems, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { CreditCard, ShoppingBag } from "lucide-react";

function Index({
  csrf_token,
  cartItems,
  totalQuantity,
  totalPrice,
}: PageProps<{ cartItems: Record<number, GroupedCartItems> }>) {
  const isEmpty = Object.keys(cartItems).length === 0;

  return (
    <AppLayout>
      <Head title="Your Cart" />

      <div className="min-h-[70vh] bg-white dark:bg-gray-950 px-4 py-12 md:px-8 lg:px-16">
        {/* Page header */}
        <header className="mb-8 border-b border-black dark:border-gray-700 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
            Your Cart
          </h1>
          {!isEmpty && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </p>
          )}
        </header>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag className="mb-6 h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
              Your cart is empty
            </p>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href={route("shop")}
              className="mt-8 border border-black dark:border-gray-600 px-8 py-3 text-sm font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Left — cart items */}
            <div className="flex-1">
              {Object.values(cartItems).map((cartItem) => (
                <div key={cartItem.user.id} className="mb-10">
                  {/* Vendor header */}
                  <div className="mb-4 flex items-center justify-between border-b border-black dark:border-gray-700 pb-4">
                    <Link
                      href="/"
                      className="text-xs font-bold uppercase tracking-widest text-black dark:text-white underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {cartItem.user.name}
                    </Link>

                    <form action={route("cart.checkout")} method="post">
                      <input type="hidden" name="_token" value={csrf_token} />
                      <input type="hidden" name="vendor_id" value={cartItem.user.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-black dark:text-white transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        Pay this seller
                      </button>
                    </form>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
                    {cartItem.items.map((item) => (
                      <CartItem item={item} key={item.id} />
                    ))}
                  </div>

                  {/* Vendor subtotal */}
                  <div className="mt-4 flex justify-end text-sm text-gray-500 dark:text-gray-400">
                    Subtotal:{" "}
                    <span className="ml-2 font-semibold text-black dark:text-white">
                      <CurrencyFormatter amount={cartItem.totalPrice} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — order summary */}
            <div className="w-full border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-8 lg:w-80 lg:shrink-0">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                Order Summary
              </h2>

              <div className="space-y-3 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Items ({totalQuantity})</span>
                  <CurrencyFormatter amount={totalPrice} />
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between py-6 text-base font-bold text-black dark:text-white">
                <span className="uppercase tracking-wide">Total</span>
                <CurrencyFormatter amount={totalPrice} />
              </div>

              <form action={route("cart.checkout")} method="post">
                <input type="hidden" name="_token" value={csrf_token} />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 border border-black dark:border-white bg-black dark:bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white"
                >
                  <CreditCard className="h-4 w-4" />
                  Proceed to Checkout
                </button>
              </form>

              <Link
                href={route("shop")}
                className="mt-4 block text-center text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-black dark:hover:text-white"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default Index;