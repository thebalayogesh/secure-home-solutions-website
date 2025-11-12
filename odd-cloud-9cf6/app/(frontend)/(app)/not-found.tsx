// app/not-found.tsx or pages/404.tsx (Next.js 13+)
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // redirect to home page
      // If you want to redirect to products page instead:
      // router.push("/products");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4 text-center">
      <h1 className="text-6xl md:text-7xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist. You will be redirected shortly.
      </p>
      <div className="mt-4">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
}
