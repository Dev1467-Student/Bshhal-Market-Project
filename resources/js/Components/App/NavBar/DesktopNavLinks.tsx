import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function DesktopNavLinks() {
  const { url } = usePage();

  const links = [
    { name: "Home", routeName: "dashboard" },
    { name: "Shop", routeName: "shop" },
    { name: "About", routeName: "about" },
    { name: "Contact", routeName: "contact" },
  ];

  return (
    <div className="hidden lg:flex lg:space-x-1 justify-center">
      {links.map(({ name, routeName }) => {
        const href = route(routeName);
        const isActive = url === href || url.startsWith(href + "?");

        return (
          <Link
            key={routeName}
            href={href}
            prefetch
            className={[
              "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200",
              isActive
                ? "bg-black text-white"
                : "text-black hover:bg-black hover:text-white",
            ].join(" ")}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}