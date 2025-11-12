export const dynamic = "force-static";

import IntroductionSection from '@/components/About/IntroductionSection';
import Timeline from '@/components/About/TimeLine';
import WhyChooseUsSection from '@/components/About/WhyChooseUsSection';
import GoogleReviewsSection from '@/components/About/GoogleReviewsSection';
import InfoSection from '@/components/About/InfoSection';
import TeamSection from '@/components/About/TeamSection';
import CTASection from '@/components/About/CTASection';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <IntroductionSection />

      <InfoSection
        title="Our History"
        description="The journey of Secure Home Solutions began as an extension of Infocus Security Solutions. What started with a commitment to safety and innovation has grown into a trusted brand, delivering modern security systems, smart locks, and peace of mind to thousands of homes and businesses across India."
      />

      <Timeline />
      <TeamSection />
      <WhyChooseUsSection />
      <InfoSection
        title="Our Mission"
        description="To provide secure, innovative, and user-friendly security solutions for homes and businesses, ensuring peace of mind and lasting trust."
        bgGradient="bg-gradient-to-r from-green-50 to-green-100"
      />
      <GoogleReviewsSection />

      <CTASection />
    </main>
  );
}

// import Image from "next/image";
// import Link from "next/link";

// export default function AboutPage() {
//   return (
//     <main className="max-w-6xl mx-auto px-6 py-12">
//       {/* Hero Section */}
//       <section className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
//         <p className="mt-4 text-lg text-gray-600">
//           Safeguarding what matters most for over <span className="font-semibold">25 years</span>.
//         </p>
//       </section>

//       {/* Story Section */}
//       <section className="grid md:grid-cols-2 gap-10 items-center mb-16">
//         <div>
//           <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Story</h2>
//           <p className="text-gray-700 leading-relaxed">
//             We started with a simple mission — to create lockers and safes that 
//             combine <span className="font-semibold">maximum security</span> with 
//             modern design. Over the years, we’ve become a trusted name in homes, 
//             offices, and institutions across the country.
//           </p>
//         </div>
//         <Image
//         width={100}
//         height={50}
//           src="/images/about/factory.jpg"
//           alt="Our Factory"
//           className="rounded-lg shadow-md object-cover w-full h-64"
//         />
//       </section>

//       {/* Values Section */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-6 text-blue-600 text-center">Why Choose Us</h2>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
//           <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-lg">Trusted Quality</h3>
//             <p className="text-gray-600 mt-2">
//               Every locker is crafted with strict quality standards and certifications.
//             </p>
//           </div>
//           <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-lg">Innovative Designs</h3>
//             <p className="text-gray-600 mt-2">
//               From digital to biometric, our safes evolve with technology.
//             </p>
//           </div>
//           <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
//             <h3 className="font-bold text-lg">Customer Support</h3>
//             <p className="text-gray-600 mt-2">
//               A dedicated team ensuring satisfaction before and after purchase.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Call To Action */}
//       <section className="bg-blue-600 text-white text-center py-12 rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold">Protect Your Valuables Today</h2>
//         <p className="mt-2 text-lg">Explore our wide range of lockers & safes.</p>
//         <Link
//           href="/products"
//           className="inline-block mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100"
//         >
//           View Products
//         </Link>
//       </section>
//     </main>
//   );
// }
