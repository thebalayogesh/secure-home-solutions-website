'use client';

import { useState } from 'react';
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

      {/* Twitter */}
      {/*<a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <Twitter className="w-5 h-5 text-sky-500" />
      </a>*/}

      {/* LinkedIn */}
      {/*<a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <Linkedin className="w-5 h-5 text-blue-700" />
      </a>*/}

      {/* Facebook */}
      {/*<a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <Facebook className="w-5 h-5 text-blue-600" />
      </a>*/}

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
