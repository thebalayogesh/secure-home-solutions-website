// "use client";

// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";

// interface Slide {
//   title: string;
//   description: string;
//   imageSrc: string;
//   buttonText?: string;
//   buttonLink?: string;
// }

// interface HeroCarouselProps {
//   slides: Slide[];
//   autoSlide?: boolean;
//   slideInterval?: number;
// }

// export default function HeroCarousel({
//   slides,
//   autoSlide = true,
//   slideInterval = 5000,
// }: HeroCarouselProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const startX = useRef(0);
//   const isDragging = useRef(false);

//   // Auto-slide with pause on hover
//   useEffect(() => {
//     if (!autoSlide) return;
//     if (isHovered) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, slideInterval);

//     return () => clearInterval(interval);
//   }, [slides.length, autoSlide, slideInterval, isHovered]);

//   // Manual swipe / drag
//   const handleStart = (clientX: number) => {
//     startX.current = clientX;
//     isDragging.current = true;
//   };

//   const handleEnd = (clientX: number) => {
//     if (!isDragging.current) return;
//     const diff = startX.current - clientX;
//     if (diff > 50) nextSlide();
//     if (diff < -50) prevSlide();
//     isDragging.current = false;
//   };

//   const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

//   return (
//     <div
//       className="relative w-full h-[400px] md:h-[600px]"
//       onMouseDown={(e) => handleStart(e.clientX)}
//       onMouseUp={(e) => handleEnd(e.clientX)}
//       onTouchStart={(e) => handleStart(e.touches[0].clientX)}
//       onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
//     >
//       {slides.map((slide, idx) => (
//         <div
//           key={idx}
//           className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
//             } cursor-pointer `} 
//         >
//           {/* Image */}
//           <Image
//             src={slide.imageSrc}
//             alt={slide.title}
//             fill
//             className="object-cover w-full h-full"
//             priority
//           />


//           {/* Overlay */}
//           <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-20 z-20">
//             <h1 className="text-2xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
//             <p className="text-white text-sm md:text-lg mb-6">{slide.description}</p>
//             {slide.buttonText && slide.buttonLink && (
//               <Link
//                 href={slide.buttonLink}
//                 className="bg-yellow-500 text-black px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-600 transition z-30"
//               >
//                 {slide.buttonText}
//               </Link>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition z-30"
//       >
//         &#8592;
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition z-30"
//       >
//         &#8594;
//       </button>

//       {/* Navigation Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
//         {slides.map((_, idx) => (
//           <button
//             key={idx}
//             className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-yellow-500" : "bg-white bg-opacity-50"
//               }`}
//             onClick={() => setCurrentIndex(idx)}
//           />
//         ))}
//       </div>
//     </div>

//   );
// }


"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Slide {
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  buttonLink?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  autoSlide?: boolean;
  slideInterval?: number;
}

export default function HeroCarousel({
  slides,
  autoSlide = true,
  slideInterval = 5000,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const startX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!autoSlide || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoSlide, slideInterval, isHovered]);

  const handleStart = (clientX: number) => {
    startX.current = clientX;
    isDragging.current = true;
  };

  const handleEnd = (clientX: number) => {
    if (!isDragging.current) return;
    const diff = startX.current - clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    isDragging.current = false;
  };

  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  return (
    <div
      className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
    >
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Background Image */}
          <Image
            src={slide.imageSrc}
            alt={slide.title}
            fill
            className="object-cover w-full h-full"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0   z-10" />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-20 z-20">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
              {/* {slide.title} */}
            </h1>
            <p className="text-white text-sm md:text-lg lg:text-xl mb-6 drop-shadow-md">
              {/* {slide.description} */}
            </p>
            {/* {slide.buttonText && slide.buttonLink && (
              <Link
                href={slide.buttonLink}
                className="bg-blue-500 text-black px-5 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-600 hover:scale-105 transition transform z-30"
              >
                {slide.buttonText}
              </Link>
            )} */}
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-3 rounded-full hover:bg-opacity-50 hover:scale-110 transition z-30"
      >
        <span className="text-xl">&#10094;</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-3 rounded-full hover:bg-opacity-50 hover:scale-110 transition z-30"
      >
        <span className="text-xl">&#10095;</span>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 md:w-5 md:h-5 rounded-full transition-all ${idx === currentIndex ? "bg-blue-500 scale-110" : "bg-white bg-opacity-50"
              }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
