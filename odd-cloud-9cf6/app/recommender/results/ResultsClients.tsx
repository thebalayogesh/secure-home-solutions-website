"use client";

import { useSearchParams, useRouter } from "next/navigation";
import rawProducts from "@/data/raw/products.json";
import ProductCard from "@/components/ProductCardRecommender";

import {
  Product,
  RawProduct,
  ProductTag,
  RecommendedProduct,
} from "@/types/product";

/* ---------- types ---------- */

type Cm = {
  height: number;
  width: number;
  depth: number;
};

/* ---------- constants ---------- */

const ALLOWED_TAGS: ProductTag[] = [
  "best-fit",
  "also-fits",
  "recommended",
  "best-seller",
  "fire-resistant",
];

const FIRE_KEYWORDS = ["fire-resistant"];

/* ---------- normalization ---------- */

function normalizeProducts(raw: RawProduct[]): Product[] {
  return raw.map((p) => ({
    ...p,
    tags: p.tags?.filter((t): t is ProductTag =>
      ALLOWED_TAGS.includes(t as ProductTag)
    ),
  }));
}

/* ---------- data guards (CRITICAL) ---------- */

function isUsableLocker(p: Product) {
  if (!p.dimensions?.cm) return false;

  // Exclude gifts
  if (p.category?.includes("gift")) return false;

  const { height, width, depth } = p.dimensions.cm;

  // Guard broken data (ex: 400cm depth)
  if (height > 300 || width > 300 || depth > 450) return false;

  return true;
}

/* ---------- fit helpers ---------- */

// STRICT physical fit
function fitsHeightFirst(
  space: Cm,
  locker: Cm,
  heightTolerance = 1.08,   // ⭐ main tolerance
  sideTolerance = 1.15     // width & depth flexibility
) {
  // 1️⃣ Height is strict (with tolerance)
  if (locker.height > space.height * heightTolerance) {
    return false;
  }

  // 2️⃣ Width & depth are soft constraints
  if (space.width && locker.width > space.width * sideTolerance) {
    return false;
  }

  if (space.depth && locker.depth > space.depth * sideTolerance) {
    return false;
  }

  return true;
}


// TOLERANT fit (real-world)
function fitsWithTolerance(
  space: Cm,
  locker: Cm,
  toleranceRatio = 1.08 // ⭐ explained below
) {
  const tol = {
    height: space.height * toleranceRatio,
    width: space.width * toleranceRatio,
    depth: space.depth * toleranceRatio,
  };

  const rotations = [
    [locker.height, locker.width, locker.depth],
    [locker.width, locker.height, locker.depth],
    [locker.depth, locker.width, locker.height],
  ];

  return rotations.some(
    ([h, w, d]) =>
      h <= tol.height && w <= tol.width && d <= tol.depth
  );
}

/* ---------- recommenders ---------- */

function recommendExact(
  products: Product[],
  space: Cm,
  limit = 50
): RecommendedProduct[] {
  const userVol = space.height * space.width * space.depth;

  return products
    .filter(isUsableLocker)
    .filter(
      (p) =>
        !p.tags?.includes("fire-resistant") &&
        !p.category?.includes("fire-resistant")
    )
    .filter((p) => fitsHeightFirst(space, p.dimensions!.cm))
    .map((p) => {
      const d = p.dimensions!.cm;
      const lockerVol = d.height * d.width * d.depth;

      return {
        ...p,
        _fitScore: Math.abs(userVol - lockerVol),
        _lockerVol: lockerVol,
      };
    })
    .sort((a, b) => a._fitScore - b._fitScore)
    .slice(0, limit);
}

function recommendSlightlyBigger(
  products: Product[],
  space: Cm,
  exactIds: Set<string>,
  limit = 4
): RecommendedProduct[] {
  const userVol = space.height * space.width * space.depth;

  return products
    .filter(isUsableLocker)
    .filter(
      (p) =>
        !p.tags?.includes("fire-resistant") &&
        !p.category?.includes("fire-resistant")
    )
    .filter((p) => !exactIds.has(p.id))
    .filter((p) => fitsWithTolerance(space, p.dimensions!.cm))
    .map((p) => {
      const d = p.dimensions!.cm;
      const lockerVol = d.height * d.width * d.depth;
      const ratio = lockerVol / userVol;

      return {
        ...p,
        _lockerVol: lockerVol,
        _fitRatio: ratio,
      };
    })
    .filter((p) => p._fitRatio > 1 && p._fitRatio <= 1.08)
    .sort((a, b) => a._fitRatio - b._fitRatio)
    .slice(0, limit);
}

function recommendFire(
  products: Product[],
  space: Cm,
  limit = 6
): RecommendedProduct[] {
  return products
    .filter(isUsableLocker)
    .filter(
      (p) =>
        p.tags?.includes("fire-resistant") ||
        p.category?.includes("fire-resistant")
    )
    .filter((p) => fitsHeightFirst(space, p.dimensions!.cm))
    .slice(0, limit);
}

/* ---------- data ---------- */

const products = normalizeProducts(rawProducts);

/* ---------- page ---------- */

export default function ResultsClient() {
  const params = useSearchParams();
  const router = useRouter();

  const h = Number(params.get("h"));
  const w = Number(params.get("w"));
  const d = Number(params.get("d"));
  const unit = params.get("unit") === "ftin" ? "ftin" : "cm";

  if (!h || !w || !d) {
    router.replace("/locker-recommender");
    return null;
  }

  const space: Cm = { height: h, width: w, depth: d };

  const exactFits = recommendExact(products, space);
  const exactIds = new Set(exactFits.map((p) => p.id));
  const slightlyBigger = recommendSlightlyBigger(
    products,
    space,
    exactIds
  );
  const fireLockers = recommendFire(products, space);

  const bestFit = exactFits[0];
  const alsoFits = exactFits.slice(1, 6);

  return (
    <div className="bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-center">
          Recommended Lockers
        </h1>

        {bestFit && (
          <section>
            <h2 className="text-sm font-semibold mb-3">
              Best Fit ⭐
            </h2>
            <ProductCard
              product={bestFit}
              unit={unit}
              recommendationType="best-fit"
              position={0}
            />
          </section>
        )}

        {alsoFits.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold mb-3">
              Also Fits
            </h3>
            <div className="bg-white rounded-lg border divide-y">
              {alsoFits.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  unit={unit}
                  recommendationType="also-fits"
                  position={i + 1}
                />
              ))}
            </div>
          </section>
        )}

        {slightlyBigger.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold mb-2">
              Slightly Bigger (Installation Margin)
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Up to ~1–2 inches larger. Usually fits with minor adjustment.
            </p>
            <div className="bg-white rounded-lg border divide-y">
              {slightlyBigger.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  unit={unit}
                  recommendationType="recommended"
                  position={i}
                />
              ))}
            </div>
          </section>
        )}

        {fireLockers.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold mb-3">
              Fire-Resistant 🔥
            </h3>
            <div className="bg-white rounded-lg border divide-y">
              {fireLockers.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  unit={unit}
                  recommendationType="fire-resistant"
                  position={i}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
