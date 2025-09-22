// components/CategoryShowcase.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface Category {
  name: string;
  slug: string;
  image: string;
}

interface CategoryShowcaseProps {
  categories: Category[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Browse Categories
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products/${cat.slug}`}
            className="flex flex-col items-center rounded-lg shadow hover:shadow-lg overflow-hidden bg-white transition transform hover:-translate-y-1"
          >
            <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-36">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 8rem, (max-width: 768px) 9rem, (max-width: 1024px) 10rem, 11rem"
              />
            </div>
            <div className="p-2 text-center font-medium text-gray-800 truncate">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
