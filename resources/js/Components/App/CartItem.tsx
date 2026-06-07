import React, { useCallback, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { cartItems as CartItemType } from "@/types";
import { ProductRoute } from "@/helpers";
import CurrencyFormatter from "../Core/CurrencyFormatter";
import { debounce } from "lodash";
import { Trash2 } from "lucide-react";

function CartItem({ item }: { item: CartItemType }) {
  const deleteForm = useForm({
    option_ids: item.option_ids,
  });

  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(item.quantity);

  const onDeleteClick = () => {
    deleteForm.delete(route("cart.destroy", item.product_id), {
      preserveScroll: true,
    });
  };

  const debouncedUpdateQuantity = useCallback(
    debounce((newQty: number) => {
      router.put(
        route("cart.update", item.product_id),
        { quantity: newQty, option_ids: item.option_ids },
        {
          preserveScroll: true,
          onError: (errors) => {
            if (errors.quantity) {
              setError(Object.values(errors.quantity)[0]);
            }
          },
        }
      );
    }, 700),
    []
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Number(e.target.value);
    setError("");
    setQuantity(newQty);
    debouncedUpdateQuantity(newQty);
  };

  return (
    <div className="flex gap-4 border-b border-black dark:border-gray-700 py-6 last:border-b-0">
      {/* Image */}
      <Link
        href={ProductRoute(item)}
        className="w-24 h-24 shrink-0 border border-black dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-hidden flex items-center justify-center"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-2"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        {/* Top row: title + price */}
        <div className="flex items-start justify-between gap-4">
          <Link
            href={ProductRoute(item)}
            className="text-sm font-bold uppercase tracking-wide text-black dark:text-white hover:underline"
          >
            {item.title}
          </Link>
          <span className="text-sm font-bold text-black dark:text-white whitespace-nowrap">
            <CurrencyFormatter amount={item.price * item.quantity} />
          </span>
        </div>

        {/* Options */}
        {item.options.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {item.options.map((option) => (
              <span
                key={option.id}
                className="border border-black dark:border-gray-600 px-2 py-0.5 text-xs uppercase tracking-wide text-black dark:text-gray-300"
              >
                {option.type.name}: {option.name}
              </span>
            ))}
          </div>
        )}

        {/* Bottom row: qty + delete */}
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center border border-black dark:border-gray-600">
            <button
              type="button"
              onClick={() => {
                const newQty = Math.max(1, quantity - 1);
                setQuantity(newQty);
                debouncedUpdateQuantity(newQty);
              }}
              className="px-2 py-1 text-sm font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-10 text-center text-sm font-bold border-x border-black dark:border-gray-600 outline-none py-1 bg-white dark:bg-gray-900 text-black dark:text-white"
            />
            <button
              type="button"
              onClick={() => {
                const newQty = quantity + 1;
                setQuantity(newQty);
                debouncedUpdateQuantity(newQty);
              }}
              className="px-2 py-1 text-sm font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              +
            </button>
          </div>

          {error && (
            <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
          )}

          <button
            onClick={onDeleteClick}
            className="ml-auto flex items-center gap-1 text-xs uppercase tracking-wide text-black dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;