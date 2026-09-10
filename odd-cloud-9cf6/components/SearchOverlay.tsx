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

  // Close with Escape
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
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Desktop Search Panel */}
      <div className="fixed top-[72px] left-1/2 -translate-x-1/2 z-50 w-[min(600px,calc(100vw-32px))]">
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 h-12">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lockers..."
              autoFocus
              className="flex-1 min-w-0 outline-none text-[15px] text-gray-800 placeholder:text-gray-400"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 text-gray-400 hover:text-gray-700 transition"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 transition"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Initial State */}
          {!query.trim() && (
            <div className="border-t border-gray-100 px-4 py-3">
              <p className="text-xs text-gray-400">
                Search by product name, model or category
              </p>
            </div>
          )}

          {/* Results */}
          {query.trim() && (
            <div className="border-t border-gray-100">
              {results.length > 0 ? (
                <div className="max-h-[360px] overflow-y-auto">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.category}/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition"
                    >
                      {/* Image */}
                      <div className="relative w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[10px] text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-gray-800 truncate">
                          {product.name}
                        </h3>

                        {product.category?.length > 0 && (
                          <p className="text-xs text-gray-400 mt-0.5 truncate">
                            {product.category.join(", ")}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    No products found
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Try another product name or model.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
