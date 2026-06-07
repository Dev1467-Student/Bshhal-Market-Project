import AppLayout from "@/Layouts/AppLayout";
import { PageProps, PaginatedProducts, Vendor } from "@/types";
import { Head, Link } from "@inertiajs/react";
import ProductCard from "@/Components/ProductCard";
import Pagination from "@/Components/Pagination";
import { Store } from "lucide-react";

function Profile({
  vendor,
  products,
}: PageProps<{
  vendor: Vendor;
  products: PaginatedProducts;
}>) {
  return (
    <AppLayout>
      <Head title={vendor.store_name + " — Vendor Profile"} />

      <div className="bg-white dark:bg-gray-950 px-4 md:px-8 lg:px-16">

        {/* Vendor Hero */}
        <section className="border-b border-black dark:border-gray-700 py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex h-16 w-16 items-center justify-center border border-black dark:border-gray-600 bg-black dark:bg-white text-white dark:text-black">
                <Store className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white md:text-6xl">
                {vendor.store_name}
              </h1>
              {vendor.store_address && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {vendor.store_address}
                </p>
              )}
            </div>

            <div className="shrink-0">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                {products.meta?.total ?? products.data.length}{" "}
                {(products.meta?.total ?? products.data.length) === 1 ? "product" : "products"}
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          {products.data.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                No products yet
              </p>
              <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                This vendor hasn't listed any products yet.
              </p>
              <Link
                href={route("shop")}
                className="mt-8 inline-block border border-black dark:border-gray-600 px-8 py-3 text-sm font-bold uppercase tracking-widest text-black dark:text-white transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-px bg-black dark:bg-gray-700 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.data.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-gray-950">
                    <ProductCard product={product} showVendor={false} />
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Pagination
                  links={products.links}
                  currentPage={products.meta.current_page}
                  lastPage={products.meta.last_page}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

export default Profile;