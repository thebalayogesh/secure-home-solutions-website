
import products from "@/data/products.json";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import StickyCTA from "@/components/StickyCTA";
import CategoryShowcase from "@/components/CategoryShowcase";
import HeroCarousel from "@/components/HeroCarousel";
import ResponsiveCarousel from "@/components/ResponsiveCarousel";

const categorie = [
  { name: "250x Safes", slug: "250x", image: "/images/250x/Godrej-Matrix-3016-1.webp" },
  { name: "100x Safes", slug: "100x", image: "/images/100x/Godrej-Rhino-advanced-1.webp" },
  { name: "10x", slug: "10x", image: "/images/100x/Godrej-Citadel-1.webp" },
  { name: "Gifts", slug: "gift", image: "/images/gift/dreambox-red-1.webp" },
  { name: "Fire Proof", slug: "fire-resistant", image: "/images/fire-resistant/godrej-safire-40l-digi-1.webp" },

];

export const dynamic = "force-static";

const slides = [
  {
    title: "Secure Your Home Today",
    description: "Explore Godrej lockers for ultimate home security.",
    imageSrc: "/images/hero/Liquid-cash.png",
    buttonText: "Shop Now",
    buttonLink: "/products",
  }
  // {
  //   title: "Advanced CCTV Systems",
  //   description: "Stay connected and monitor your home in real-time.",
  //   imageSrc: "/images/250x/Godrej-Matrix-3016-1.webp",
  //   buttonText: "Learn More",
  //   buttonLink: "/products",
  // },
  // {
  //   title: "Smart Digital Locks",
  //   description: "Modern locking solutions for convenience and safety.",
  //   imageSrc: "/images/250x/Godrej-Matrix-3016-1.webp",
  //   buttonText: "Explore Locks",
  //   buttonLink: "#locks",
  // },
];


export default function Home() {
  const featuredProducts = products.filter((p) =>
    p.tags?.includes("featured")
  );

  return (
    <>

    {/* <HeroCarousel slides={slides} /> */}
    {/* <ResponsiveCarousel /> */}


<HeroSection
        title="250X Lockers"
        description="SafeGuard your precious valuables with confidence and peace of mind with our trusted, strongest and most secure lockers with double walls and patented construction. The best in class - unmatched protection for your valuables."
        primaryText="View Lockers"
        primaryLink="/products/250x"
        // secondaryText="Contact Us"
        // secondaryLink="/contact"
        imageSrc="/images/hero/1.webp"
        reverse
      />


      <HeroSection
        title="Fire Resistant Lockers"
        description="Ensure standard strength security for your valuables. while these lockers offer a basic level of burglary resistant protection, for enhanced security, we strongly recommend our advanced and extreme strength models. with advanced features and reinforced constuction, they provide superior protection for your valuables"
        primaryText="View Lockers"
        primaryLink="/products/fire-resistant"
        imageSrc="/images/hero/4.webp"

      />


 <HeroSection
        title="100x Lockers"
        description="Heightened Protection for your valuables with innovative single wall reinforcement technology. Each Locker features fortified walls, powered by state-of-the-art technology for maximum security, ensuring peace of mind."
        primaryText="View Lockers"
        primaryLink="/products/100x"
        imageSrc="/images/hero/2.webp"
        reverse
      />

      <HeroSection
        title="10X Lockers"
        description="Ensure standard strength security for your valuables. while these lockers offer a basic level of burglary resistant protection, for enhanced security, we strongly recommend our advanced and extreme strength models. with advanced features and reinforced constuction, they provide superior protection for your valuables"
        primaryText="Explore Products"
        primaryLink="/products/10x"
        imageSrc="/images/hero/3.webp"

      />






      <CategoryShowcase categories={categorie} />

      <FAQSection />

      <FeaturedProductsCarousel products={featuredProducts} />

      <StickyCTA phoneNumber="+917550084414" whatsappNumber="+917550084414" />
    </>
  );
}
