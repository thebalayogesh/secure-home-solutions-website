"use client";

import { Share2 } from "lucide-react";

interface ShareButtonFloatingProps {
  url: string;
  title?: string;
}

export default function ShareButtonFloating({ url, title }: ShareButtonFloatingProps) {
  const handleShare = async () => {
    if (!navigator.share) return; // only mobile/native share
    try {
      await navigator.share({
        title: title || document.title || "Check this out!",
        url: url || window.location.href,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-30 right-6 p-3 rounded-full bg-gray-600 text-white shadow-lg hover:bg-gray-900 transition md:hidden z-50"
      aria-label="Share this product"
    >
      <Share2 size={20} />
    </button>
  );
}
