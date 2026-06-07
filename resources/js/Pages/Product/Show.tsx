import Carousel from "@/Components/Core/Carousel";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import ProductCard from "@/Components/ProductCard";
import AppLayout from "@/Layouts/AppLayout";
import { arraysAreEqual } from "@/helpers";
import { PageProps, Product, VariationTypeOption } from "@/types";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

function Show({
  appName,
  product,
  relatedProducts,
  variationOptions,
}: PageProps<{
  product: Product;
  relatedProducts: Product[];
  variationOptions: Record<string, number>;
}>) {
  const form = useForm<{
    option_ids: Record<string, number>;
    quantity: number;
    price: number | null;
  }>({
    option_ids: {},
    quantity: 1,
    price: null,
  });

  const { url } = usePage();
  const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationTypeOption>>({});

  const images = useMemo(() => {
    for (let typeId in selectedOptions) {
      const option = selectedOptions[typeId];
      if (option.images.length > 0) return option.images;
    }
    return product.images;
  }, [product, selectedOptions]);

  const computedProduct = useMemo(() => {
    const selectedOptionIds = Object.values(selectedOptions)
      .map((option) => option.id)
      .sort();

    for (let variation of product.variations) {
      const optionIds = variation.variation_type_option_ids.sort();
      if (arraysAreEqual(selectedOptionIds, optionIds)) {
        return {
          price: variation.price,
          quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
        };
      }
    }
    return {
      price: product.price,
      quantity: product.quantity,
    };
  }, [product, selectedOptions]);

  useEffect(() => {
    for (let type of product.variationTypes) {
      const selectedOptionId = variationOptions[type.id];
      chooseOption(
        type.id,
        type.options.find((op) => op.id == selectedOptionId) || type.options[0],
        false
      );
    }
  }, []);

  const getOptionIdsMap = (newOption: Record<number, VariationTypeOption>) => {
    return Object.fromEntries(
      Object.entries(newOption).map(([a, b]) => [a, b.id])
    );
  };

  const chooseOption = (
    typeId: number,
    option: VariationTypeOption,
    updateRouter: boolean = true
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = { ...prevSelectedOptions, [typeId]: option };
      if (updateRouter) {
        router.get(
          url,
          { options: getOptionIdsMap(newOptions) },
          { preserveScroll: true, preserveState: true }
        );
      }
      return newOptions;
    });
  };

  const handleQuantitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    form.setData("quantity", parseInt(e.target.value));
  };

  const addToCart = () => {
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err) => console.log(err),
    });
  };

  useEffect(() => {
    const idsMap = Object.fromEntries(
      Object.entries(selectedOptions).map(
        ([typeId, option]: [string, VariationTypeOption]) => [typeId, option.id]
      )
    );
    form.setData("option_ids", idsMap);
  }, [selectedOptions]);

  const renderProductVariationTypes = () => {
    return product.variationTypes.map((type) => (
      <div key={type.id} className="mb-6">
        <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-black dark:text-white">
          {type.name}
        </label>

        {type.type === "Image" && (
          <div className="flex flex-wrap gap-2">
            {type.options.map((option) => (
              <button
                onClick={() => chooseOption(type.id, option)}
                key={option.id}
                className={`border-2 p-0.5 transition-all duration-150 ${
                  selectedOptions[type.id]?.id === option.id
                    ? "border-black dark:border-white"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-600 dark:hover:border-gray-400"
                }`}
                aria-label={`Select ${option.name}`}
              >
                {option.images?.length > 0 ? (
                  <img
                    src={option.images[0].thumb}
                    alt={option.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/60x60/e5e7eb/1f2937?text=✓";
                    }}
                    className="h-12 w-12 object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400">
                    {option.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {type.type === "Radio" && (
          <div className="flex flex-wrap gap-2">
            {type.options.map((option) => (
              <button
                onClick={() => chooseOption(type.id, option)}
                key={option.id}
                className={`border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-150 ${
                  selectedOptions[type.id]?.id === option.id
                    ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-black dark:text-white hover:border-black dark:hover:border-white"
                }`}
                aria-pressed={selectedOptions[type.id]?.id === option.id}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    ));
  };

  const renderAddToCartButton = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <label
          htmlFor="quantity"
          className="text-xs font-bold uppercase tracking-widest text-black dark:text-white"
        >
          Qty
        </label>
        <select
          id="quantity"
          value={form.data.quantity}
          onChange={handleQuantitySelect}
          className="bg-white dark:bg-gray-900 border border-black dark:border-gray-600 px-3 py-2 text-sm text-black dark:text-white outline-none focus:ring-0"
        >
          {Array.from(
            { length: Math.min(computedProduct.quantity, 20) },
            (_, i) => i + 1
          ).map((qty) => (
            <option key={qty} value={qty}>{qty}</option>
          ))}
        </select>
      </div>

      <button
        onClick={addToCart}
        disabled={form.processing}
        className="flex w-full items-center justify-center gap-2 border border-black dark:border-white bg-black dark:bg-white px-4 py-4 text-sm font-bold uppercase tracking-widest text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingBag className="h-4 w-4" />
        {form.processing ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );

  return (
    <AppLayout>
      <Head>
        <title>{product.title}</title>
        <meta name="title" content={product.meta_title || product.title} />
        <meta name="description" content={product.meta_description} />
        <link rel="canonical" href={route("product.show", product.slug)} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.meta_description} />
        <meta property="og:image" content={images[0]?.small} />
        <meta property="og:url" content={route("product.show", product.slug)} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={appName} />
      </Head>

      <div className="bg-white dark:bg-gray-950 px-4 py-12 md:px-8 lg:px-16">

        {/* Breadcrumb */}
        <nav className="mb-8 text-xs text-gray-400 dark:text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href={route("dashboard")} className="uppercase tracking-wide hover:text-black dark:hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={route("product.byDepartment", product.department.slug)} className="uppercase tracking-wide hover:text-black dark:hover:text-white transition-colors">
                {product.department.name}
              </Link>
            </li>
            <li>/</li>
            <li className="font-bold uppercase tracking-wide text-black dark:text-white truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* Left — Image Carousel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Carousel images={images} />
          </div>

          {/* Right — Product Details */}
          <div className="flex flex-col">

            {/* Title + vendor */}
            <div className="mb-6 border-b border-black dark:border-gray-700 pb-6">
              <h1 className="mb-2 text-3xl font-black uppercase tracking-tighter text-black dark:text-white md:text-4xl">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                by{" "}
                <Link
                  href={route("vendor.profile", product.user.store_name)}
                  className="font-medium text-black dark:text-white underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {product.user.name}
                </Link>
              </p>
            </div>

            {/* Price */}
            <div className="mb-8 text-3xl font-black text-black dark:text-white">
              <CurrencyFormatter amount={computedProduct.price} />
            </div>

            {/* Stock warning */}
            {computedProduct.quantity !== undefined && computedProduct.quantity < 10 && (
              <div className="mb-6 border border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                Only {computedProduct.quantity} left in stock
              </div>
            )}

            {/* Variations */}
            {product.variationTypes.length > 0 && (
              <div className="mb-8">
                {renderProductVariationTypes()}
              </div>
            )}

            {/* Add to cart */}
            <div className="mb-12">
              {renderAddToCartButton()}
            </div>

            {/* Description */}
            <div className="border-t border-black dark:border-gray-700 pt-8">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                About this Product
              </h2>
              <div
                className="prose prose-sm prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-black dark:border-gray-700 pt-12">
            <h2 className="mb-8 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-px bg-black dark:bg-gray-700 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white dark:bg-gray-950">
                  <ProductCard
                    product={relatedProduct}
                    showVendor={false}
                    showDescription={false}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default Show;