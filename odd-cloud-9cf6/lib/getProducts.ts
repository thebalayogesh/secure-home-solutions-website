import products from "@/data/products.json";

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) =>
    p.category.some((cat: string) => cat === category)
  );
}