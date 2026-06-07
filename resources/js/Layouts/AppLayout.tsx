import { PageProps } from "@/types";
import { Link, usePage, router } from "@inertiajs/react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

const navLinks = [
  { name: "Home", routeName: "dashboard" },
  { name: "Shop", routeName: "shop" },
  { name: "About", routeName: "about" },
  { name: "Contact", routeName: "contact" },
] as const;

const footerLinks = [
  ...navLinks,
  { name: "Cart", routeName: "cart.index" },
] as const;

function navLinkClass(active = false) {
  return [
    "text-sm font-medium tracking-widest uppercase transition-colors",
    active
      ? "text-black dark:text-white"
      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white",
  ].join(" ");
}

function SearchBarInline() {
  const { keyword } = usePage<PageProps>().props;
  const [value, setValue] = useState(keyword || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route("shop"), { keyword: value }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="w-48 border border-black dark:border-white border-r-0 px-3 py-2 text-sm outline-none focus:ring-0 bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
      />
      <button
        type="submit"
        className="border border-black dark:border-white bg-black dark:bg-white px-3 py-2 text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}

export default function AppLayout({ children }: PropsWithChildren) {
  const { auth, appName, totalQuantity } = usePage<PageProps>().props;
  const { isDark, toggle } = useDarkMode();
  const user = auth.user;
  const currentUrl = usePage().url;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [currentUrl]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-gray-950 dark:text-white">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <Link
              href={route("dashboard")}
              className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-black dark:text-white"
            >
              {appName}
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex lg:flex-1 lg:justify-center" aria-label="Main navigation">
              <ul className="flex items-center gap-8">
                {navLinks.map(({ name, routeName }) => (
                  <li key={routeName}>
                    <Link href={route(routeName)} className={navLinkClass(route().current(routeName) ?? false)}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-2 sm:gap-4">

              {/* Desktop search */}
              <div className="hidden lg:block">
                <SearchBarInline />
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggle}
                className="inline-flex items-center justify-center border p-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Cart */}
              <Link
                href={route("cart.index")}
                className="relative inline-flex items-center justify-center border p-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
                aria-label={`Cart, ${totalQuantity} items`}
              >
                <ShoppingBagIcon className="h-5 w-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center border px-1 text-xs font-bold bg-black text-white border-black dark:bg-white dark:text-black dark:border-white">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {/* User menu (desktop) */}
              {user ? (
                <div className="relative hidden lg:block" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((open) => !open)}
                    className="inline-flex items-center gap-2 border px-3 py-2 text-sm font-medium border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    <span className="max-w-[8rem] truncate">{user.name}</span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-1 w-48 border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <Link
                        href={route("profile.edit")}
                        className="block border-b px-4 py-3 text-sm border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                      >
                        Profile
                      </Link>
                      <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="block w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                      >
                        Log out
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex lg:items-center lg:gap-3">
                  <Link
                    href={route("login")}
                    className="border px-4 py-2 text-sm font-medium tracking-widest uppercase border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href={route("register")}
                    className="border px-4 py-2 text-sm font-medium tracking-widest uppercase bg-black dark:bg-white border-black dark:border-white text-white dark:text-black transition-colors hover:bg-gray-900 dark:hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                className="inline-flex items-center justify-center border p-2 lg:hidden border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="border-t lg:hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <nav className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6" aria-label="Mobile navigation">

              {/* Mobile search */}
              <div className="mb-4">
                <SearchBarInline />
              </div>

              <ul className="flex flex-col">
                {navLinks.map(({ name, routeName }) => (
                  <li key={routeName} className="border-b border-gray-100 dark:border-gray-800">
                    <Link
                      href={route(routeName)}
                      className={["block py-3", navLinkClass(route().current(routeName) ?? false)].join(" ")}
                    >
                      {name}
                    </Link>
                  </li>
                ))}

                {user ? (
                  <>
                    <li className="border-b border-gray-100 dark:border-gray-800">
                      <Link
                        href={route("profile.edit")}
                        className={["block py-3", navLinkClass(route().current("profile.edit") ?? false)].join(" ")}
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="border-b border-gray-100 dark:border-gray-800">
                      <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className={["block w-full py-3 text-left", navLinkClass()].join(" ")}
                      >
                        Log out
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="flex flex-col gap-2 pt-4">
                    <Link
                      href={route("login")}
                      className="border px-4 py-3 text-center text-sm font-medium tracking-widest uppercase border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    >
                      Log in
                    </Link>
                    <Link
                      href={route("register")}
                      className="border px-4 py-3 text-center text-sm font-medium tracking-widest uppercase bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
                    >
                      Register
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-lg font-bold tracking-tight text-black dark:text-white">
                {appName}
              </p>
              <p className="mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                Curated products from independent vendors.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
                {footerLinks.map(({ name, routeName }) => (
                  <li key={routeName}>
                    <Link
                      href={route(routeName)}
                      className="text-sm text-gray-600 dark:text-gray-400 transition-colors hover:text-black dark:hover:text-white"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 border-t pt-6 text-xs tracking-widest uppercase border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {appName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}