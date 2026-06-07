import React, { useRef, useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

type AuthSectionProps = {
  user: any;
};

export default function AuthSection({ user }: AuthSectionProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (user) {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-black hover:text-white"
        >
          <User className="h-3.5 w-3.5" />
          {user.name}
          <ChevronDown className="h-3 w-3" />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 w-48 border border-black bg-white">
            <Link
              href={route("profile.edit")}
              prefetch
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-wide text-black transition-all duration-200 hover:bg-black hover:text-white"
            >
              <Settings className="h-3.5 w-3.5" />
              Profile
            </Link>

            <div className="border-t border-gray-100" />

            <Link
              href={route("logout")}
              method="post"
              as="button"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-wide text-black transition-all duration-200 hover:bg-black hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log Out
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden lg:flex lg:items-center lg:gap-2">
      <Link
        href={route("login")}
        prefetch
        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-black border border-black transition-all duration-200 hover:bg-black hover:text-white"
      >
        Log in
      </Link>
      <Link
        href={route("register")}
        prefetch
        className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-black text-white border border-black transition-all duration-200 hover:bg-white hover:text-black"
      >
        Register
      </Link>
    </div>
  );
}