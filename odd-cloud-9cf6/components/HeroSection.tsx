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
    <section className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      {/* Text Section */}
      <div
        className={`flex flex-col justify-center text-center md:text-left bg-gray-100 p-6 md:p-8 rounded-lg order-2 ${
          reverse ? "md:order-2" : "md:order-1"
        }`}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
          {description}
        </p>

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
        className={`relative w-full order-1 ${reverse ? "md:order-1" : "md:order-2"}`}
        style={{ minHeight: "300px" }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          className="object-contain rounded-lg"
        />
      </div>
    </section>
  );
}
