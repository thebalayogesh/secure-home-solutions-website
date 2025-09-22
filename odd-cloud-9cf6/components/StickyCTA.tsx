// components/StickyCTA.tsx
"use client";

import { Phone, MessageCircle } from "lucide-react";

interface StickyCTAProps {
  phoneNumber: string;       // e.g. "+917550084414"
  whatsappNumber: string;    // e.g. "917550084414"
}

export default function StickyCTA({ phoneNumber, whatsappNumber }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg flex md:hidden z-50">
      {/* Call Now Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-blue-600 hover:bg-blue-700 font-medium transition"
        aria-label="Call Now"
      >
        <Phone className="w-5 h-5" /> Call Now
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-green-600 hover:bg-green-700 font-medium transition"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp
      </a>
    </div>
  );
}
