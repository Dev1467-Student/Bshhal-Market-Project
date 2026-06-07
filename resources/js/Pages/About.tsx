import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";

export default function About() {
  return (
    <AppLayout>
      <Head title="About" />

      <div className="bg-white dark:bg-gray-950 text-black dark:text-white">
        {/* Hero */}
        <section className="flex min-h-[40vh] w-full items-center justify-center border-b border-black dark:border-gray-700 px-4 py-16 md:px-8 lg:px-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="text-5xl font-black uppercase tracking-tighter md:text-6xl">
              About Us
            </h1>
          </div>
        </section>

        {/* Our Story */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-16">
          <h2 className="mb-8 border-b border-black dark:border-gray-700 pb-3 text-xs font-bold uppercase tracking-widest">
            Our Story
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              We believe in the power of craftsmanship and independent creativity.
              Founded with a simple mission to connect talented vendors with
              discerning customers, our platform brings together unique products
              you won't find anywhere else.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              Every item in our collection is carefully curated, ensuring quality,
              authenticity, and a story behind each purchase.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              We're more than just an ecommerce store. We're a community of
              creators, entrepreneurs, and shoppers who value the extraordinary.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-black dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-16 md:px-8 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-xs font-bold uppercase tracking-widest">
              Our Values
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Quality First",
                  description: "We never compromise on quality. Every product meets our high standards.",
                },
                {
                  title: "Support Local",
                  description: "We empower independent vendors and small businesses to thrive.",
                },
                {
                  title: "Sustainable",
                  description: "We prioritize products and practices that respect our planet.",
                },
              ].map((value, index) => (
                <div key={index} className="border border-black dark:border-gray-700 bg-white dark:bg-gray-950 p-8">
                  <h3 className="mb-4 text-xl font-bold uppercase tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 md:px-8 lg:px-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6">
              Ready to Explore?
            </h2>
            <Link
              href={route("shop")}
              className="inline-flex items-center justify-center border border-black dark:border-white bg-black dark:bg-white px-8 py-3 text-sm font-medium uppercase tracking-wide text-white dark:text-black transition-all duration-200 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white"
            >
              Shop Now
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}