"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { ProductType } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ShareButtons from "@/components/ShareButtons";
import ShareButtonFloating from "@/components/ShareButtonFloating";

import { parseProductDescription } from "@/lib/parseProductDescription";
import OfferPopup from "./OfferPopup";


const toTitleCase = (text: string) => {
  return text
    .split(/[-\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${siteUrl}/products/${product.category}/${product.slug}`;

  const parsedDescription = parseProductDescription(
  product.description
);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-28 overflow-x-hidden">
      {/* FIX 1: added min-w-0 to grid children. 
        This prevents the grid columns from being pushed wider than the screen by the images.
      */}
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* Left: Image Slider */}
        <div className="w-full max-w-md mx-auto md:max-w-full min-w-0">
          <div className="relative group">
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => {
                  if (window.innerWidth < 768) setIsFullscreen(true);
                }}
              >
                <Image
                  src={product.images[currentIndex]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>

              {isFullscreen && (
                <div
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
                  onClick={() => setIsFullscreen(false)}
                >
                  <div
                    className="relative w-full max-w-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={product.images[currentIndex]}
                      alt="fullscreen"
                      width={800}
                      height={800}
                      className={`object-contain w-full h-auto transition-transform ${
                        zoomed ? "scale-125" : "scale-100"
                      }`}
                      onClick={() => setZoomed(!zoomed)}
                    />
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="absolute top-[-40px] right-0 text-white text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* NAV BUTTONS */}
            {totalImages > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* FIX 2: added w-full and overflow-x-auto correctly.
              The scrollbar-hide ensures it looks clean while allowing swipe.
            */}
            <div className="mt-3 w-full overflow-hidden">
              <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`relative snap-start flex-shrink-0 w-[64px] h-[64px] rounded-md overflow-hidden border-2 transition ${
                      i === currentIndex
                        ? "border-blue-600 scale-105"
                        : "border-gray-200 opacity-80"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`thumbnail-${i}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Info & Buttons */}
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {/* <p className="text-2xl text-blue-600 font-semibold mt-2">
            ₹{new Intl.NumberFormat("en-IN").format(Number(product.price))}
          </p> */}

          <div className="mt-2">
  {product.offer_price ? (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-2xl text-blue-600 font-semibold">
        ₹{new Intl.NumberFormat("en-IN").format(
          Number(product.offer_price)
        )}
      </span>

      <span className="text-lg text-gray-400 line-through">
        ₹{new Intl.NumberFormat("en-IN").format(
          Number(product.price)
        )}
      </span>

      <span className="px-2 py-1 text-xs font-semibold rounded-md bg-red-100 text-red-600">
        OFFER
      </span>
    </div>
  ) : (
    <span className="text-2xl text-blue-600 font-semibold">
      ₹{new Intl.NumberFormat("en-IN").format(
        Number(product.price)
      )}
    </span>
  )}
</div>

          <div className="mt-4">
            <ShareButtons url={productUrl} title={product.name} />
          </div>
          
          {productUrl && (
            <ShareButtonFloating url={productUrl} title={product.name} />
          )}

          <div className="mt-6 space-y-2 text-gray-800">
            {Array.isArray(product.size) && product.size.length > 0 && (
              <div>
                <strong>Size:</strong>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {product.size.map((s, i) => (
                    <span key={i} className="px-3 py-1 text-sm rounded-full bg-gray-100 border">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {product.weight && <p><strong>Weight:</strong> {product.weight}</p>}
            {product.volume && <p><strong>Volume:</strong> {product.volume}</p>}
          </div>

          {/* Mechanisms & Highlights */}
          <div className="space-y-6 mt-6">
            {Array.isArray(product.lock_mechanism) && product.lock_mechanism.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Lock Mechanism</h3>
                <div className="flex flex-wrap gap-2">
                  {product.lock_mechanism.map((lock, i) => (
                    <span key={i} className="px-3 py-1 text-sm rounded-full bg-gray-100 border">
                      {toTitleCase(lock)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(product.tags) && product.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                      {toTitleCase(tag)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex gap-4 mt-8">
            <a href="tel:+917550084414" className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow font-medium">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href="https://wa.me/917550084414" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow font-medium">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Full Width Description */}
      <div className="mt-12">
        {/* <h2 className="text-2xl font-semibold mb-4">Product Description</h2> */}
        {/* <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {product.description}
        </p> */}


        <div className="space-y-10">

  {/* Overview */}
  {parsedDescription.intro && (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        Product Overview
      </h2>

      <p className="text-gray-600 leading-7 whitespace-pre-line">
        {parsedDescription.intro}
      </p>
    </section>
  )}

  {/* Features */}
  {parsedDescription.features.length > 0 && (
    <section>
      <h2 className="text-2xl font-bold mb-6">
        Key Features
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {parsedDescription.features.map((feature, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-5"
          >
            <h3 className="font-semibold text-lg mb-2">
              {feature.title}
            </h3>

            {feature.description && (
              <p className="text-gray-600 leading-6">
                {feature.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )}

  {/* Specifications */}
  {parsedDescription.specifications.length > 0 && (
    <section>
      <h2 className="text-2xl font-bold mb-6">
        Specifications
      </h2>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        {parsedDescription.specifications.map((spec, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              index !==
              parsedDescription.specifications.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <div className="bg-gray-50 px-5 py-4 font-medium">
              {spec.label}
            </div>

            <div className="px-5 py-4 text-gray-600">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}

</div>
      </div>

      {/* Related Products */}
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

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg flex md:hidden z-50">
        <a href="tel:+917550084414" className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-blue-600 font-medium">
          <Phone className="w-5 h-5" /> Call Now
        </a>
        <a href={`https://wa.me/917550084414?text=Interested in ${product.name}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-green-600 font-medium">
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
      </div>

      {product.offer_price && (
  <OfferPopup product={product} />
)}
    </main>
  );
}


















// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, Phone, MessageCircle, Ruler, Weight, Box } from "lucide-react";
// import { ProductType } from "@/types/product";
// import ProductCard from "@/components/ProductCard";
// import ShareButtons from "@/components/ShareButtons";
// import ShareButtonFloating from "@/components/ShareButtonFloating";

// // 1. Improved Helper Function: Ensures standard title case (e.g., 'fire-safe' -> 'Fire Safe')
// const formatLabel = (text: string) => {
//   return text
//     .split(/[-\s]/)
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ");
// };

// export default function ProductPageClient({
//   product,
//   relatedProducts = [],
// }: {
//   product: ProductType;
//   relatedProducts?: ProductType[];
// }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [zoomed, setZoomed] = useState(false);

//   if (!product) {
//     return (
//       <div className="p-20 text-center text-gray-500 font-medium tracking-tight">
//         The requested product could not be located.
//       </div>
//     );
//   }

//   const totalImages = product.images.length;

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
//   };

//   const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
//   const productUrl = `${siteUrl}/products/${product.category}/${product.slug}`;

//   return (
//     // Premium Change: Updated background to a very subtle off-white, refined text to slate, added better padding
//     <main className="min-h-screen bg-[#FBFBFD] text-slate-900 font-sans antialiased max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-16 pb-32 md:pb-20 overflow-x-hidden">
      
//       {/* Grid Structure (Maintained structure but refined spacing) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
//         {/* LEFT SIDE: Image Gallery */}
//         <div className="w-full max-w-xl mx-auto md:max-w-full min-w-0">
//           <div className="relative group">
            
//             {/* Main Image Container */}
//             {/* Premium Change: Refined shadow, cleaner border, subtle background */}
//             <div className="relative w-full aspect-square md:aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80">
//               <div
//                 className="relative w-full h-full cursor-zoom-in flex items-center justify-center"
//                 onClick={() => {
//                   if (window.innerWidth < 768) setIsFullscreen(true);
//                 }}
//               >
//                 <Image
//                   src={product.images[currentIndex]}
//                   alt={product.name}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                   // Premium Change: Improved object containment and padding, smoother scaling animation
//                   className="object-contain p-6 md:p-8 transition-transform duration-700 ease-out group-hover:scale-105"
//                   priority
//                 />
//               </div>

//               {/* Navigation Arrows for Main Image (maintained, refined appearance) */}
//               {totalImages > 1 && (
//                 <>
//                   <button
//                     onClick={handlePrev}
//                     aria-label="Previous image"
//                     className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:scale-90 md:group-hover:scale-100 text-slate-700"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={handleNext}
//                     aria-label="Next image"
//                     className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:scale-90 md:group-hover:scale-100 text-slate-700"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Thumbnails Container */}
//             {/* Premium Change: Added fixed gap and refined active border style */}
//             {totalImages > 1 && (
//               <div className="mt-6 w-full overflow-hidden px-1">
//                 <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-200">
//                   {product.images.map((img, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setCurrentIndex(i)}
//                       aria-label={`View image ${i + 1}`}
//                       className={`relative snap-start flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ease-in-out ${
//                         i === currentIndex
//                           ? "border-blue-600 shadow-md ring-2 ring-blue-100 scale-105"
//                           : "border-gray-100 opacity-80 hover:opacity-100 hover:border-gray-200"
//                       }`}
//                     >
//                       <Image
//                         src={img}
//                         alt={`thumbnail-${i}`}
//                         fill
//                         className="object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDE: Product Details */}
//         <div className="min-w-0 flex flex-col pt-2">
          
//           {/* Title and Category */}
//           {/* Premium Change: Refined typography (Inter-style), category badge */}
//           <div className="mb-6">
//             {product.category && product.category.length > 0 && (
//               <div className="flex gap-2 mb-3">
//                 {product.category.map((cat, i) => (
//                   <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold tracking-wider uppercase">
//                     {cat}
//                   </span>
//                 ))}
//               </div>
//             )}
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-tight tracking-tighter">
//               {product.name}
//             </h1>
//           </div>

//           {/* Price and Share Section */}
//           {/* Premium Change: Added background card for price/share section, refined font sizes */}
//           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8 flex items-center justify-between gap-4">
//             <div>
//               <p className="text-sm text-gray-500 font-medium mb-0.5">Price (inc. tax)</p>
//               <p className="text-4xl font-extrabold text-blue-600 tracking-tight">
//                 ₹{new Intl.NumberFormat("en-IN").format(Number(product.price))}
//               </p>
//             </div>
            
//             <div className="h-16 w-px bg-gray-100" /> {/* vertical divider */}
            
//             <div className="flex flex-col items-center gap-1.5">
//               <span className="text-sm text-gray-500 font-medium">Share</span>
//               <ShareButtons url={productUrl} title={product.name} />
//             </div>
//           </div>
          
//           {productUrl && (
//             <ShareButtonFloating url={productUrl} title={product.name} />
//           )}

//           {/* Specifications Grid */}
//           {/* Premium Change: Refined layout into grid cards with icons, much cleaner visual hierarchy */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            
//             {Array.isArray(product.size) && product.size.length > 0 && (
//               <div className="col-span-1 sm:col-span-2 bg-gray-50 p-5 rounded-2xl border border-gray-100">
//                 <div className="flex items-center gap-3 mb-3">
//                   <Ruler className="w-5 h-5 text-gray-400" />
//                   <strong className="text-slate-800 text-base">Dimensions</strong>
//                 </div>
//                 <div className="flex gap-2 mt-1 flex-wrap">
//                   {product.size.map((s, i) => (
//                     <span key={i} className="px-3 py-1 text-sm rounded-lg bg-white border border-gray-100 text-gray-700 font-medium">
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {product.weight && (
//               <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
//                 <div className="flex items-center gap-3 mb-1.5">
//                   <Weight className="w-5 h-5 text-gray-400" />
//                   <strong className="text-slate-800 text-base">Weight</strong>
//                 </div>
//                 <p className="text-xl font-bold text-slate-900 tracking-tight">{product.weight}</p>
//               </div>
//             )}
            
//             {product.volume && (
//               <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
//                 <div className="flex items-center gap-3 mb-1.5">
//                   <Box className="w-5 h-5 text-gray-400" />
//                   <strong className="text-slate-800 text-base">Volume</strong>
//                 </div>
//                 <p className="text-xl font-bold text-slate-900 tracking-tight">{product.volume}</p>
//               </div>
//             )}
//           </div>

//           {/* Mechanisms & Highlights (Refined appearance) */}
//           <div className="space-y-6 mb-10">
//             {Array.isArray(product.lock_mechanism) && product.lock_mechanism.length > 0 && (
//               <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
//                 <h3 className="font-bold text-slate-900 mb-3 text-lg tracking-tight">Lock Mechanism</h3>
//                 <div className="flex flex-wrap gap-2.5">
//                   {product.lock_mechanism.map((lock, i) => (
//                     <span key={i} className="px-4 py-2 text-sm rounded-xl bg-gray-50 border border-gray-100 text-gray-800 font-medium hover:bg-gray-100 transition cursor-default">
//                       {formatLabel(lock)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(product.tags) && product.tags.length > 0 && (
//               <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
//                 <h3 className="font-bold text-slate-900 mb-3 text-lg tracking-tight">H</h3>
//                 <div className="flex flex-wrap gap-2.5">
//                   {product.tags.map((tag, i) => (
//                     <span key={i} className="px-4 py-2 text-sm rounded-xl bg-blue-50/50 text-blue-800 border border-blue-100/60 font-semibold hover:bg-blue-50 transition cursor-default">
//                       {formatLabel(tag)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Desktop CTA Buttons */}
//           {/* Premium Change: Higher padding, bolder font, custom background gradients/colors, smooth animations */}
//           <div className="hidden md:flex gap-4 mt-auto">
//             <a
//               href="tel:+917550084414"
//               aria-label="Call Secure Home Solutions"
//               className="flex-1 flex items-center justify-center gap-3 px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-500/10 font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
//             >
//               <Phone className="w-5 h-5" /> Call for Consult
//             </a>
//             <a
//               href="https://wa.me/917550084414"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Chat on WhatsApp"
//               className="flex-1 flex items-center justify-center gap-3 px-8 py-4 text-white bg-green-600 hover:bg-green-700 rounded-2xl shadow-lg shadow-green-500/10 font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
//             >
//               <MessageCircle className="w-5 h-5" /> WhatsApp Inquire
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Product Description Section */}
//       {/* Premium Change: Added subtle background section, cleaner typography for the block text */}
//       <div className="mt-20 md:mt-24 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
//         <h2 className="text-3xl font-extrabold mb-6 text-slate-950 tracking-tighter">Product Description</h2>
//         <div className="prose prose-slate prose-lg max-w-4xl text-gray-700 leading-relaxed whitespace-pre-line font-medium">
//           {product.description}
//         </div>
//       </div>

//       {/* Related Products Section (maintained, spacing improved) */}
//       {relatedProducts.length > 0 && (
//         <div className="mt-20 md:mt-24 pb-12 md:pb-0">
//           <h2 className="text-3xl font-extrabold mb-10 text-slate-950 tracking-tighter">Related Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {relatedProducts.slice(0, 4).map((rp) => (
//               <ProductCard key={rp.slug} product={rp} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Sticky Mobile CTA Buttons */}
//       {/* Premium Change: Cleaner design with slight upper border shadow, high padding */}
//       <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-[0_-8px_30px_rgb(0,0,0,0.03)] flex md:hidden z-50 p-4 gap-3">
//         <a
//           href="tel:+917550084414"
//           aria-label="Call for quick consultation"
//           className="flex-1 flex items-center justify-center gap-2.5 py-3.5 text-white bg-blue-600 rounded-xl font-semibold transition active:bg-blue-700 text-sm"
//         >
//           <Phone className="w-4 h-4" /> Call Now
//         </a>
//         <a
//           href={`https://wa.me/917550084414?text=${encodeURIComponent(
//             `Hi, I'm interested in the ${product.name}. Please provide more details.`
//           )}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="Chat on WhatsApp about this product"
//           className="flex-1 flex items-center justify-center gap-2.5 py-3.5 text-white bg-green-600 rounded-xl font-semibold transition active:bg-green-700 text-sm"
//         >
//           <MessageCircle className="w-4 h-4" /> WhatsApp Inquire
//         </a>
//       </div>

//       {/* FULLSCREEN MODAL (Maintained functionality, refined styling) */}
//       {isFullscreen && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md"
//           onClick={() => setIsFullscreen(false)}
//         >
//           <div
//             className="relative max-w-7xl max-h-screen flex items-center justify-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Image
//               src={product.images[currentIndex]}
//               alt="fullscreen product view"
//               width={1600}
//               height={1200}
//               className={`object-contain transition-transform duration-300 ease-in-out cursor-zoom-out ${
//                 zoomed ? "scale-150" : "scale-100"
//               }`}
//               onClick={() => setZoomed(!zoomed)}
//             />
            
//             <button
//               onClick={() => setIsFullscreen(false)}
//               aria-label="Close fullscreen view"
//               className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 p-2.5 rounded-full transition-all"
//             >
//               ✕
//             </button>
            
//             {totalImages > 1 && (
//               <>
//                 <button
//                   onClick={handlePrev}
//                   aria-label="View previous image"
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   aria-label="View next image"
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }