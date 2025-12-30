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

const FIRE_KEYWORDS = [
  "fire resistant",
  "fire-resistan",
  "fire rated",
  "fire-proof",
  "fireproof",
  "fire protection",
];

/* ---------- normalization ---------- */

function normalizeProducts(raw: RawProduct[]): Product[] {
  return raw.map((p) => ({
    ...p,
    tags: p.tags?.filter((t): t is ProductTag =>
      ALLOWED_TAGS.includes(t as ProductTag)
    ),
  }));
}

/* ---------- helpers ---------- */

function fits(space: Cm, locker: Cm) {
  if (
    locker.height <= space.height &&
    locker.width <= space.width &&
    locker.depth <= space.depth
  ) {
    return true;
  }

  const rotations = [
    [locker.width, locker.height, locker.depth],
    [locker.depth, locker.width, locker.height],
    [locker.height, locker.depth, locker.width],
  ];

  return rotations.some(
    ([h, w, d]) => h <= space.height && w <= space.width && d <= space.depth
  );
}

function recommend(
  products: Product[],
  space: Cm,
  limit = 50
): RecommendedProduct[] {
  const userVol = space.height * space.width * space.depth;

  return products
    .filter((p) => p.dimensions?.cm)
    .filter((p) => fits(space, p.dimensions.cm))
    .map((p) => {
      const d = p.dimensions.cm;
      const lockerVol = d.height * d.width * d.depth;

      return {
        ...p,
        _fitScore: Math.abs(userVol - lockerVol),
        _lockerVol: lockerVol,
      };
    })
    .sort((a, b) => {
      if (a._fitScore !== b._fitScore) {
        return a._fitScore - b._fitScore;
      }
      return b._lockerVol - a._lockerVol;
    })
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

  // 🔑 Compute ONCE
  const allFits = recommend(products, space, 50);

  // const userVol = space.height * space.width * space.depth;

  const bestFit = allFits[0];
  const alsoFits = allFits.slice(1, 6);

  const bestSellers = allFits
    .filter((p) => p.tags?.includes("best-seller"))
    .slice(0, 4);

  const featured = allFits
    .filter((p) => p.tags?.includes("recommended"))
    .slice(0, 4);

  
const documentSafe = allFits
  .filter(
    (p) =>
      p.tags?.includes("fire-resistant") ||
      p.category?.some((f) =>
        FIRE_KEYWORDS.some((k) =>
          f.toLowerCase().includes(k)
        )
      )
  )
  .slice(0, 4);

  // const futureProof = allFits
  //   .filter((p) => {
  //     const ratio = p._lockerVol / userVol;
  //     return ratio > 1.1 && ratio <= 1.4;
  //   })
  //   .slice(0, 4);

  // const bigOptions = allFits
  //   .filter((p) => {
  //     const ratio = p._lockerVol / userVol;
  //     return ratio > 1.4;
  //   })
  //   .slice(0, 3);

  return (
    <div className="bg-gray-50">
      {/* MAIN CONTENT (under header) */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {/* PAGE TITLE */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center">
            Recommended Lockers
          </h1>

          {/* <p className="text-sm text-gray-600 mt-1">
          Based on your available space:{" "}
          <strong>
            {unit === "cm"
              ? `${h} × ${w} × ${d} cm`
              : `${h} × ${w} × ${d} (converted from ft/in)`}
          </strong>
        </p> */}
        </div>

        {/* NO RESULTS */}
        {allFits.length === 0 && (
          <div className="bg-white rounded-lg border p-6 text-center max-w-xl">
            <p className="font-medium mb-2">No locker fits this exact space.</p>

            <p className="text-sm text-gray-600 mb-4">
              Try increasing one of the dimensions slightly.
            </p>

            <button
              className="underline text-sm"
              onClick={() => router.push("/locker-recommender")}
            >
              Change measurements
            </button>
          </div>
        )}

        {/* RESULTS GRID */}
        {allFits.length > 0 && (
          <div className="space-y-8">
            {/* BEST FIT */}
            {bestFit && (
              <section>
                <h2 className="text-sm font-semibold mb-3">
                  ⭐ Best Fit for Your Space
                </h2>

                <div className="bg-white rounded-lg border">
                  <ProductCard
                    product={bestFit}
                    unit={unit}
                    recommendationType="best-fit"
                    position={0}
                  />
                </div>
              </section>
            )}

            {/* ALSO FITS */}
            {alsoFits.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold mb-3">
                  Also Fits Your Space
                </h3>

                <div className="bg-white rounded-lg border divide-y">
                  {alsoFits.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      unit={unit}
                      recommendationType="also-fits"
                      position={index + 1}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* BEST SELLERS */}
            {bestSellers.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold mb-3">🔥 Best Sellers</h3>

                <div className="bg-white rounded-lg border divide-y">
                  {bestSellers.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      unit={unit}
                      recommendationType="recommended"
                      position={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* FEATURED */}
            {featured.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold mb-3">
                  ⭐ Expert Recommended
                </h3>

                <div className="bg-white rounded-lg border divide-y">
                  {featured.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      unit={unit}
                      recommendationType="recommended"
                      position={index}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* document safe */}
        {documentSafe.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold mb-3">
              📄 Document Safe (Fire-Resistant)
            </h3>

            <p className="text-xs text-gray-600 mb-2">
              Ideal for storing important documents, certificates, and
              valuables.
            </p>

            {documentSafe.length > 0 ? (
              <div className="bg-white rounded-lg border divide-y">
                {documentSafe.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    unit={unit}
                    recommendationType="fire-resistant"
                    position={index}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-4 text-sm text-gray-600">
                No fire-resistant locker fits this exact space.
                <br />
                <span className="block mt-1 text-xs">
                  Consider increasing depth or width slightly, or explore larger
                  document safes.
                </span>
              </div>
            )}
          </section>
        )}
      </section>
    </div>
  );
}
