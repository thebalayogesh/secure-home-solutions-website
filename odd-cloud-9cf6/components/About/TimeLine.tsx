export default function Timeline() {
  const timelineData = [
    { year: "2017", desc: "Infocus Security Solutions founded." },
    { year: "2019", desc: "Expanded into CCTV and security systems." },
    { year: "2021", desc: "Rebranded as Secure Home Solutions." },
    { year: "2023", desc: "Launched smart locks & digital security products." },
    { year: "2025", desc: "Trusted by 5,000+ happy customers." },
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
              className={`relative md:flex md:items-center ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-md" />

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"
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
