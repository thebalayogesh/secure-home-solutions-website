import { Metadata } from "next";
import Image from "next/image";
import { getAllProducts } from "@/lib/getProducts";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL("https://homelockers.in"),
  title: "Our Products | Home Lockers",
  description:
    "Browse our premium range of Godrej home lockers by security category.",
};

const categoryImages: Record<
  string,
  {
    image: string;
    title: string;
    description: string;
  }
> = {
  "10x": {
    image: "/images/categories/10x.jpg",
    title: "10X Security Lockers",
    description: "Reliable protection for everyday valuables.",
  },
  "200x": {
    image: "/images/categories/200x.jpg",
    title: "200X Security Lockers",
    description: "Advanced burglary resistant home lockers.",
  },
  "250x": {
    image: "/images/categories/250x.jpg",
    title: "250X Extreme Security",
    description: "Maximum protection for jewellery and documents.",
  },
  "300x": {
    image: "/images/300x/Godrej-Matrix-3016-1.webp",
    title: "300X High Security",
    description: "Premium safes engineered for ultimate protection.",
  },
};

export default function ProductsPage() {
  const products = getAllProducts();

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category[0];

    if (!acc[category]) acc[category] = [];

    acc[category].push(product);

    return acc;
  }, {} as Record<string, typeof products>);

  const categories = Object.keys(groupedProducts).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );

  return (
    <main className="bg-gray-50">

      {/* Hero */}

      <section className="relative h-[320px] overflow-hidden">
        <Image
          src="/images/seo-banner.jpg"
          fill
          priority
          alt="Home Lockers"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">
              Our Products
            </h1>

            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Explore premium Godrej security lockers categorized by burglary
              resistance and security level.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Category Navigation */}

      <div className="sticky top-0 z-50 bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-8 py-4 px-6 min-w-max">

            {categories.map((category) => (
              <a
                key={category}
                href={`#${category}`}
                className="group text-center shrink-0"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-blue-600 transition">

                  <Image
                    src={
                      categoryImages[category]?.image ??
                      "/images/categories/default.jpg"
                    }
                    alt={category}
                    fill
                    className="object-cover"
                  />

                </div>

                <p className="mt-2 font-semibold group-hover:text-blue-600">
                  {category.toUpperCase()}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Product Sections */}

      <div className="max-w-7xl mx-auto px-5 py-16">

        {categories.map((category) => {
          const info = categoryImages[category];

          return (
            <section
              key={category}
              id={category}
              className="scroll-mt-32 mb-20"
            >
              {/* Category Banner */}

              <div className="relative h-60 rounded-3xl overflow-hidden shadow-lg">

                <Image
                  src={info?.image ?? "/images/categories/default.jpg"}
                  fill
                  alt={category}
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/50 flex items-center">

                  <div className="px-10 text-white">

                    <h2 className="text-4xl font-bold">
                      {info?.title ?? category.toUpperCase()}
                    </h2>

                    <p className="mt-3 max-w-2xl text-lg">
                      {info?.description}
                    </p>

                  </div>

                </div>

              </div>

              {/* Products */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {groupedProducts[category].map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}