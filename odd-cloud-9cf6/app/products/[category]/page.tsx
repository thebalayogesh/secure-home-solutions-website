import { getProductsByCategory, getAllProducts } from "@/lib/getProducts";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/types/product";

// interface ProductCardProps {
//   product: ProductType;
// }

// app/products/[category]/page.tsx
export async function generateStaticParams() {
  return [
    { category: "lockers" },
    { category: "cctv" },
    { category: "digital-locks" },
  ];
}


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // 🔹 unwrap the params
  const { category } = await params;

  // Fetch products for category
  const products: ProductType[] = getProductsByCategory(category);

  // Fallback to all products if invalid category
  const isValidCategory = products.length > 0;
  const displayProducts: ProductType[] = isValidCategory
    ? products
    : getAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize text-center">
        {isValidCategory ? `${category} Products` : "All Products"}
      </h1>

      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No products available right now.
        </p>
      )}
    </main>
  );
}
