export default function Timeline() {
  const timelineData = [
    {
      year: "2017",
      desc: "Infocus Security Solutions is Founded with a mission: ensuring your peace of mind."
    },
    {
      year: "2019",
      desc: "Expanded our expertise with CCTV surveillance and advanced security solutions to serve every kind of home and business needs."
    },
    {
      year: "2021",
      desc: "Expanded our retail presence and built lasting trust by successfully serving businesses, institutions, dealers, and residential customers."
    },
    {
      year: "2023",
      desc: "After years of protecting businesses and institutions, we founded Secure Home Solutions to bring the same trusted security expertise directly to homeowners."
    },
    {
      year: "2025",
      desc: "Became one of Chennai's trusted security solution providers, earning the confidence of thousands of satisfied customers."
    },
  ];

  return (
    <section className="mb-12">
      {/* <h2 className="text-3xl font-semibold text-center mb-10">
        Our Timeline
      </h2> */}

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 h-full border-l-2 border-sky-500" />

        <ul className="space-y-12">
          {timelineData.map((item, index) => (
            <li
              key={index}
              className={`relative md:flex md:items-center ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-md" />

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"
                  }`}
              >
                <h3 className="text-lg font-bold text-sky-700">{item.year}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
