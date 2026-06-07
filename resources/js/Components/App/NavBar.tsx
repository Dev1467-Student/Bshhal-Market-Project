import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import DepartmentNavBar from "./DepartmentNavBar";
import MobileMenu from "./NavBar/MobileMenu";
import Logo from "./NavBar/Logo";
import DesktopNavLinks from "./NavBar/DesktopNavLinks";
import RightSection from "./NavBar/RightSection";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth } = usePage<PageProps>().props;
  const { user } = auth;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="border-b border-black bg-white sticky top-0 z-50">
        <div className="mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 relative">
            {/* Left Section */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <MobileMenu
                isMenuOpen={isMenuOpen}
                toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                closeMenu={closeMenu}
                user={user}
              />
              <Logo />
            </div>

            {/* Center Section */}
            <DesktopNavLinks />

            {/* Right Section */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <RightSection user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Department Nav */}
      <DepartmentNavBar />
    </>
  );
}