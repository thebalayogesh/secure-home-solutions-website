// app/products/[category]/[slug]/page.tsx
import { getProductBySlug } from "@/lib/getProducts";
import ProductPageClient from "@/components/ProductPageClient";
import { ProductType } from "@/types/product";
import products from "@/data/products.json";

// ✅ Pre-generate all product pages for static export
export function generateStaticParams() {
  return products.flatMap((p: ProductType) =>
    p.category.map((c: string) => ({
      category: c,
      slug: p.slug,
    }))
  );
}

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

  // ✅ Related products: same category, excluding current product
  const relatedProducts = products
    .filter(
      (p) => p.slug !== product.slug && p.category.includes(category)
    )
    .slice(0, 4); // show max 4

  return (
    <ProductPageClient product={product} relatedProducts={relatedProducts} />
  );
}
