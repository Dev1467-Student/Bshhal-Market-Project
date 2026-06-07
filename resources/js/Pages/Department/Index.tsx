import ProductCard from "@/Components/ProductCard";
import Pagination from "@/Components/Pagination";
import AppLayout from "@/Layouts/AppLayout";
import { Department, PageProps, PaginatedProducts } from "@/types";
import { Head, Link } from "@inertiajs/react";

function Index({
  appName,
  department,
  products,
}: PageProps<{
  department: Department;
  products: PaginatedProducts;
}>) {
  return (
    <AppLayout>
      <Head>
        <title>{department.name}</title>
        <meta name="title" content={department.meta_title} />
        <meta name="description" content={department.meta_description} />
        <link rel="canonical" href={route("product.byDepartment", department.slug)} />
        <meta property="og:title" content={department.name} />
        <meta property="og:description" content={department.meta_description} />
        <meta property="og:url" content={route("product.byDepartment", department.slug)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={appName} />
      </Head>

      <div className="bg-white dark:bg-gray-950 px-4 md:px-8 lg:px-16">

        {/* Hero */}
        <section className="border-b border-black dark:border-gray-700 py-16">
          <nav className="mb-4 text-xs text-gray-400 dark:text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={route("dashboard")} className="uppercase tracking-wide hover:text-black dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-bold uppercase tracking-wide text-black dark:text-white">
                {department.name}
              </li>
            </ol>
          </nav>

          <h1 className="text-5xl font-black uppercase tracking-tighter text-black dark:text-white md:text-7xl">
            {department.name}
          </h1>

          {products.meta?.total > 0 && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {products.meta.total}{" "}
              {products.meta.total === 1 ? "product" : "products"}
            </p>
          )}
        </section>

        {/* Products */}
        <section className="py-12">
          {products.data.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                No products found
              </p>
              <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                Check back later or explore other departments.
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
                    <ProductCard product={product} />
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

export default Index;