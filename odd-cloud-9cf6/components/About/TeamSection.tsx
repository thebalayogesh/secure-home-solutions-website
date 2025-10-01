import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image: string;
}

const founders: TeamMember[] = [
  {
    name: "Kishore Kumar",
    role: "Founder & CEO",
    desc: "Leads Secure Home Solutions with a vision to deliver innovative and reliable home safety solutions.",
    image: "/images/team/kishore-team.webp",
  },
  {
    name: "Sathish",
    role: "Manager",
    desc: "Handles operations and ensures smooth project execution with a focus on customer satisfaction.",
    image: "/images/team/sathish-pro.webp",
  },
];

export default function FoundersSection() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-700">
          Meet Our Founders
        </h2>
        <p className="text-gray-600 mt-2">
          The visionaries behind{" "}
          <span className="font-semibold text-sky-700">
            Secure Home Solutions
          </span>
        </p>
      </div>

      {/* Founders Display */}
      <div className="flex justify-center flex-wrap gap-10">
        {founders.map((f, idx) => (
          <div key={idx} className="flex flex-col items-center text-center max-w-xs">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-xl border-4 border-sky-400 hover:scale-105 transition">
              <Image
                src={f.image}
                alt={f.name}
                width={176}
                height={176}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <p className="mt-4 font-bold text-sky-700 text-lg">{f.name}</p>
            <p className="text-gray-600">{f.role}</p>
            <p className="text-gray-500 mt-2 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
