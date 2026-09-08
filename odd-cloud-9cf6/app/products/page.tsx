
import { Metadata } from "next";
import { getAllProducts } from "@/lib/getProducts";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL("https://homelockers.in"),
  title: "Our Products | Home Lockers",
  description:
    "Browse our premium range of Godrej home lockers by security category.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Our Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

