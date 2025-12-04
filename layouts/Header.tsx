"use client";

import { logo } from "@/assets";
import { headerLinks, HeaderLink, DropdownItem } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  // --- STATE ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // --- REFS ---
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  // Toggle mobile menu
  const toggleMobileMenu = () =>
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) setOpenDropdown(null);
      return next;
    });

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  // Click outside to close
  useEffect(() => {
    function handleDocClick(e: MouseEvent | TouchEvent) {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocClick);
    document.addEventListener("touchstart", handleDocClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("touchstart", handleDocClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between md:h-[120px] h-24">
          {/* Logo */}
          <Link href="/">
            <Image
              className="md:h-[150px] md:w-[200px] h-[100px] w-[150px]"
              width={150}
              height={150}
              alt="logo"
              src={logo}
            />
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden lg:flex items-center space-x-6">
            {headerLinks.map((link) => (
              <li key={link.title} className="relative flex items-center">
                {!link.dropdownItems ? (
                  <Link
                    href={link.link}
                    className="text-black hover:text-gray-300 font-medium transition-colors duration-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {link.title}
                  </Link>
                ) : (
                  <span className="text-black font-medium">{link.title}</span>
                )}

                {link.dropdownItems && (
                  <button
                    type="button"
                    aria-expanded={openDropdown === link.title}
                    aria-controls={`${link.title}-menu`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(link.title);
                    }}
                    className="ml-1 text-black hover:text-gray-300 transition-colors"
                  >
                    <Icon
                      icon={
                        openDropdown === link.title
                          ? "mdi:chevron-up"
                          : "mdi:chevron-down"
                      }
                      className="text-lg"
                    />
                  </button>
                )}

                {link.dropdownItems && openDropdown === link.title && (
                  <ul
                    id={`${link.title}-menu`}
                    role="menu"
                    className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-xl py-2 z-50 transition-opacity duration-150"
                  >
                    {link.dropdownItems.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.link}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg" aria-label="Search">
              <Icon icon="ic:baseline-search" className="text-black text-xl" />
            </button>

            <Link
              target="_blank"
              href="https://www.instagram.com/spl_designhaven?igsh=Z3V3cWR2ZTlsbGZh"
            >
              <button className="cursor-pointer bg-black text-white rounded-lg shadow-md px-3 py-2 lg:px-5 lg:py-3 text-sm lg:text-base font-medium hover:bg-gray-800 transition-colors duration-200">
                Get In Touch
              </button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            type="button"
          >
            <Icon
              icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
              className="h-6 w-6 text-black"
            />
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[600px] opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t">
            {headerLinks.map((link) => (
              <div key={link.title}>
                {link.dropdownItems ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(link.title)}
                      className="flex justify-between items-center w-full px-3 py-3 text-base font-medium text-black"
                      aria-expanded={openDropdown === link.title}
                    >
                      {link.title}

                      <Icon
                        icon={
                          openDropdown === link.title
                            ? "mdi:chevron-up"
                            : "mdi:chevron-down"
                        }
                        className="text-black text-lg"
                      />
                    </button>

                    {openDropdown === link.title && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.link}
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 text-sm font-medium text-black/90 hover:bg-gray-100 rounded-md"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.link}
                    onClick={closeMobileMenu}
                    className="block px-3 py-3 text-base font-medium text-black"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            {/* MOBILE ACTIONS */}
            <div className="pt-3 border-t mt-3">
              <div className="flex items-center gap-3 px-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-black rounded-lg px-4 py-3"
                  onClick={closeMobileMenu}
                >
                  <Icon icon="ic:baseline-search" className="text-black text-lg" />
                  <span className="text-sm font-medium">Search</span>
                </button>

                <Link target="_blank" href="/">
                  <button
                    className="flex-1 bg-black text-white rounded-lg px-4 py-3 text-sm font-medium"
                    onClick={closeMobileMenu}
                  >
                    Get In Touch
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
