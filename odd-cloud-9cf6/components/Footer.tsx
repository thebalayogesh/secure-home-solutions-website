import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-bold mb-3">Secure Home Solutions</h3>
          <p className="text-sm text-gray-300">
            We believe every home deserves safety, convenience, and very importantly Peace Of Mind.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <Phone size={16} />
              <span>+91 75500 84414</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} />
              <span>mayuritours@example.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} />
              <span>Door No. 103, First Floor, Plot No.18, Pammal Main Road, Pammal, Chennai - 600075</span>
            </li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <Facebook href="https://fb.com" />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram />
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">#PeaceOfMind</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Secure Home Solutions. All rights reserved.
      </div>

    </footer>
  );
}