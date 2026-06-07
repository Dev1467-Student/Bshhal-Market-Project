import React, { useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";

type MobileMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  user: any;
  closeMenu: () => void;
};

export default function MobileMenu({
  isMenuOpen,
  toggleMenu,
  user,
  closeMenu,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  const links = [
    { name: "Home", href: route("dashboard") },
    { name: "Shop", href: route("shop") },
    { name: "About", href: route("about") },
    { name: "Contact", href: route("contact") },
  ];

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="lg:hidden border border-black p-1.5 text-black transition-all duration-200 hover:bg-black hover:text-white"
        aria-label="Toggle menu"
      >
        {isMenuOpen
          ? <X className="h-5 w-5" />
          : <Menu className="h-5 w-5" />
        }
      </button>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <ul
          ref={menuRef}
          className="absolute top-16 left-0 z-40 w-56 border border-black bg-white"
        >
          {links.map(({ name, href }) => (
            <li key={name} className="border-b border-gray-100 last:border-0">
              <Link
                href={href}
                prefetch
                onClick={closeMenu}
                className="block px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-black hover:text-white"
              >
                {name}
              </Link>
            </li>
          ))}

          {!user && (
            <>
              <li className="border-t border-black">
                <Link
                  href={route("login")}
                  prefetch
                  onClick={closeMenu}
                  className="block px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-black hover:text-white"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href={route("register")}
                  prefetch
                  onClick={closeMenu}
                  className="block bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-black"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}