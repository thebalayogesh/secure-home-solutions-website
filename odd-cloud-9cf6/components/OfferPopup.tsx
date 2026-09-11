"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Phone } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { ProductType } from "@/types/product";

interface OfferPopupProps {
  product: ProductType;
}

const PHONE_NUMBER = "917550084414";

export default function OfferPopup({ product }: OfferPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!product.offer_price) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [product.offer_price]);

  if (!product.offer_price || !isOpen) {
    return null;
  }

  const price = Number(product.price);
  const offerPrice = Number(product.offer_price);

  const savings = Math.max(price - offerPrice, 0);

  const discount =
    price > offerPrice
      ? Math.round(((price - offerPrice) / price) * 100)
      : 0;

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${product.name}. I saw the special offer of ₹${offerPrice.toLocaleString(
      "en-IN"
    )}. Please share the details.`
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 px-4 backdrop-blur-[2px]"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-[380px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.16)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close offer"
          className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-sm transition hover:text-gray-900"
        >
          <X size={15} />
        </button>

        {/* Godrej Style Offer Header */}
        <div className="bg-[#006B3F] px-5 py-3.5">
          <div className="flex items-center justify-between pr-7">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                Special Offer
              </p>

              <p className="mt-0.5 text-xs font-medium text-white/80">
                Exclusive price available
              </p>
            </div>

            {discount > 0 && (
              <div className="rounded-lg bg-white px-2.5 py-1.5 text-center text-[#006B3F] shadow-sm">
                <p className="text-sm font-extrabold leading-none">
                  {discount}%
                </p>

                <p className="mt-0.5 text-[8px] font-bold uppercase">
                  OFF
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product */}
        <div className="flex gap-4 px-5 py-4">
          {/* Product Image */}
          <div className="relative h-[110px] w-[110px] shrink-0 rounded-xl bg-[#F5F8F6]">
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="110px"
                className="object-contain p-2"
              />
            )}
          </div>

          {/* Product Details */}
          <div className="min-w-0 flex-1 pt-1">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
              {product.name}
            </h3>

            {/* Offer Price */}
            <div className="mt-3">
              <span className="text-[25px] font-extrabold leading-none tracking-tight text-[#006B3F]">
                ₹{offerPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Original Price */}
            {price > offerPrice && (
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                <span className="text-[10px] font-medium text-gray-500">
                  Regular Price
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Savings */}
        {savings > 0 && (
          <div className="mx-5 mb-4 rounded-xl border border-[#D7E9DF] bg-[#F1F8F4] px-4 py-3.5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006B3F]">
              You Save
            </p>

            <p className="mt-0.5 text-[28px] font-black leading-none tracking-tight text-[#006B3F]">
              ₹{savings.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-[10px] font-medium text-[#4F735F]">
              Special price available
            </p>
          </div>
        )}

        {/* Contact Actions */}
        <div className="flex items-center justify-center gap-3 border-t border-gray-100 bg-gray-50 px-5 py-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[19px] w-[19px] fill-current"
              aria-hidden="true"
            >
              <path d={siWhatsapp.path} />
            </svg>
          </a>

          {/* Call */}
          <a
            href={`tel:+${PHONE_NUMBER}`}
            aria-label="Call us"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#006B3F] text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <Phone size={18} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </div>
  );
}