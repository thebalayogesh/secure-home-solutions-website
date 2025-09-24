import { Phone, Mail, MessageCircle } from "lucide-react"; // optional icons

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <>
      <main className="max-w-md mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Reach us directly via call, WhatsApp, or email.
        </p>

        <div className="space-y-4">
          {/* Call */}
          <a
            href="tel:+917550084414"
            className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-green-700 transition"
          >
            <Phone className="w-5 h-5" /> Call Us
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/917550084414"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-[#1ebe5d] transition"
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp
          </a>

          {/* Email */}
          <a
            href="mailto:godrejsecurehomes@mail.com"
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            <Mail className="w-5 h-5" /> Email Us
          </a>
        </div>
      </main>

      {/* Map Section */}
      <section className="px-4 pb-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Our Location</h2>
        <div className="relative w-full h-64 sm:h-80 md:h-[450px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d970.7739837902907!2d80.13463256635623!3d12.974216368144445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8a9d2445c565bb15%3A0x24fedbe7a4248b05!2sSecure%20Home%20Solutions%20-%20A%20Godrej%20Locker%20Shop!5e1!3m2!1sen!2sin!4v1758555299931!5m2!1sen!2sin"
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}
