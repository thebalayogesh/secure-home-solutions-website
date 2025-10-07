// app/layout.tsx
import Script from "next/script";
import "./globals.css";
import ContactTopbar from "@/components/ContactBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://homelockers.in"),
  title: "Secure Home Solutions",
  description: "Homelockers.in is your trusted destination for Godrej lockers, Godrej safe, and safe lockers for home. Explore a wide range of home locker Godrej models at the best Godrej safe locker price. Find the perfect locker safe for home at a Godrej locker showroom near you. Shop securely online or locate Godrej lockers near me with ease. and make sure add PEACE OF MIND AND MAKE SURE ABOUT KEYWORD I SPECIFYED",
   icons: {
    icon: "/images/site/shs-ico.webp",
  },
  openGraph: {
    title: "Secure Home Solutions",
    description: "Homelockers.in is your trusted destination for Godrej lockers, Godrej safe, and safe lockers for home. Explore a wide range of home locker Godrej models at the best Godrej safe locker price. Find the perfect locker safe for home at a Godrej locker showroom near you. Shop securely online or locate Godrej lockers near me with ease. and make sure add PEACE OF MIND AND MAKE SURE ABOUT KEYWORD I SPECIFYED",
    url: "https://homelockers.in",
    siteName: "Secure Home Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Home Solutions",
    description: "Homelockers.in is your trusted destination for Godrej lockers, Godrej safe, and safe lockers for home. Explore a wide range of home locker Godrej models at the best Godrej safe locker price. Find the perfect locker safe for home at a Godrej locker showroom near you. Shop securely online or locate Godrej lockers near me with ease. and make sure add PEACE OF MIND AND MAKE SURE ABOUT KEYWORD I SPECIFYED",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Secure Home Solutions",
    "image": "https://homelockers.in/images/site/shs-logo.webp",
    "telephone": "+91-7550084414",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Door No. 103, Plot No. 18, Pammal Main Road",
      "addressLocality": "Chennai",
      "postalCode": "600075",
      "addressCountry": "IN"
    },
    "url": "https://homelockers.in",
    "openingHours": "Mo-Su 09:00-20:00",
    "priceRange": "₹₹₹"
  };

  return (
    <html lang="en">
      <head>
        {/* ✅ JSON-LD in <head> */}
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
  as="style"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
/>

      </head>
      <body>
        <ContactTopbar />
        <Navbar />
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}







// import type { Metadata } from "next";
// import "./globals.css";
// import ContactTopbar from "@/components/ContactBar";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import BackToTop from "@/components/BackToTop";


// export const metadata: Metadata = {
//   title: "Secure Home Solutions",
//   description: "Your key to peace of mind. Explore our security solutions.",
//    icons: {
//     icon: "/images/site/shs-ico.webp",
//   },
//   openGraph: {
//     title: "Secure Home Solutions",
//     description: "Your key to peace of mind. Explore our security solutions.",
//     url: "https://yourdomain.com",
//     siteName: "Secure Home Solutions",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Secure Home Solutions",
//     description: "Your key to peace of mind. Explore our security solutions.",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="" data-new-gr-c-s-check-loaded="14.1254.0" data-gr-ext-installed="">
//         <ContactTopbar />
//         <Navbar />
//         {children}
//         <BackToTop />
//         <Footer />
//         </body>
//     </html>
//   );
// }
