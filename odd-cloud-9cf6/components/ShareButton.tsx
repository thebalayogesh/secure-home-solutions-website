'use client';

import { useState, useEffect } from 'react';
import {
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  Check,
} from 'lucide-react';

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

  // ✅ Reset copied state when URL changes
  useEffect(() => {
    setCopied(false);
  }, [url]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Native Share (Mobile) */}
      <button
        onClick={handleNativeShare}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5 text-gray-700" />
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
