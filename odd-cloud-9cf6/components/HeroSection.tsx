// components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  primaryText: string;
  primaryLink: string;
  secondaryText?: string;
  secondaryLink?: string;
  imageSrc: string;
  reverse?: boolean;
}

export default function HeroSection({
  title,
  description,
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink,
  imageSrc,
  reverse = false,
}: HeroSectionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center max-w-7xl py-10 mx-auto px-5 gap-6">
      
      {/* Text Section */}
      <div
        className={`bg-gray-100 p-6 md:p-8 rounded-lg flex flex-col justify-center text-center md:text-left
          order-2 ${reverse ? "md:order-2" : "md:order-1"}`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 text-base md:text-lg mb-6">{description}</p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <Link
            href={primaryLink}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium shadow hover:bg-blue-700 transition"
          >
            {primaryText}
          </Link>
          {secondaryText && secondaryLink && (
            <Link
              href={secondaryLink}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-medium shadow hover:bg-gray-300 transition"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div
        className={`relative w-full order-1 flex justify-center ${reverse ? "md:order-1" : "md:order-2"}`}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={1080}           // intrinsic width for SEO
          height={1350}          // intrinsic height for SEO
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full max-w-full h-auto object-contain rounded-lg"
          quality={80}
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
          style={{
            maxHeight: "550px", // desktop max height
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}
