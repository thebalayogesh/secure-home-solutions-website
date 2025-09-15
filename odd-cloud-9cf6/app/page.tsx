
// import HeroSection from "@/components/HeroSection";
import ContentSection from "@/components/ContentSection";
import products from "@/data/products.json";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import HeroCarousel from "@/components/HeroCarousel";
// import FeaturedProducts from "@/components/FeaturedProducts";

export const dynamic = "force-static";

const slides = [
  {
    title: "Secure Your Home Today",
    description: "Explore Godrej lockers for ultimate home security.",
    imageSrc: "/images/250x/Godrej-Matrix-3016.webp",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    title: "Advanced CCTV Systems",
    description: "Stay connected and monitor your home in real-time.",
    imageSrc: "/images/250x/Godrej-Matrix-3016.webp",
    buttonText: "Learn More",
    buttonLink: "#cctv",
  },
  {
    title: "Smart Digital Locks",
    description: "Modern locking solutions for convenience and safety.",
    imageSrc: "/images/250x/Godrej-Matrix-3016.webp",
    buttonText: "Explore Locks",
    buttonLink: "#locks",
  },
];


export default function Home() {
  const featuredProducts = products.filter((p) =>
    p.tags?.includes("featured")
  );

  return (
    <>
      <HeroCarousel slides={slides} />

      <ContentSection
        title="Advanced CCTV Surveillance"
        description="Stay connected and secure with high-definition Godrej CCTV systems, perfect for homes and businesses."
        buttonText="Explore CCTV Solutions"
        buttonLink="#cctv"
        imageSrc="/images/250x/Godrej-Matrix-3016.webp"
        reverse={false}
      />

      {/* <FeaturedProducts products={featuredProducts} /> */}
      <FeaturedProductsCarousel products={featuredProducts} />
    </>
  );
}
