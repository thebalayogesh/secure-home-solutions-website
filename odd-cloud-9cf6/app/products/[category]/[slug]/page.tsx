import { getProductBySlug } from "@/lib/getProducts";
import ProductPageClient from "@/components/ProductPageClient";
import { ProductType } from "@/types/product"


// app/products/[category]/[slug]/page.tsx
export async function generateStaticParams() {
  return [
    { category: "lockers", slug: "godrej-premium-locker" },
    { category: "cctv", slug: "hikvision-indoor-camera" },
    { category: "digital-locks", slug: "smart-door-lock" },
  ];
}


export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const product: ProductType | undefined = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-600">
        Product not found
      </div>
    );
  }

  return <ProductPageClient product={product} />;
}
