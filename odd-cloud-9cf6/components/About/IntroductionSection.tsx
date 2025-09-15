import React from "react";

export default function IntroductionSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-sky-700 mb-6">
          About Secure Home Solutions
        </h2>

        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
          We are Secure Home Solutions. Every home deserves <span className="font-semibold text-sky-800">safety, convenience</span>, and most importantly, <span className="font-semibold text-yellow-600">Peace Of Mind</span>.  
          We specialize in <span className="text-sky-700 font-medium">Godrej Security Solutions</span>, including Safe Lockers, CCTV Systems, Video Door Phones, and Digital Locks.
        </p>

        {/* Unique Tagline */}
        <p className="mt-8 text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 inline-block px-6 py-2 rounded-full shadow-lg">
          🔑 KEY TO YOUR PEACE OF MIND
        </p>

        {/* Optional Decorative Underline */}
        <div className="mt-4 h-1 w-24 mx-auto rounded-full bg-sky-500 opacity-70"></div>
      </div>
    </section>
  );
}
