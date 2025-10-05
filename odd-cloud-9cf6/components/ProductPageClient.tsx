'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { ProductType } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ShareButtons from '@/components/ShareButton';

// Helper function for Title Case
const toTitleCase = (text: string) => {
  return text
    .split(/[-\s]/) // split by dash or space
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function ProductPageClient({
  product,
  relatedProducts = [],
}: {
  product: ProductType;
  relatedProducts?: ProductType[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const totalImages = product.images.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  // SEO-friendly description
  const seoDescription =
    product.description?.slice(0, 160) ||
    `Buy ${product.name} at Secure Home Solutions. Premium quality, secure storage, and durable design.`;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-28">
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            image: product.images,
            description: seoDescription,
            brand: {
              '@type': 'Brand',
              name: 'Secure Home Solutions',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: product.price,
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />

      {/* Grid: Image Left - Info Right */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Image Slider */}
        <div className="relative group">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div
              className="relative w-full h-[450px] bg-gray-50 overflow-hidden  md:cursor-zoom-in"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsFullscreen(true);
                }
              }}
            >
              {isFullscreen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/30"
                  onClick={() => setIsFullscreen(false)} // click outside closes
                >
                  <div
                    className="relative w-full max-w-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={product.images[currentIndex]}
                      alt={`${product.name} fullscreen`}
                      width={600}
                      height={600}
                      className={`object-contain w-full h-auto transition-transform duration-300 ${
                        zoomed ? 'scale-125' : 'scale-100'
                      }`}
                      onClick={() => setZoomed(!zoomed)}
                      priority
                    />
                    {/* Close */}
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md z-50"
                    >
                      ✕
                    </button>
                    {/* Prev/Next */}
                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              <Image
                src={product.images[currentIndex]}
                alt={`${product.name} - ${product.category?.[0] || 'Secure Home Solutions'}`}
                title={product.name}
                width={600}
                height={600}
                className="object-contain w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Navigation Thumbnails */}
          <div className="flex gap-3 mt-4 justify-center">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative w-20 h-20 border-2 rounded-md overflow-hidden ${
                  i === currentIndex ? 'border-blue-600' : 'border-gray-200'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Buttons */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-semibold mt-2">
            ₹{product.price}
          </p>

          {/* ✅ Share Buttons */}
          <div className="mt-4">
            <ShareButtons
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={`Check out ${product.name} on Secure Home Solutions`}
            />
          </div>

          {/* Specs */}
          <div className="mt-6 space-y-2 text-gray-800">
            {Array.isArray(product.size) && product.size.length > 0 && (
              <div>
                <strong>Size:</strong>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {product.size.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product.weight && (
              <p>
                <strong>Weight:</strong> {product.weight}
              </p>
            )}
            {product.volume && (
              <p>
                <strong>Volume:</strong> {product.volume}
              </p>
            )}
          </div>

          {/* Lock Mechanism */}
          {Array.isArray(product.lock_mechanism) &&
            product.lock_mechanism.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Lock Mechanism</h3>
                <div className="flex flex-wrap gap-2">
                  {product.lock_mechanism.map((lock, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
                    >
                      {toTitleCase(lock)}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Tags */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300"
                  >
                    {toTitleCase(tag)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {Array.isArray(product.category) && product.category.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {product.category.map((cat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {toTitleCase(cat)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex gap-4 mt-8">
            <a
              href="tel:+917550084414"
              className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow font-medium"
              aria-label="Call Secure Home Solutions"
            >
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a
              href="https://wa.me/917550084414"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow font-medium"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Full Width Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* ✅ Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((rp) => (
              <ProductCard key={rp.slug} product={rp} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg flex md:hidden z-50">
        <a
          href="tel:+917550084414"
          className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-blue-600 hover:bg-blue-700 font-medium"
          aria-label="Call Secure Home Solutions"
        >
          <Phone className="w-5 h-5" /> Call Now
        </a>
        <a
          href={`https://wa.me/917550084414?text=${encodeURIComponent(
            `Hi, I'm interested in ${product.name}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-green-600 hover:bg-green-700 font-medium"
          aria-label="Chat on WhatsApp"
        >
          {' '}
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
      </div>
    </main>
  );
}
