import { ShieldCheck, Award, Users, Headset, Eye } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="text-sky-500 w-8 h-8" />,
    title: "Customer-First Approach",
    desc: "Vibrant engagement and reliable service for lasting relationships.",
  },
  {
    icon: <Award className="text-sky-500 w-8 h-8" />,
    title: "Authorized Retail Partner",
    desc: "Direct access to genuine, high-quality Godrej security products.",
  },
  {
    icon: <Users className="text-sky-500 w-8 h-8" />,
    title: "Expertise in Home Security",
    desc: "Years of experience in safe lockers, CCTV, and personalized recommendations.",
  },
  {
    icon: <Headset className="text-sky-500 w-8 h-8" />,
    title: "End-to-End Support",
    desc: "From purchase to installation and after-sales service, we're with you every step.",
  },
  {
    icon: <Eye className="text-sky-500 w-8 h-8" />,
    title: "Transparent Dealings",
    desc: "No hidden fees; honest advice based on your needs.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-sky-700 mb-10">
          Why Choose Us?
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{f.icon}</div>
              <h4 className="text-lg md:text-xl font-semibold text-sky-700 mb-2">
                {f.title}
              </h4>
              <p className="text-gray-600 text-sm md:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
