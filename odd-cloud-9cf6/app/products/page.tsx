// app/products/page.tsx
import { Metadata } from "next";
import { getAllProducts } from "@/lib/getProducts";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-static";


export const metadata: Metadata = {
  title: "Our Products | Lockers",
  description: "Explore our range of lockers including 10x, 100x, 250x, fire-resistant, and digital lockers.",
  openGraph: {
    title: "Our Products | Lockers",
    description: "Browse premium lockers by category.",
    url: "https://lockers.com/products",
    images: [
      {
        url: "/images/seo-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Lockers showcase",
      },
    ],
  },
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
