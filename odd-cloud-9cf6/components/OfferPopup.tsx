"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Phone, MessageCircle } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { ProductType } from "@/types/product";

interface OfferPopupProps {
    product: ProductType;
}

// 👉 Replace this with your real WhatsApp/call number
// India example: 919876543210
const PHONE_NUMBER = "917550084414";
// tel:+917550084414

export default function OfferPopup({ product }: OfferPopupProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!product.offer_price) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [product.offer_price]);

    if (!product.offer_price || !isOpen) return null;

    const price = Number(product.price);
    const offerPrice = Number(product.offer_price);

    const discount =
        price > offerPrice
            ? Math.round(((price - offerPrice) / price) * 100)
            : 0;

    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in the ${product.name}. I would like to know about the offer price.`
    );

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="relative w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close"
                    className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition hover:text-gray-900"
                >
                    <X size={16} />
                </button>

                {/* Product */}
                <div className="flex items-center gap-4 p-4">
                    {/* Image */}
                    <div className="relative h-24 w-24 shrink-0">
                        {product.images?.[0] && (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="96px"
                                className="object-contain"
                            />
                        )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 pr-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                            Limited time Special Offer
                        </p>

                        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
                            {product.name}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="text-xl font-bold text-red-600">
                                ₹{offerPrice.toLocaleString("en-IN")}
                            </span>

                            {price > offerPrice && (
                                <>
                                    <span className="text-xs text-gray-400 line-through">
                                        ₹{price.toLocaleString("en-IN")}
                                    </span>

                                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-600">
                                        {discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 border-t bg-gray-50 px-4 py-2.5">
                    {/* WhatsApp */}
                    <a
                        href={`https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-600 transition hover:border-green-600 hover:bg-green-600 hover:text-white"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-[17px] w-[17px] fill-current"
                            aria-hidden="true"
                        >
                            <path d={siWhatsapp.path} />
                        </svg>
                    </a>

                    {/* Call */}
                    <a
                        href={`tel:+${PHONE_NUMBER}`}
                        aria-label="Call"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                    >
                        <Phone size={17} />
                    </a>
                </div>
            </div>
        </div>
    );
}