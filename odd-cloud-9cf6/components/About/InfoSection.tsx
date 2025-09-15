interface InfoSectionProps {
  title: string;
  description: string;
  bgGradient?: string; // optional gradient background
}

export default function InfoSection({
  title,
  description,
  bgGradient = "bg-gradient-to-r from-sky-50 to-sky-100",
}: InfoSectionProps) {
  return (
    <section className={`mb-12 ${bgGradient} py-12`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-sky-800">
          {title}
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg md:text-xl bg-white/70 p-6 rounded-2xl shadow-sm">
          {description}
        </p>
      </div>
    </section>
  );
}
