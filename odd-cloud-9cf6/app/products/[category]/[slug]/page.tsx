// app/products/[category]/[slug]/page.tsx
import { getProductBySlug } from "@/lib/getProducts";
import ProductPageClient from "@/components/ProductPageClient";
import { ProductType } from "@/types/product";
import products from "@/data/products.json";
import { Metadata } from "next";

// Base URL for absolute images
const BASE_URL = "https://www.homelockers.in";

// ✅ Pre-generate all product pages at build time
export function generateStaticParams() {
  return products.flatMap((p: ProductType) =>
    p.category.map((c: string) => ({
      category: c,
      slug: p.slug,
    }))
  );
}

// ✅ Generate per-product metadata for OG/Twitter
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;

  const product: ProductType | undefined = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Secure Home Solutions",
      description: "This product does not exist.",
    };
  }

  const seoDescription =
    product.description?.slice(0, 160) ||
    `Buy ${product.name} at Secure Home Solutions. Premium quality, secure storage, and durable design.`;

  const firstImage = product.images[0] || "/images/site/shs-ico.webp";
  const productImage = firstImage.startsWith("http")
    ? firstImage
    : `${BASE_URL}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`;

  return {
    title: `${product.name} | Secure Home Solutions`,
    description: seoDescription,
    openGraph: {
      title: product.name,
      description: seoDescription,
      url: `${BASE_URL}/products/${category}/${slug}`,
      siteName: "Secure Home Solutions",
      type: "website", // ✅ Must be "website" to avoid Next.js errors
      images: [productImage],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: seoDescription,
      images: [productImage],
    },
  };
}

// ✅ Product page component
export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const product: ProductType | undefined = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-600">
        Product not found
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.slug !== product.slug && p.category.includes(category))
    .slice(0, 4);

  const seoDescription =
    product.description?.slice(0, 160) ||
    `Buy ${product.name} at Secure Home Solutions. Premium quality, secure storage, and durable design.`;

  return (
    <>
      {/* JSON-LD Product schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.images.map((img) =>
              img.startsWith("http") ? img : `${BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`
            ),
            description: product.description || seoDescription,
            brand: { "@type": "Brand", name: "Secure Home Solutions" },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: new Intl.NumberFormat("en-IN").format(Number(product.price)),
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <ProductPageClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
