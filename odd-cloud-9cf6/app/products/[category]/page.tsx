import { getProductsByCategory, getAllProducts } from "@/lib/getProducts";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/types/product";
import products from "@/data/products.json";

// Generate category paths
export function generateStaticParams() {
  const categories = new Set<string>();
  products.forEach((p) => p.category.forEach((c: string) => categories.add(c)));
  return Array.from(categories).map((category) => ({ category }));
}

// 🔹 SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const productsByCategory = getProductsByCategory(category);
  const isValidCategory = productsByCategory.length > 0;

  const title = isValidCategory
    ? `${category} Products | Secure Home Solutions`
    : "All Products | Secure Home Solutions";

  const description = isValidCategory
    ? `Browse the best ${category} products at Secure Home Solutions. Explore features, prices, and specifications.`
    : "Explore all security products including safes, lockers, and more at Secure Home Solutions.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://homelockers.in/products/${isValidCategory ? category : ""}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Fetch products for category
  const productsByCategory: ProductType[] = getProductsByCategory(category);
  const isValidCategory = productsByCategory.length > 0;
  const displayProducts: ProductType[] = isValidCategory
    ? productsByCategory
    : getAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* SEO-friendly H1 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize text-center">
        {isValidCategory ? `${category} Products` : "All Products"}
      </h1>

      {/* Product grid */}
      {displayProducts.length > 0 ? (
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          aria-label="Product listings"
        >
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <p className="text-center text-gray-600">
          No products available right now.
        </p>
      )}
    </main>
  );
}
