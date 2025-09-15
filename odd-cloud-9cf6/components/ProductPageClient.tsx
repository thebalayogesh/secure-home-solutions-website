"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductType } from "@/types/product";

export default function ProductPageClient({ product }: { product: ProductType }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const totalImages = product.images.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Image Slider */}
        <div className="relative">
          <Image
            src={product.images[currentIndex]}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg shadow-lg object-cover w-full"
          />

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-3 gap-2">
            {product.images.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 w-2 rounded-full cursor-pointer transition ${
                  i === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-semibold mt-2">
            ₹{product.price}
          </p>

          {/* Specs */}
          <div className="mt-6 space-y-2 text-gray-800">
            {Array.isArray(product.size) && product.size.length > 0 && (
              <div>
                <strong>Size:</strong>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {product.size.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product.weight && (
              <p>
                <strong>Weight:</strong> {product.weight}
              </p>
            )}
            {product.volume && (
              <p>
                <strong>Volume:</strong> {product.volume}
              </p>
            )}
          </div>

          {/* Lock Mechanism */}
          {Array.isArray(product.lock_mechanism) &&
            product.lock_mechanism.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Lock Mechanism</h3>
                <div className="flex flex-wrap gap-2">
                  {product.lock_mechanism.map((lock, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
                    >
                      {lock}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Tags */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {Array.isArray(product.category) && product.category.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {product.category.map((cat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description ||
              "This locker is built with premium materials for secure storage."}
          </p>
        </div>
      </div>
    </main>
  );
}
