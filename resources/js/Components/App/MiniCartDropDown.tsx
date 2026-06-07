import React, { useRef, useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ShoppingBag, X } from "lucide-react";
import CurrencyFormatter from "../Core/CurrencyFormatter";
import { ProductRoute } from "@/helpers";

function MiniCartDropDown() {
  const { totalQuantity, totalPrice, miniCartItems } = usePage().props;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Cart button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative border border-black p-1.5 text-black transition-all duration-200 hover:bg-black hover:text-white"
        aria-label="Cart"
      >
        <ShoppingBag className="h-4 w-4" />
        {totalQuantity > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center bg-black text-white text-[10px] font-bold">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-96 border border-black bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-widest text-black">
              Cart ({totalQuantity})
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-black hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Items */}
          <div className="max-h-72 overflow-y-auto">
            {miniCartItems.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-gray-300" />
                <p className="text-xs text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              miniCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-gray-100 p-3 last:border-0"
                >
                  <Link
                    href={ProductRoute(item)}
                    onClick={() => setOpen(false)}
                    className="shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-14 w-14 border border-gray-100 object-contain"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col gap-1">
                    <Link
                      href={ProductRoute(item)}
                      onClick={() => setOpen(false)}
                      className="text-xs font-medium text-black hover:underline line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-semibold text-black">
                        <CurrencyFormatter amount={item.quantity * item.price} />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {miniCartItems.length > 0 && (
            <div className="border-t border-black p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-black">
                  Subtotal
                </span>
                <span className="text-sm font-bold text-black">
                  <CurrencyFormatter amount={totalPrice} />
                </span>
              </div>
              <Link
                href={route("cart.index")}
                onClick={() => setOpen(false)}
                className="block w-full bg-black px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-black border border-black"
              >
                View Cart
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MiniCartDropDown;