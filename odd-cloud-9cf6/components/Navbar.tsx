"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Find Your Locker", href: "/guide" },

  // { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow top-0 left-0 right-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/site/shs-logo-2.webp"
              alt="Secure Home Solutions"
              width={300}
              height={60}
              priority
            />
          </Link>

          <div className="text-gray-500 text-3xl hidden sm:block">|</div>

          <Link href="/" className="flex items-center">
            <Image
              src="/images/site/godrej-logo.webp"
              alt="Godrej Brand"
              width={70}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-3 py-1 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <span
            className={`h-0.5 w-6 bg-gray-800 rounded transition-transform ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-gray-800 rounded transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-gray-800 rounded transition-transform ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-2 py-2 text-gray-700 rounded hover:bg-blue-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded mt-2 hover:bg-blue-700 transition"
              onClick={() => setOpen(false)}
            >
              Enquire
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
