import ApplicationLogo from "@/Components/App/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/">
            <ApplicationLogo className="h-12 w-12 fill-current text-black" />
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            Multi-Vendor Marketplace
          </p>
        </div>
        <div className="border border-black bg-white px-8 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}