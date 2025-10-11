import Image from 'next/image';

export default function TrustedCertificate() {
  return (
    <section className="relative w-full max-w-3xl mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Certificate</h2>

      <div className="relative inline-block rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white">
        <Image
          src="/images/site/certificate.webp"
          alt="Certificate of Authenticity - Home Lockers"
          width={800}
          height={600}
          className="rounded-xl object-contain"
          loading="lazy"
        />

        {/* Verified Badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full shadow-md border border-green-300">
          <span className="inline-flex h-3 w-3 bg-white rounded-full"></span>
          <span className="font-semibold text-sm">Verified by Godrej</span>
        </div>
      </div>
    </section>
  );
}