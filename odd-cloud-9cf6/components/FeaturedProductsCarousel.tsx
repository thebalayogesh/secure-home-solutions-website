// components/FeaturedProductsCarousel.tsx
"use client";

import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/types/product";
import Link from "next/link";

interface FeaturedProductsCarouselProps {
  products: ProductType[];
}

export default function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Featured Products
        </h2>
        <p className="mt-2 text-gray-600">
          Explore our best-selling Godrej lockers for unmatched security and peace of mind.
        </p>
      </div>

      {/* Marquee / Horizontal Scroll */}
      <div className="overflow-x-auto no-scrollbar py-4">
        <div className="flex gap-6 min-w-max animate-marquee hover:pause-marquee">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-72">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* View All Lockers Button */}
      <div className="text-center mt-8">
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          View All Lockers
        </Link>
      </div>

      <style jsx>{`
        /* Marquee animation */
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }

        /* Pause animation on hover */
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-30%);
          }
        }

        /* Hide scrollbar for all browsers */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
