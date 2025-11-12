import products from "@/data/products.json";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import StickyCTA from "@/components/StickyCTA";
import CategoryShowcase from "@/components/CategoryShowcase";
import HeroCarousel from "@/components/HeroCarousel";
import ResponsiveCarousel from "@/components/ResponsiveCarousel";
import TrustedCertificate from "@/components/Certificate";

const categorie = [
  {
    name: "250x Safes",
    slug: "250x",
    image: "/images/250x/Godrej-Matrix-3016-1.webp",
  },
  {
    name: "100x Safes",
    slug: "100x",
    image: "/images/100x/Godrej-Rhino-advanced-1.webp",
  },
  { name: "10x", slug: "10x", image: "/images/100x/Godrej-Citadel-1.webp" },
  { name: "Gifts", slug: "gift", image: "/images/gift/dreambox-red-1.webp" },
  {
    name: "Fire Proof",
    slug: "fire-resistant",
    image: "/images/fire-resistant/godrej-safire-40l-digi-1.webp",
  },
];

export const dynamic = "force-static";

export default function Home() {
  const featuredProducts = products.filter((p) => p.tags?.includes("featured"));

  return (
    <>
      {/* <HeroCarousel slides={slides} /> */}
      {/* <ResponsiveCarousel /> */}

      <HeroSection
        title="250X Lockers"
        description="SafeGuard your valuables with Godrej lockers and Godrej safe. Our home locker Godrej models feature double walls and patented construction for unmatched security and peace of mind. Check the best Godrej safe locker price and find your locker safe for home today."
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

      <TrustedCertificate />

      {/* Map Section */}
      <section className="px-4 pb-10">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Our Showroom Location
        </h2>
        <div className="relative w-full h-64 sm:h-80 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d970.7739837902907!2d80.13463256635623!3d12.974216368144445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8a9d2445c565bb15%3A0x24fedbe7a4248b05!2sSecure%20Home%20Solutions%20-%20A%20Godrej%20Locker%20Shop!5e1!3m2!1sen!2sin!4v1758555299931!5m2!1sen!2sin"
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps location of Godrej Lockers showroom homelockers.in"
          ></iframe>
        </div>
      </section>

      <StickyCTA phoneNumber="+917550084414" whatsappNumber="+917550084414" />
    </>
  );
}
