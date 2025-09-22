// components/FeaturedCategoryCarousel.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface Category {
  name: string;
  slug: string;
  image: string;
}

interface FeaturedCategoryCarouselProps {
  categories: Category[];
}

export default function FeaturedCategoryCarousel({ categories }: FeaturedCategoryCarouselProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Categories
        </h2>
        <p className="mt-2 text-gray-600">
          Browse our range of lockers and find the perfect fit for your home or office.
        </p>
      </div>

      {/* Horizontal Scroll / Marquee style */}
      <div className="overflow-x-auto no-scrollbar py-4">
        <div className="flex gap-6 min-w-max animate-marquee hover:pause-marquee">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="flex-shrink-0 w-48 md:w-60 rounded-lg shadow hover:shadow-xl overflow-hidden bg-white transition"
            >
              <div className="relative w-full h-32 md:h-40">
                <Image src={cat.image} alt={cat.name} fill className="object-cover" />
              </div>
              <div className="p-2 text-center font-medium text-gray-800">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* View All Categories Button */}
      <div className="text-center mt-8">
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          View All Categories
        </Link>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 25s linear infinite;
        }
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
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
