import type { Metadata } from "next";
import "./globals.css";
import ContactTopbar from "@/components/ContactBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Secure Home Solutions",
  description: "Your key to peace of mind. Explore our security solutions.",
   icons: {
    icon: "/images/site/shs-ico.webp",
  },
  openGraph: {
    title: "Secure Home Solutions",
    description: "Your key to peace of mind. Explore our security solutions.",
    url: "https://yourdomain.com",
    siteName: "Secure Home Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Home Solutions",
    description: "Your key to peace of mind. Explore our security solutions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="" data-new-gr-c-s-check-loaded="14.1254.0" data-gr-ext-installed="">
        <ContactTopbar />
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
