import Link from "next/link";
import React from "react";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-sky-600 to-sky-500 py-16 px-4 text-white text-center relative overflow-hidden">
      {/* Decorative shapes for visual interest */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
          Secure Your Home Today with Godrej Lockers!
        </h3>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Protect what matters most. Quick, reliable, and designed for your peace of mind.
        </p>
        <Link
          href="https://wa.me/917550084414?text=I'm%20interested%20in%20Lockers"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-sky-700 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition transform"
        >
          Chat on WhatsApp
        </Link>
      </div>
    </section>
  );
}
