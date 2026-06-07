import Badge from "@/Components/ui/Badge";
import Button from "@/Components/ui/Button";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import { Product } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { Eye, ShoppingBag } from "lucide-react";

export interface ProductCardProps {
  product: Product;
  showVendor?: boolean;
  showDescription?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  showVendor = true,
  showDescription = true,
  className = "",
}: ProductCardProps) {
  const form = useForm({ option_ids: {}, quantity: 1 });

  const addToCart = () => {
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <article
      className={[
        "group flex flex-col border border-black dark:border-gray-700 bg-white dark:bg-gray-950 transition-colors duration-150 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
        className,
      ].join(" ")}
    >
      <figure className="relative aspect-[4/3] overflow-hidden border-b border-black dark:border-gray-700 bg-white dark:bg-gray-900">
        <Link href={route("product.show", product.slug)} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <Link
            href={route("product.show", product.slug)}
            className="inline-flex items-center justify-center border border-black bg-white p-2 text-black transition-colors duration-150 hover:bg-black hover:text-white"
            aria-label={`View ${product.title}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={addToCart}
            disabled={form.processing}
            className="inline-flex items-center justify-center border border-black bg-white p-2 text-black transition-colors duration-150 hover:bg-black hover:text-white disabled:opacity-40"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </figure>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          <Link href={route("product.byDepartment", product.department.slug)}>
            <Badge variant="muted">{product.department.name}</Badge>
          </Link>
          <Badge variant="outline">{product.category.name}</Badge>
        </div>

        <h3 className="text-base font-semibold leading-snug text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
          <Link
            href={route("product.show", product.slug)}
            className="transition-colors duration-150"
          >
            {product.title}
          </Link>
        </h3>

        {showDescription && (
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-150 group-hover:text-gray-300 dark:group-hover:text-gray-600">
            {product.short_description || product.description || "Quality product from our curated marketplace."}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="text-lg font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
            <CurrencyFormatter amount={product.price} />
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addToCart}
            disabled={form.processing}
            className="group-hover:border-white group-hover:bg-white group-hover:text-black dark:border-gray-600 dark:text-gray-300 dark:group-hover:border-black dark:group-hover:bg-black dark:group-hover:text-white"
          >
            Add
          </Button>
        </div>

        {showVendor && product.user.store_name && (
          <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-150 group-hover:text-gray-300 dark:group-hover:text-gray-600">
            Sold by{" "}
            <Link
              href={route("vendor.profile", product.user.store_name)}
              className="font-medium underline underline-offset-2 group-hover:text-white dark:group-hover:text-black"
            >
              {product.user.name}
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}