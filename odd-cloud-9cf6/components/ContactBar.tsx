"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Search } from "lucide-react";
import SearchOverlay from "@/components/SearchOverlay";

export default function ContactTopbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2">

          {/* Mobile */}
          <div className="relative flex sm:hidden flex-col items-center gap-1">

            {/* Authorised Godrej Seller */}
            <div className="flex items-center justify-center gap-0 text-base">
              <span className="font-semibold text-gray-800">
                Authorised
              </span>

              <Image
                src="/images/site/godrej-logo.webp"
                alt="Godrej"
                width={70}
                height={28}
                className="object-contain"
              />

              <span className="font-semibold text-gray-800">
                Seller
              </span>
            </div>

            {/* Phone */}
            <a
              href="tel:+917550084414"
              className="flex items-center justify-center gap-1 text-blue-600 font-bold text-lg"
            >
              <Phone
                className="w-4 h-4 text-blue-700"
                strokeWidth={2.5}
              />

              <span>+91 75500 84414</span>
            </a>

            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="absolute right-0 top-4 flex items-center justify-center w-9 h-9 rounded-full text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition"
            >
              <Search
                className="w-6 h-6"
                strokeWidth={2}
              />
            </button>

          </div>

          {/* Desktop */}
          <div className="hidden sm:flex relative items-center justify-center">

            {/* Center Content */}
            <div className="flex items-center justify-center">

              {/* Authorised Godrej Seller */}
              <div className="flex items-center gap-0 text-xl">
                <span className="font-semibold text-gray-800">
                  Authorised
                </span>

                <Image
                  src="/images/site/godrej-logo.webp"
                  alt="Godrej"
                  width={80}
                  height={30}
                  className="object-contain"
                />

                <span className="font-semibold text-gray-800">
                  Seller
                </span>
              </div>

              {/* Phone */}
              <a
                href="tel:+917550084414"
                className="ml-4 flex items-center gap-1 text-blue-600 font-bold text-xl"
              >
                <Phone
                  className="w-5 h-5 text-blue-700"
                  strokeWidth={2.5}
                />

                <span>+91 75500 84414</span>
              </a>

            </div>

            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="absolute right-0 flex items-center justify-center w-10 h-10 rounded-full text-gray-800 hover:text-blue-600 hover:bg-gray-100 transition"
            >
              <Search
                className="w-5 h-5"
                strokeWidth={2}
              />
            </button>

          </div>

        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}