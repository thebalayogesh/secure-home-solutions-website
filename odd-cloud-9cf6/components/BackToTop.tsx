"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-6 p-3 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 transition"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}













// "use client";

// import { useEffect, useState } from "react";
// import { ArrowUp, Share2 } from "lucide-react";

// export default function BackToTop() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       setIsVisible(window.scrollY > 300);
//     };

//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleShare = async () => {
//     const shareData = {
//       title: document.title || "Check this out!",
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Error sharing:", err);
//       }
//     } else {
//       // fallback: copy to clipboard
//       try {
//         await navigator.clipboard.writeText(shareData.url);
//         alert("Link copied to clipboard!");
//       } catch (err) {
//         console.error("Failed to copy:", err);
//       }
//     }
//   };

//   return (
//     <>
//       {isVisible && (
//         <>
//           {/* 📱 Mobile Share Button */}
//           <button
//             onClick={handleShare}
//             className="fixed bottom-36 right-6 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-900 transition md:hidden"
//             aria-label="Share this page"
//           >
//             <Share2 size={20} />
//           </button>

//           {/* ⬆️ Back to Top */}
//           <button
//             onClick={scrollToTop}
//             className="fixed bottom-20 right-6 p-3 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 transition"
//             aria-label="Back to top"
//           >
//             <ArrowUp size={20} />
//           </button>
//         </>
//       )}
//     </>
//   );
// }
