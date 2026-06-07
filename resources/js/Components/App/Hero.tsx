import React from "react";
import { Link } from "@inertiajs/react";

export default function Hero() {
  return (
    <section className="flex min-h-[60vh] w-full items-center justify-center bg-black px-4 py-24 text-white md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
          Multi-Vendor Marketplace
        </p>
        <h1 className="text-5xl font-black uppercase tracking-tighter md:text-7xl">
          Discover What Moves You
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light text-gray-300">
          Curated products from independent vendors. Quality craftsmanship, delivered to your door.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={route("shop")}
            className="inline-flex items-center justify-center bg-white px-8 py-3 text-sm font-medium uppercase tracking-wide text-black transition-all duration-200 hover:bg-gray-100"
          >
            Shop Now
          </Link>
          <Link
            href={route("about")}
            className="inline-flex items-center justify-center border border-white px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition-all duration-200 hover:bg-white hover:text-black"
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
}