import Image from "next/image";
import Link from "next/link";

interface ContentSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  reverse?: boolean;
}

export default function ContentSection({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  reverse = false,
}: ContentSectionProps) {
  return (
    <section
  className={`flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 max-w-6xl mx-auto px-4 my-2 ${
    reverse ? "md:flex-row-reverse" : ""
  }`}
>
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={imageSrc}
          alt={title}
          width={450}
          height={320}
          className="rounded-xl max-w-[90%] md:max-w-full"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          {description}
        </p>
        <Link
          href={buttonLink}
          className="inline-block bg-blue-600 text-white px-5 py-3 md:px-7 md:py-4 rounded-lg text-base md:text-lg font-medium shadow hover:bg-blue-700 transition"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
