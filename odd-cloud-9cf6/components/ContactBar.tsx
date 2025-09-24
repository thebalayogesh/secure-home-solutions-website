// components/ContactTopbar.tsx

"use client"
import { Phone } from "lucide-react";

export default function ContactTopbar() {
  return (
    <div className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 px-4 py-3 text-gray-700 text-2xl">

        {/* Info Text */}
        <p className="font-medium text-center">
          For more Information:
        </p>

        {/* Phone Contact */}
        <a
          href="tel:+917550084414"
          className="flex items-center space-x-2 text-blue-600 font-semibold"
        >
          <Phone className="h-6 w-6 text-blue-700" />
          <span>+91 75500 84414</span>
        </a>
      </div>
    </div>
  );
}
