import { Metadata } from "next";
import { getAllProducts } from "@/lib/getProducts";

export const metadata: Metadata = {
  title: "Search Products | Home Lockers",
  description:
    "Search Godrej home lockers and security safes.",
};

export default function SearchPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-16">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">
            Search Products
          </h1>

          <p className="mt-3 text-gray-500">
            Find the right locker for your needs.
          </p>
        </div>

        {/* Search functionality is handled by the Navbar overlay */}

      </div>
    </main>
  );
}
