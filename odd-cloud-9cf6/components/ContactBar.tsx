// components/ContactTopbar.tsx

"use client"
import { Phone } from "lucide-react";

export default function ContactTopbar() {
  return (
    <div className="w-full text-sm bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-2">

        {/* Left: Phone */}
        <div className="flex items-center space-x-2">
          {/* <Phone className="h-4 w-4 text-blue-600" /> */}
          For more Information : 
          <a href="tel:+917550084414" className="text-blue-600 text-xl">
             📞 +91 75500 84414
          </a>
        </div>
      </div>
    </div>
  );
}
