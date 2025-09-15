"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types/product";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Format price properly with commas
  const formatPrice = (price: string | number) => {
    if (typeof price === "string") return price;
    return price.toLocaleString("en-IN");
  };

  return (
    <Link
      href={`/products/${product.category[0]}/${product.slug}`}
      className="group block rounded-lg border border-gray-200 hover:shadow-xl transition bg-white overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative w-full h-64">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Chip */}
        {product.category?.[0] && (
          <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
            {product.category[0]}
          </span>
        )}

        {/* Tag Badge */}
        {product.tags?.length ? (
          <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-medium shadow">
            {product.tags[0]}
          </span>
        ) : null}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description ?? "High-quality locker for secure storage."}
        </p>

        <p className="text-blue-600 font-bold mt-3 text-lg">
          ₹{formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
