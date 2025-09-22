// // components/HeroSection.tsx
// import Image from "next/image";
// import Link from "next/link";

// interface HeroSectionProps {
//   title: string;
//   description: string;
//   primaryText: string;
//   primaryLink: string;
//   secondaryText?: string;
//   secondaryLink?: string;
//   imageSrc: string;
//   reverse?: boolean;
// }

// export default function HeroSection({
//   title,
//   description,
//   primaryText,
//   primaryLink,
//   secondaryText,
//   secondaryLink,
//   imageSrc,
//   reverse = false,
// }: HeroSectionProps) {
//   return (
//     <section
//       className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-7xl mx-auto px-6 py-10 ${
//         reverse ? "md:flex-row-reverse" : ""
//       }`}
//     >
//       {/* Text Content */}
//       <div className="w-full md:w-1/2 text-center md:text-left space-y-5">
//         <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
//           <span className="text-gray-600">
//             {title}
//           </span>
//         </h1>
//         <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//           {description}
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
//           <Link
//             href={primaryLink}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
//           >
//             {primaryText}
//           </Link>

//           {secondaryText && secondaryLink && (
//             <Link
//               href={secondaryLink}
//               className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium shadow hover:bg-gray-200 transition"
//             >
//               {secondaryText}
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Image */}
//       <div className="w-full md:w-1/2 flex justify-center">
//         <Image
//           src={imageSrc}
//           alt={title}
//           width={480}
//           height={360}
//           className="rounded-xl object-contain max-h-[350px]"
//           priority
//         />
//       </div>
//     </section>
//   );
// }

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
    <section className="grid grid-cols-1 md:grid-cols-2 items-center max-w-7xl mx-auto px-5 gap-4">
      {/* Text Section */}
      <div
        className={`bg-gray-100 p-8 rounded-lg flex flex-col justify-center text-center md:text-left ${
          reverse ? "md:order-2" : "md:order-1"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-6">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <Link
            href={primaryLink}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium shadow hover:bg-green-700 transition"
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
        className={`flex justify-center ${reverse ? "md:order-1" : "md:order-2"}`}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={500}
          height={400}
          className="object-contain rounded-lg"
          priority
        />
      </div>
    </section>
  );
}
