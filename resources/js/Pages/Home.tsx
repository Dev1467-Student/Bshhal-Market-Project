import ProductCard from "@/Components/ProductCard";
import AppLayout from "@/Layouts/AppLayout";
import { PageProps, PaginationProps, Product } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Home({
  products,
}: PageProps<{
  products: PaginationProps<Product>;
}>) {
  return (
    <AppLayout>
      <Head title="Home" />

      <div className="bg-white dark:bg-gray-950 text-black dark:text-white">
        {/* Hero */}
        <section className="flex min-h-[60vh] w-full items-center justify-center bg-black dark:bg-gray-900 px-4 py-24 text-white md:px-8 lg:px-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h1 className="text-5xl font-black uppercase tracking-tighter md:text-7xl">
              Discover What Moves You
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light text-gray-300">
              Curated products from independent vendors. Quality craftsmanship,
              delivered to your door.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={route("shop")}
                className="inline-flex items-center justify-center bg-white dark:bg-gray-100 px-8 py-3 text-sm font-medium uppercase tracking-wide text-black transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-white"
              >
                Shop Now
              </Link>
              <Link
                href={route("about")}
                className="inline-flex items-center justify-center border border-white px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white hover:text-black"
              >
                Explore
              </Link>
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="px-4 py-16 md:px-8 lg:px-16">
          <h2 className="mb-8 border-b border-black dark:border-gray-700 pb-3 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
            FEATURED PRODUCTS
          </h2>

          {products.data.length === 0 ? (
            <p className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">
              No products available
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-px bg-black dark:bg-gray-700 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.data.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-950">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}