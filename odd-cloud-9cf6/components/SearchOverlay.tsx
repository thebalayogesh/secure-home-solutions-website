"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

import { getAllProducts } from "@/lib/getProducts";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({
  open,
  onClose,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const products = getAllProducts();

  const results =
    query.trim().length > 0
      ? products
          .filter((product) => {
            const searchText = [
              product.name,
              product.slug,
              product.category?.join(" "),
            ]
              .join(" ")
              .toLowerCase();

            return searchText.includes(query.toLowerCase());
          })
          .slice(0, 6)
      : [];

  // Close with Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Search Panel */}
      <div
        className="absolute left-0 right-0 z-50 bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-t border-gray-200">
          <div className="w-full px-4 py-4">
            {/* Search Bar */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 h-14 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />

              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search lockers..."
                autoFocus
                className="flex-1 min-w-0 outline-none text-base text-gray-800 placeholder:text-gray-400"
              />

              {/* Clear Search */}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-gray-400 hover:text-gray-700 transition"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Close Search */}
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-gray-500 hover:text-gray-800 transition"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Initial State */}
            {!query.trim() && (
              <div className="py-5 text-center">
                <p className="text-sm text-gray-500">
                  Search by product name, model or security category
                </p>
              </div>
            )}

            {/* Search Results */}
            {query.trim() && (
              <div className="mt-3 pb-2">
                {results.length > 0 ? (
                  <div className="max-h-[50vh] overflow-y-auto divide-y divide-gray-100">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.category}/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-gray-50 transition"
                      >
                        {/* Product Image */}
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-xs text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                        {/* Product Information */}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-800 truncate">
                            {product.name}
                          </h3>

                          {product.category?.length > 0 && (
                            <p className="text-sm text-gray-500 mt-1 truncate">
                              {product.category.join(", ")}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* No Results */
                  <div className="py-6 text-center">
                    <p className="font-medium text-gray-700">
                      No products found
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Try another product name or model.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}