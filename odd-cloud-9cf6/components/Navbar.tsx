"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import SearchOverlay from "@/components/SearchOverlay";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Find Your Locker", href: "/guide" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeMobileMenu = () => {
    setOpen(false);
  };

  const openSearch = () => {
    setOpen(false);
    setSearchOpen(true);
  };

  return (
    <nav className="bg-white shadow ">

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center">

            {/* SHS Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/site/shs-logo-2.webp"
                alt="Secure Home Solutions"
                width={300}
                height={60}
                priority
                className="w-[300px] sm:w-[300px] md:w-[320px] h-auto"
              />
            </Link>

            {/* Divider */}
            <div className="hidden sm:block text-gray-400 text-3xl mx-3">
              |
            </div>

            {/* Godrej Logo */}
            <Link
              href="/"
              className="hidden sm:flex items-center"
            >
              <Image
                src="/images/site/godrej-logo.webp"
                alt="Godrej Brand"
                width={70}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {item.label}
              </Link>
            ))}

            {/* Desktop Search */}
            {/* <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="flex items-center justify-center w-9 h-9 rounded-full text-gray-800 hover:text-blue-600 hover:bg-gray-100 transition"
            >
              <Search
                className="h-5 w-5"
                strokeWidth={2}
              />
            </button> */}

            {/* Contact */}
            <Link
              href="/contact"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>

          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">

            {/* Mobile Search */}
            {/* <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="flex items-center justify-center w-10 h-10 rounded-full text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition"
            >
              <Search
                className="h-5 w-5"
                strokeWidth={2}
              />
            </button> */}

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 active:bg-gray-200 transition"
            >
              {open ? (
                <X
                  className="h-6 w-6 text-gray-800"
                  strokeWidth={2}
                />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className="block w-6 h-0.5 bg-gray-800 rounded" />
                  <span className="block w-6 h-0.5 bg-gray-800 rounded" />
                  <span className="block w-6 h-0.5 bg-gray-800 rounded" />
                </div>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3">

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="block px-3 py-3 text-gray-700 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Contact */}
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block w-full mt-3 px-4 py-3 text-center bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>

          </div>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

    </nav>
  );
}

