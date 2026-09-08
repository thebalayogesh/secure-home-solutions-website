"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string | number;
  name: string;
  price: number;
  slug: string;
  description: string;
  category: string[];
  tags: string[];
  lock_mechanism: string;
  size: string;
  weight: string;
  volume: string;
  images: string[];
};

type Props = {
  products: Product[];
};

function normalize(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

function productSearchText(product: Product) {
  return [
    product.name,
    product.slug,
    product.description,
    ...(product.category || []),
    ...(product.tags || []),
    product.lock_mechanism,
    product.size,
    product.weight,
    product.volume,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getScore(product: Product, query: string) {
  if (!query) return 0;

  const q = normalize(query);
  const name = normalize(product.name);
  const slug = normalize(product.slug);
  const description = normalize(product.description);
  const tags = normalize(product.tags?.join(" "));
  const category = normalize(product.category?.join(" "));
  const lock = normalize(product.lock_mechanism);
  const volume = normalize(product.volume);

  let score = 0;

  // Exact product name
  if (name === q) score += 100;

  // Product name starts with query
  if (name.startsWith(q)) score += 70;

  // Product name contains query
  if (name.includes(q)) score += 50;

  // Slug
  if (slug.includes(q)) score += 35;

  // Category
  if (category.includes(q)) score += 30;

  // Tags
  if (tags.includes(q)) score += 30;

  // Lock mechanism
  if (lock.includes(q)) score += 25;

  // Volume
  if (volume.includes(q)) score += 20;

  // Description
  if (description.includes(q)) score += 10;

  return score;
}

export default function AdvancedProductSearch({
  products,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [lockType, setLockType] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const values = new Set<string>();

    products.forEach((product) => {
      product.category?.forEach((item) => {
        values.add(item);
      });
    });

    return Array.from(values).sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
      })
    );
  }, [products]);

  const lockTypes = useMemo(() => {
    const values = new Set<string>();

    products.forEach((product) => {
      if (product.lock_mechanism) {
        values.add(product.lock_mechanism);
      }
    });

    return Array.from(values);
  }, [products]);

  const results = useMemo(() => {
    const q = normalize(query);

    let filtered = products
      .map((product) => ({
        product,
        score: getScore(product, q),
      }))
      .filter(({ product, score }) => {
        const matchesSearch =
          !q || score > 0 || productSearchText(product).includes(q);

        const matchesCategory =
          category === "all" ||
          product.category?.some(
            (item) => normalize(item) === normalize(category)
          );

        const matchesLock =
          lockType === "all" ||
          normalize(product.lock_mechanism).includes(
            normalize(lockType)
          );

        return (
          matchesSearch &&
          matchesCategory &&
          matchesLock
        );
      });

    // Sorting
    if (sort === "relevance") {
      filtered.sort((a, b) => b.score - a.score);
    }

    if (sort === "price-low") {
      filtered.sort(
        (a, b) => Number(a.product.price) - Number(b.product.price)
      );
    }

    if (sort === "price-high") {
      filtered.sort(
        (a, b) => Number(b.product.price) - Number(a.product.price)
      );
    }

    if (sort === "name") {
      filtered.sort((a, b) =>
        a.product.name.localeCompare(b.product.name)
      );
    }

    return filtered.map((item) => item.product);
  }, [
    products,
    query,
    category,
    lockType,
    sort,
  ]);

  function submitSearch() {
    const value = query.trim();

    if (!value) {
      router.push("/search");
      return;
    }

    router.push(
      `/search?q=${encodeURIComponent(value)}`
    );
  }

  function clearAll() {
    setQuery("");
    setCategory("all");
    setLockType("all");
    setSort("relevance");

    router.push("/search");
  }

  return (
    <div>

      {/* Search box */}
      <div className="mx-auto max-w-4xl">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch();
          }}
        >
          <div className="flex overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm focus-within:border-black">

            <div className="flex flex-1 items-center">
              <span className="pl-5 text-xl">
                🔍
              </span>

              <input
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search lockers, biometric, digital, 10X..."
                className="w-full bg-transparent px-4 py-4 text-lg outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-black px-7 font-semibold text-white hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Quick searches */}
      <div className="mx-auto mt-5 flex max-w-4xl flex-wrap gap-2">
        <span className="mr-2 text-sm text-gray-500">
          Popular:
        </span>

        {[
          "Biometric",
          "Digital",
          "Keylock",
          "10x",
          "200x",
          "300x",
        ].map((item) => (
          <button
            key={item}
            onClick={() => {
              setQuery(item);
              router.push(
                `/search?q=${encodeURIComponent(item)}`
              );
            }}
            className="rounded-full border bg-white px-4 py-2 text-sm hover:border-black"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b pb-5">

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="rounded-lg border bg-white px-4 py-2 font-medium"
        >
          ⚙ Filters
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {results.length} products
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="rounded-lg border bg-white px-4 py-2"
          >
            <option value="relevance">
              Relevance
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="name">
              Name
            </option>
          </select>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Security Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="all">
                  All Categories
                </option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Lock */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Lock Type
              </label>

              <select
                value={lockType}
                onChange={(event) =>
                  setLockType(event.target.value)
                }
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="all">
                  All Lock Types
                </option>

                {lockTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear */}
            <div className="flex items-end">
              <button
                onClick={clearAll}
                className="w-full rounded-lg border px-4 py-3 font-medium hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Search heading */}
      {query && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            Results for "{query}"
          </h2>
        </div>
      )}

      {/* Results */}
      <div className="mt-8">

        {results.length === 0 ? (
          <div className="rounded-2xl bg-white py-20 text-center">
            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No lockers found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              We couldn't find a product matching your
              search. Try another name, category or lock type.
            </p>

            <button
              onClick={clearAll}
              className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}