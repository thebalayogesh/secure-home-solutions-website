'use client';

import { useState, useEffect } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';


interface ShareButtonsProps {
  url: string;
  title?: string;
  className?: string;
}

export default function ShareButtons({
  url,
  title = 'Check this out!',
  className = '',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Reset copied state whenever the URL changes
  useEffect(() => {
    setCopied(false);
  }, [url]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Native Share / Mobile */}
      <button
        onClick={handleNativeShare}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5 text-gray-700" />
      </button>

      {/* WhatsApp Share */}
      <button
        onClick={handleWhatsAppShare}
        className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition"
        aria-label="Share on WhatsApp"
      >
        {/* You can also use a WhatsApp SVG icon instead of text */}
        {/* <span className="text-white font-bold text-sm">WA</span> */}
        <SiWhatsapp className="w-5 h-5 text-white" />

      </button>

      {/* Copy URL */}
      <button
        onClick={handleCopy}
        aria-label="Copy URL"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <LinkIcon className="w-5 h-5 text-gray-700" />
        )}
      </button>
    </div>
  );
}
