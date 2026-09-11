// app/products/[category]/[slug]/page.tsx

import { Metadata } from "next";


import { getProductBySlug } from "@/lib/getProducts";
import ProductPageClient from "@/components/ProductPageClient";

import { ProductType } from "@/types/product";
import products from "@/data/products.json";


const BASE_URL = "https://www.homelockers.in";

// --------------------------------------------------
// Pre-generate all product pages at build time
// --------------------------------------------------

export function generateStaticParams() {
  return products.flatMap((product: ProductType) =>
    product.category.map((category: string) => ({
      category,
      slug: product.slug,
    }))
  );
}

// --------------------------------------------------
// Generate SEO + Open Graph metadata
// --------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}): Promise<Metadata> {
  const { category, slug } = await params;

  const product: ProductType | undefined = getProductBySlug(slug);

  // Product not found
  if (!product) {
    return {
      title: "Product Not Found | Secure Home Solutions",
      description: "This product does not exist.",
    };
  }

  // --------------------------------------------------
  // Basic product information
  // --------------------------------------------------

  const productName = product.name;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(product.price));

  const formattedWeight = product.weight;

  const formattedSize =
    product.size?.[0]?.replace("(cm)", "").trim() || "";

  const volume = product.volume
    ? `${product.volume}`
    : "";

  // --------------------------------------------------
  // Normal SEO description
  // --------------------------------------------------

  const seoDescription =
    product.description?.slice(0, 160) ||
    `Buy ${productName} from Secure Home Solutions. Premium security, durable construction, and reliable protection for your home.`;

  // --------------------------------------------------
  // OG description
  //
  // Keep this SHORT.
  // WhatsApp/Facebook/LinkedIn previews have limited space.
  // --------------------------------------------------

  let ogDescription = "";

  if (category === "locks") {
    const methods =
      product.lock_mechanism?.join(" + ").toUpperCase() || "";

    ogDescription = [
      formattedPrice,
      methods ? `Unlock: ${methods}` : "",
      "Smart keyless security",
    ]
      .filter(Boolean)
      .join(" ");
  } else {
    ogDescription = [
      formattedPrice,
      formattedWeight,
      formattedSize ? `${formattedSize} cm` : "",
      volume ? `${volume} capacity` : "",

    ]
      .filter(Boolean)
      .join(" • ");
  }

  // Add a short business description
  ogDescription += " • Secure Home Solutions";

  // --------------------------------------------------
  // Product image
  // --------------------------------------------------

  const firstImage =
    product.images?.[0] || "/images/site/shs-ico.webp";

  const productImage = firstImage.startsWith("http")
    ? firstImage
    : `${BASE_URL}${firstImage.startsWith("/") ? "" : "/"
    }${firstImage}`;

  // --------------------------------------------------
  // Canonical product URL
  // --------------------------------------------------

  const productUrl =
    `${BASE_URL}/products/${category}/${slug}`;

  // --------------------------------------------------
  // Metadata
  // --------------------------------------------------

  return {
    title: `${productName} | Secure Home Solutions`,

    description: seoDescription,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      title: productName,

      description: ogDescription,

      url: productUrl,

      siteName: "Secure Home Solutions",

      locale: "en_IN",

      type: "website",

      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: productName,

      description: seoDescription,

      images: [
        {
          url: productImage,
          alt: productName,
        },
      ],
    },
  };
}

// --------------------------------------------------
// Product Page
// --------------------------------------------------

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}) {
  const { category, slug } = await params;

  const product: ProductType | undefined =
    getProductBySlug(slug);

  // --------------------------------------------------
  // Product not found
  // --------------------------------------------------

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-600">
        Product not found
      </div>
    );
  }

  // --------------------------------------------------
  // Related products
  // --------------------------------------------------

  const relatedProducts = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.category.includes(category)
    )
    .slice(0, 4);

  // --------------------------------------------------
  // Product SEO description
  // --------------------------------------------------

  const seoDescription =
    product.description?.slice(0, 160) ||
    `Buy ${product.name} from Secure Home Solutions. Premium security, durable construction, and reliable protection for your home.`;

  // --------------------------------------------------
  // JSON-LD Product Schema
  // --------------------------------------------------

  const productImages = (product.images || []).map((img) =>
    img.startsWith("http")
      ? img
      : `${BASE_URL}${img.startsWith("/") ? "" : "/"
      }${img}`
  );

  return (
    <>
      {/* ---------------------------------------------
          Product Structured Data
      ---------------------------------------------- */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",

            name: product.name,

            image: productImages,

            description:
              product.description || seoDescription,

            brand: {
              "@type": "Brand",
              name: "Godrej",
            },

            offers: {
              "@type": "Offer",

              priceCurrency: "INR",

              price: product.price,

              availability:
                "https://schema.org/InStock",

              url:
                `${BASE_URL}/products/${category}/${slug}`,
            },
          }),
        }}
      />

      {/* ---------------------------------------------
          Product UI
      ---------------------------------------------- */}

      <ProductPageClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}