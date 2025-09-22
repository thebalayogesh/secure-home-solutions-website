export default function Timeline() {
  const timelineData = [
    {
      year: "2017",
      desc: "Infocus Security Solutions is born with one mission: ensuring your peace of mind."
    },
    {
      year: "2019",
      desc: "Expanded our expertise: CCTV & advanced security solutions for every need."
    },
    {
      year: "2021",
      desc: "Building trust: served large projects, dealers, and institutions with unmatched reliability."
    },
    {
      year: "2023",
      desc: "Direct-to-home security made simple: launched Secure Home Solutions, our dedicated B2C brand."
    },
    {
      year: "2025",
      desc: "Trusted in Chennai: thousands of happy customers rely on our customer-first approach and expert team."
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
