import { Phone, Mail, MessageCircle } from "lucide-react"; // optional icons

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Reach us directly via call, WhatsApp, or email.
      </p>

      <div className="space-y-4">
        {/* Call */}
        <a
          href="tel:+917550084414"
          className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-md shadow hover:bg-green-700"
        >
          <Phone className="w-5 h-5" /> Call Us
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/917550084414"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-semibold py-3 px-4 rounded-md shadow hover:bg-[#1ebe5d]"
        >
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>

        {/* Email */}
        <a
          href="mailto:godrejsecurehomes@mail.com"
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md shadow hover:bg-indigo-700"
        >
          <Mail className="w-5 h-5" /> Email Us
        </a>
      </div>
    </main>
  );
}
